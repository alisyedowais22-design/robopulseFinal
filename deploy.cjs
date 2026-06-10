const ftp = require("basic-ftp");
const fs = require("fs");
const path = require("path");

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(".env.deploy file not found");
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    process.env[key] = value;
  }
}

async function connectClient() {
  const client = new ftp.Client(300000);
  client.ftp.verbose = true;

  // Hostinger FTP passive mode fix
  client.prepareTransfer = ftp.enterPassiveModeIPv4;

  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: Number(process.env.FTP_PORT || 21),
    secure: false,
  });

  return client;
}

function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      files.push({
        fullPath,
        relativePath,
      });
    }
  }

  return files;
}

async function uploadWithRetry(localPath, remoteRoot, relativePath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    let client;

    try {
      client = await connectClient();

      const remotePath = relativePath.replace(/\\/g, "/");
      const remoteDirPart = path.posix.dirname(remotePath);
      const remoteFileName = path.posix.basename(remotePath);

      const cleanRemoteRoot = remoteRoot.replace(/\/$/, "");
      const remoteDir =
        remoteDirPart === "."
          ? cleanRemoteRoot
          : `${cleanRemoteRoot}/${remoteDirPart}`;

      await client.ensureDir(remoteDir);

      console.log(`Uploading ${relativePath}... attempt ${attempt}`);
      await client.uploadFrom(localPath, remoteFileName);
      console.log(`Uploaded ${relativePath}`);

      client.close();
      return;
    } catch (error) {
      if (client) client.close();

      console.log(`Failed ${relativePath}: ${error.message}`);

      if (attempt === retries) {
        throw error;
      }

      console.log("Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function uploadIndexSafely(localIndex, remoteRoot, retries = 3) {
  const tempName = "__index_new.html";

  for (let attempt = 1; attempt <= retries; attempt++) {
    let client;

    try {
      client = await connectClient();
      await client.ensureDir(remoteRoot);

      console.log(`Uploading temp index... attempt ${attempt}`);
      await client.uploadFrom(localIndex, tempName);
      console.log("Temp index uploaded.");

      console.log("Removing old index.html...");
      try {
        await client.remove("index.html");
      } catch (error) {
        console.log("Old index remove skipped:", error.message);
      }

      console.log("Renaming temp index to index.html...");
      await client.rename(tempName, "index.html");

      console.log("index.html updated successfully.");
      client.close();
      return;
    } catch (error) {
      if (client) client.close();

      console.log(`Failed index.html update: ${error.message}`);

      if (attempt === retries) {
        throw error;
      }

      console.log("Retrying index upload in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function deploy() {
  loadEnv(path.join(__dirname, ".env.deploy"));

  const remoteRoot = process.env.FTP_REMOTE_ROOT || "/public_html/";

  if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) {
    throw new Error("FTP_HOST, FTP_USER, or FTP_PASSWORD missing in .env.deploy");
  }

  const distDir = path.join(__dirname, "dist");
  const indexHtml = path.join(distDir, "index.html");

  if (!fs.existsSync(distDir)) {
    throw new Error("dist folder not found. Run npm run build first.");
  }

  if (!fs.existsSync(indexHtml)) {
    throw new Error("dist/index.html not found. Run npm run build first.");
  }

  const allFiles = getAllFiles(distDir);

  const filesExceptIndex = allFiles.filter(
    (file) => file.relativePath !== "index.html"
  );

  console.log("Starting RoboPulse full direct deploy...");
  console.log(`Remote root: ${remoteRoot}`);
  console.log("Files found:");
  allFiles.forEach((file) => console.log(" - " + file.relativePath));

  console.log("Step 1: Uploading all files except index.html...");

  for (const file of filesExceptIndex) {
    await uploadWithRetry(file.fullPath, remoteRoot, file.relativePath);
  }

  console.log("Step 2: Uploading index.html safely...");
  await uploadIndexSafely(indexHtml, remoteRoot);

  console.log("Deployment complete.");
}

deploy().catch((error) => {
  console.error("Deployment failed:");
  console.error(error.message || error);
  process.exit(1);
});