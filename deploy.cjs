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

async function deploy() {
  loadEnv(path.join(__dirname, ".env.deploy"));

  const client = new ftp.Client();
  client.ftp.verbose = true;

  const host = process.env.FTP_HOST;
  const user = process.env.FTP_USER;
  const password = process.env.FTP_PASSWORD;
  const remoteRoot = process.env.FTP_REMOTE_ROOT || "/public_html/";
  const port = Number(process.env.FTP_PORT || 21);

  if (!host || !user || !password) {
    throw new Error("FTP_HOST, FTP_USER, or FTP_PASSWORD missing in .env.deploy");
  }

  const localDist = path.join(__dirname, "dist");
  const localHtaccess = path.join(__dirname, ".htaccess");

  if (!fs.existsSync(localDist)) {
    throw new Error("dist folder not found. Run npm run build first.");
  }

  if (!fs.existsSync(localHtaccess)) {
    throw new Error(".htaccess file not found in project root.");
  }

  try {
    console.log("Connecting to FTP...");
    console.log(`Host: ${host}`);
    console.log(`User: ${user}`);
    console.log(`Remote Root: ${remoteRoot}`);

    await client.access({
      host,
      user,
      password,
      port,
      secure: false,
    });

    console.log("Connected successfully.");

    await client.ensureDir(remoteRoot);

    console.log("Uploading React build files...");
    await client.uploadFromDir(localDist);

    console.log("Uploading .htaccess...");
    await client.uploadFrom(localHtaccess, ".htaccess");

    console.log("Deployment complete.");
  } catch (error) {
    console.error("Deployment failed:");
    console.error(error.message || error);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();