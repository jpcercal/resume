# ═══ Base: shared system dependencies ═════════════════════════════════════
FROM node:24-alpine AS base

# Chromium and required system libs for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Use system Chromium — skip Puppeteer's bundled download
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# ═══ Stage 1: install npm dependencies ════════════════════════════════════
FROM base AS deps

WORKDIR /deps
COPY package.json package-lock.json ./
COPY theme/ ./theme/
RUN npm ci

# ═══ Stage 2: runtime (clean — no npm cache, no lockfile) ════════════════
FROM base

# Copy only node_modules and theme — npm cache stays in the deps stage
COPY --from=deps /deps/node_modules /deps/node_modules
COPY --from=deps /deps/theme /deps/theme
COPY package.json /deps/package.json

# NODE_PATH lets Node resolve modules from /deps/node_modules for CJS.
# For ESM, symlink /node_modules → /deps/node_modules so Node's ESM resolver
# finds packages when walking up from /app/index.js: /app → / → /node_modules.
ENV NODE_PATH=/deps/node_modules
ENV PATH="/deps/node_modules/.bin:$PATH"
RUN ln -s /deps/node_modules /node_modules

WORKDIR /app

# Source and outputs come from the bind-mount at runtime (-v "$PWD:/app").
# Outputs (resume.pdf, preview PNGs) land in /app (= $PWD on host).
ENTRYPOINT ["npm", "run", "build"]
