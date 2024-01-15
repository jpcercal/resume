FROM node:20-buster-slim

# Install dependencies
RUN apt update && \
    apt install -y libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
