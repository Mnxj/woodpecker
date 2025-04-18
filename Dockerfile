# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.15.3

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"] 