# ---------- STEP 1: Build Frontend ----------
FROM node:18-alpine AS builder

WORKDIR /app

# client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# client code
COPY client ./client

# build frontend
RUN cd client && npm run build


# ---------- STEP 2: Backend ----------
FROM node:18-alpine

WORKDIR /app

# backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# backend code
COPY backend ./backend

# frontend build → backend public folder
COPY --from=builder /app/client/out ./backend/public

# backend folder में shift
WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "start"]