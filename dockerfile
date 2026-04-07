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
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyADvwD2PvA8JIddLAckJ5-jm7gTx7pVktc"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="keepvault-80270.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="keepvault-80270"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="keepvault.com"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="862792318307"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:862792318307:web:1dd64186820af37c1ca756"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-4G1GZRSQ0T"


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