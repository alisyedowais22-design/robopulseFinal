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

function getAssetsFromIndex(indexHtmlPath) {
  const html = fs.readFileSync(indexHtmlPath, "utf8");
  const assets = new Set();

  const regex = /\/assets\/([^"']+\.(js|css))/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    assets.add(match[1]);
  }

  return Array.from(assets);
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

async function uploadWithRetry(localPath, remoteDir, remoteName, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    let client;

    try {
      client = await connectClient();
      await client.ensureDir(remoteDir);

      console.log(`Uploading ${remoteName}... attempt ${attempt}`);
      await client.uploadFrom(localPath, remoteName);
      console.log(`Uploaded ${remoteName}`);

      client.close();
      return;
    } catch (error) {
      if (client) client.close();

      console.log(`Failed ${remoteName}: ${error.message}`);

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
  const remoteAssets = `${remoteRoot.replace(/\/$/, "")}/assets`;

  if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) {
    throw new Error("FTP_HOST, FTP_USER, or FTP_PASSWORD missing in .env.deploy");
  }

  const distDir = path.join(__dirname, "dist");
  const assetsDir = path.join(distDir, "assets");
  const indexHtml = path.join(distDir, "index.html");

  if (!fs.existsSync(indexHtml)) {
    throw new Error("dist/index.html not found. Run npm run build first.");
  }

  const assetFiles = getAssetsFromIndex(indexHtml);

  if (!assetFiles.length) {
    throw new Error("No JS/CSS assets found inside dist/index.html.");
  }

  console.log("Starting RoboPulse direct deploy...");
  console.log("Images/logo/.htaccess skipped for stable deploy.");
  console.log("Assets found:");
  assetFiles.forEach((file) => console.log(" - " + file));

  console.log("Step 1: Uploading JS/CSS first...");

  for (const fileName of assetFiles) {
    const localAssetPath = path.join(assetsDir, fileName);

    if (!fs.existsSync(localAssetPath)) {
      throw new Error(`Missing local asset: ${localAssetPath}`);
    }

    await uploadWithRetry(localAssetPath, remoteAssets, fileName);
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