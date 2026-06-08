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
fuser -k 9000/tcp 2>/dev/null || true

npx tinacms build
npm run build
cp -r public/admin dist/
pm2 restart "$PM2_APP"

echo "Deploy complete at $(date -Is)"
