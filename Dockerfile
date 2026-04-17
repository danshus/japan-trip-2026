# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
 
WORKDIR /app
 
COPY package.json ./
RUN npm install --no-audit --no-fund
 
COPY . .
RUN npm run build
 
 
# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner
 
RUN rm -rf /usr/share/nginx/html/* \
 && sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf \
 && sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf
 
COPY --from=builder /app/dist /usr/share/nginx/html
 
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
 
