# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application (if you have build scripts)
# RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Add build arguments for metadata
ARG BUILDTIME
ARG VERSION
ARG REVISION

# Add labels for better image management
LABEL org.opencontainers.image.title="Pyone Play Ripper"
LABEL org.opencontainers.image.description="Video ripper for Pyone Play content"
LABEL org.opencontainers.image.created="${BUILDTIME}"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.revision="${REVISION}"
LABEL org.opencontainers.image.source="https://github.com/aunghtetnay/pyonerip"
LABEL org.opencontainers.image.licenses="MIT"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Install runtime dependencies and tools
RUN apk add --no-cache \
    wget \
    ffmpeg \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application files from builder stage
COPY --from=builder --chown=nodeuser:nodejs /app .

# Set proper permissions
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose port (adjust if your app uses a different port)
EXPOSE 3000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]

