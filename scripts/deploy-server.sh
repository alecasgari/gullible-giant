#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${REPO_DIR:-/home/alecadmin/alec-website}"
PM2_APP="${PM2_APP:-alec-website}"

cd "$REPO_DIR"

git config --global --add safe.directory "$REPO_DIR"
git pull origin main

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
else
  echo "ERROR: .env not found in $REPO_DIR" >&2
  exit 1
fi

# Free Tina datalayer port if a stale process is holding it
# Try multiple methods to kill port 9000
lsof -ti :9000 | xargs -r kill -9 2>/dev/null || true
ss -tulpn | grep :9000 | grep -oP 'pid=\K\d+' | xargs -r kill -9 2>/dev/null || true
fuser -k 9000/tcp 2>/dev/null || true

# Try to build Tina, but continue if it fails (client might already exist)
echo "Starting Tina build..."
npx tinacms build || echo "Tina build failed, continuing with existing client..."

npm run build
cp -r public/admin dist/
pm2 restart "$PM2_APP"

echo "Deploy complete at $(date -Is)"
