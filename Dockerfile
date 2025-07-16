
# ------------ Stage 1: Build ------------
FROM node:23-alpine AS builder

WORKDIR /app

# Copy dependency files first for caching
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ------------ Stage 2: Production ------------
FROM node:23-alpine AS runner

WORKDIR /app

# Copy only production files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["yarn", "start"]
