import express from 'express';
import { exec } from 'child_process';

const app = express();
app.use(express.json());

// Config via env
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const REPO_DIR = process.env.REPO_DIR || '/home/alecadmin/alec-website';
const TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '';
const TINA_TOKEN = process.env.TINA_TOKEN || '';

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 1024 * 64, env: process.env }, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stdout, stderr });
      }
      resolve({ stdout, stderr });
    });
  });
}

app.post('/deploy', async (req, res) => {
  try {
    // Basic auth using shared secret header
    const provided = req.headers['x-webhook-secret'];
    if (!WEBHOOK_SECRET || provided !== WEBHOOK_SECRET) {
      return res.status(401).json({ success: false, error: 'unauthorized' });
    }

    console.log('🚀 Deploy webhook triggered', new Date().toISOString());

    // Build using Dockerized Node to avoid local Node dependency
    const cmd = [
      `cd ${REPO_DIR}`,
      'git pull origin main',
      // Tina Cloud build first (needs envs)
      `docker run --rm -v "$PWD":/app -w /app -e NEXT_PUBLIC_TINA_CLIENT_ID=${TINA_CLIENT_ID} -e TINA_TOKEN=${TINA_TOKEN} node:20 npx -y tinacms build`,
      // Astro static build
      'docker run --rm -v "$PWD":/app -w /app node:20 npm run build'
    ].join(' && ');

    const { stdout, stderr } = await run(cmd);
    console.log('✅ Deploy successful');
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return res.json({ success: true, message: 'Deploy successful', at: new Date().toISOString() });
  } catch (e) {
    console.error('❌ Deploy failed:', e);
    return res.status(500).json({ success: false, error: e?.error?.message || e?.message || 'unknown', stderr: e?.stderr });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', at: new Date().toISOString(), service: 'Deploy Webhook' });
});

app.listen(PORT, () => {
  console.log(`🎯 Deploy webhook running on port ${PORT}`);
  console.log(`🔗 POST /deploy`);
  console.log(`❤️  GET  /health`);
});