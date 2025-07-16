# Use an official Node.js image as the base image
FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn run build

# Set the environment variable for the port
ENV PORT=3005

# Expose port 3005 to the host
EXPOSE 3005

# Start the Next.js app
CMD ["yarn", "run", "start"]





# # ------------ Stage 1: Build ------------
# FROM node:23-alpine AS builder

# WORKDIR /app

# # Copy dependency files first for caching
# COPY package.json yarn.lock ./

# RUN yarn install --frozen-lockfile

# COPY . .

# RUN yarn build

# # ------------ Stage 2: Production ------------
# FROM node:23-alpine AS runner

# WORKDIR /app

# # Copy only production files from builder
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# ENV NODE_ENV=production
# ENV PORT=3005

# EXPOSE 3005

# CMD ["yarn", "start"]
