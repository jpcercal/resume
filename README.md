# Resume

## Install

```
docker run --rm -it -v "$(pwd)":/app -w /app node:20-alpine npm install
```

## Validate the syntax of the resume.json file

```
docker run --rm -it -v "$(pwd)":/app -w /app node:20-alpine npm run validate
```

## Generate a new PDF

```
docker run --rm -it -v "$(pwd)":/app -w /app node:20-alpine npm run build
```
