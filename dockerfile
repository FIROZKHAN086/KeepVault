# ─────────────────────────────────────────
# Stage 1 — Build Next.js (static export)
# ─────────────────────────────────────────
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Dependencies install
COPY client/package*.json ./
RUN npm install

# Source code copy
COPY client/ ./

# Build + export static files
RUN npm run build



# ─────────────────────────────────────────
# Stage 2 — Backend + Static Serve
# ─────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app/backend

# Backend dependencies
COPY backend/package*.json ./
RUN npm install --omit=dev

# Backend code
COPY backend/ ./

# Frontend static files copy (VERY IMPORTANT)
COPY --from=client-builder /app/client/out ./public

# Prisma client generate
RUN npx prisma generate

# Port expose
EXPOSE 5000

# Start server
CMD ["node", "server.js"]