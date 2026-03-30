#!/bin/sh
set -e

node scripts/validate-safelist.js

build_locale() {
  locale="$1"; json_file="$2"; html_file="$3"
  resumed validate "/app/${json_file}"
  resumed render "/app/${json_file}" --theme jsonresume-theme-local --output "/app/${html_file}"
}

if [ -n "$LOCALE" ]; then
  case "$LOCALE" in
    en)    build_locale en    resume.json       resume.html ;;
    pt-BR) build_locale pt-BR resume.pt-BR.json resume.pt-BR.html ;;
    *)  echo "Unknown LOCALE: $LOCALE" >&2; exit 1 ;;
  esac
else
  build_locale en    resume.json       resume.html
  build_locale pt-BR resume.pt-BR.json resume.pt-BR.html
fi

node index.js
