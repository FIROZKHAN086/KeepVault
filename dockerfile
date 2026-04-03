# ─────────────────────────────────────────────────────────
# Stage 1 — Build Next.js client (static export)
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Install dependencies first (layer caching)
COPY client/package*.json ./
RUN npm ci

# Copy source and build
COPY client/ ./
RUN npm run build

# ─────────────────────────────────────────────────────────
# Stage 2 — Production image (Express backend)
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Copy built Next.js static files into backend/public
# Next.js static export goes to client/out by default
COPY --from=client-builder /app/client/out ./public

# Generate Prisma client inside the image
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "server.js"]
