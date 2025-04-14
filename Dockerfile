# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY svelte.config.js ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# Only install production deps here to speed things up
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Run (production)
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Only copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# If using adapter-node
CMD ["node", "build"]

# If using static adapter:
# RUN npm install -g serve
# CMD ["serve", "build"]
