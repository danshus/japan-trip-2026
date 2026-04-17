# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer cache optimisation)
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile 2>/dev/null || npm install

# Copy source and build
COPY . .
RUN npm run build


# ── Stage 2: Serve ────────────────────────────────────────────────────────────
# NPM handles reverse proxy, TLS, and security headers externally —
# nginx here is just a static file server.
FROM nginx:1.27-alpine AS runner

# Remove default assets; patch default config to listen on 8080
# (avoids needing a custom nginx.conf since NPM owns the proxy layer)
RUN rm -rf /usr/share/nginx/html/* \
 && sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf \
 && sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Fix ownership and drop to non-root
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080 || exit 1

CMD ["nginx", "-g", "daemon off;"]
