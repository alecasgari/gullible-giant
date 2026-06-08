import express from 'express';
import { exec } from 'child_process';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const REPO_DIR = process.env.REPO_DIR || '/home/alecadmin/alec-website';
const DEPLOY_SCRIPT = process.env.DEPLOY_SCRIPT || path.join(__dirname, 'scripts', 'deploy-server.sh');

let deployInProgress = false;

function run(cmd, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, {
      maxBuffer: 1024 * 1024 * 64,
      env: { ...process.env, REPO_DIR, ...extraEnv },
    }, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stdout, stderr });
      }
      resolve({ stdout, stderr });
    });
  });
}

function isAuthorized(req) {
  const ghSig = req.headers['x-hub-signature-256'];
  if (ghSig && typeof ghSig === 'string' && WEBHOOK_SECRET) {
    const expected =
      'sha256=' +
      crypto.createHmac('sha256', WEBHOOK_SECRET).update(req.rawBody || Buffer.from('')).digest('hex');
    try {
      return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(ghSig));
    } catch {
      return false;
    }
  }

  const provided = req.headers['x-webhook-secret'];
  return Boolean(WEBHOOK_SECRET && provided === WEBHOOK_SECRET);
}

app.post('/deploy', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ success: false, error: 'unauthorized' });
  }

  if (deployInProgress) {
    return res.status(409).json({ success: false, error: 'deploy already in progress' });
  }

  deployInProgress = true;
  const startedAt = new Date().toISOString();
  console.log('Deploy webhook triggered', startedAt);

  try {
    const cmd = `bash ${DEPLOY_SCRIPT}`;
    const { stdout, stderr } = await run(cmd);

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    return res.json({
      success: true,
      message: 'Deploy successful',
      startedAt,
      finishedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Deploy failed:', e);
    return res.status(500).json({
      success: false,
      error: e?.error?.message || e?.message || 'unknown',
      stdout: e?.stdout,
      stderr: e?.stderr,
    });
  } finally {
    deployInProgress = false;
  }
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    at: new Date().toISOString(),
    service: 'Deploy Webhook',
    repoDir: REPO_DIR,
    deployInProgress,
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Deploy webhook listening on http://${HOST}:${PORT}`);
  console.log('POST /deploy  (header: x-webhook-secret)');
  console.log('GET  /health');
  console.log(`REPO_DIR: ${REPO_DIR}`);
});
