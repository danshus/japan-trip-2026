# Japan Trip 2026

## Push to GitHub (first time)

```bash
export GH_TOKEN=your_token_here

GH_USER=$(curl -s -H "Authorization: token $GH_TOKEN" \
  https://api.github.com/user | python3 -c "import sys,json; print(json.load(sys.stdin)['login'])")

curl -s -X POST \
  -H "Authorization: token $GH_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/user/repos \
  -d '{"name":"japan-trip-2026","private":true,"description":"Japan Trip 2026 recap dashboard"}'

git init
git remote add origin https://$GH_TOKEN@github.com/$GH_USER/japan-trip-2026.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## Run on server

```bash
docker compose up -d --build
```

App runs on port **12412**. Point Nginx Proxy Manager at `http://<server-ip>:12412`.

## Project structure

```
.
├── Dockerfile            # Multi-stage: Node build → nginx serve
├── docker-compose.yml    # Port 12412, resource limits, hardened
├── index.html
├── vite.config.js
├── package.json
├── .dockerignore
├── .gitignore
└── src/
    ├── main.jsx
    └── JapanTrip.jsx
```
