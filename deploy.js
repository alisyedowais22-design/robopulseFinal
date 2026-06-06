import { execSync } from 'child_process'
import { createReadStream, createWriteStream } from 'fs'
import { resolve } from 'path'
import { createRequire } from 'module'
import fetch from 'node-fetch'
import FormData from 'form-data'

const require = createRequire(import.meta.url)
const archiver = require('archiver')

const TOKEN = 'RoboPulse@1202'
const DEPLOY_URL = 'https://robopulse.net/wp-json/robopulse/v1/deploy'
const ZIP_PATH = resolve('./dist.zip')

async function deploy() {
  console.log('Building...')
  execSync('npm run build', { stdio: 'inherit' })

  console.log('Zipping dist...')
  await zipDist()

  console.log('Uploading...')
  const form = new FormData()
  form.append('file', createReadStream(ZIP_PATH), 'dist.zip')

  try {
    const res = await fetch(DEPLOY_URL, {
      method: 'POST',
      headers: { 'X-Deploy-Token': TOKEN, ...form.getHeaders() },
      body: form,
      timeout: 120000, // 2 minute timeout
    })

    const text = await res.text()
    console.log('Server response:', text)

    try {
      const data = JSON.parse(text)
      console.log(data.success ? '✅ Deployed!' : '❌ Error: ' + data.message)
    } catch (e) {
      if (res.ok) {
        console.log('✅ Deployed successfully!')
      } else {
        console.log('❌ Deploy failed. Status:', res.status)
        console.log('Response:', text)
      }
    }
  } catch (err) {
    console.log('❌ Upload failed:', err.message)
    console.log('Try running npm run deploy again - server may have been busy')
  }
}

function zipDist() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(ZIP_PATH)
    const archive = archiver('zip', { zlib: { level: 1 } }) // fast compression
    output.on('close', () => {
      const size = (archive.pointer() / 1024 / 1024).toFixed(2)
      console.log(`ZIP size: ${size} MB`)
      resolve()
    })
    archive.on('error', reject)
    archive.pipe(output)
    archive.directory('./dist/', false)
    archive.finalize()
  })
}

deploy()