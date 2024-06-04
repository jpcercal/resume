FROM node:20-alpine

# Install dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    fontconfig \
    ttf-dejavu \
    ttf-droid \
    ttf-freefont \
    ttf-liberation \
    ttf-inconsolata

# Set the environment variable to use the installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /opt/app

# /opt/app    is where the application code is stored
# /opt/input  is where it will look for the resume.json file
# /opt/output is where it will save the generated files resume*.{png,html,pdf}
COPY ./.puppeteerrc.cjs        /opt/app/.puppeteerrc.cjs
COPY ./index.js                /opt/app/index.js
COPY ./package-lock.json       /opt/app/package-lock.json
COPY ./package.json            /opt/app/package.json
COPY ./theme                   /opt/app/theme
COPY ./resume.json             /opt/input/resume.json
COPY ./resume-preview.json.png /opt/output/resume-preview.json.png
COPY ./resume-preview.pdf.png  /opt/output/resume-preview.pdf.png
COPY ./resume.html             /opt/output/resume.html
COPY ./resume.pdf              /opt/output/resume.pdf

# Install app dependencies
RUN npm install

# Command to run your application
CMD ["npm", "run", "build"]
