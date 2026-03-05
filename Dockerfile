FROM node:24-alpine

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

# Install dependencies into /deps — outside the bind-mount target (/app).
# This way, `docker run -v $PWD:/app` never shadows node_modules.
WORKDIR /deps
COPY package.json package-lock.json ./
COPY theme/ ./theme/
RUN npm ci

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
