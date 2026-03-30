import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEME_DIR = join(__dirname, "..", "theme");

// ── 1. Extract classes from template.hbs ──────────────────────────────────
const template = readFileSync(join(THEME_DIR, "template.hbs"), "utf8");

// Strip Handlebars expressions to avoid false positives from helper output
const cleaned = template.replace(/\{\{[^}]*\}\}/g, " ");

const classAttrRegex = /class="([^"]*)"/g;
const templateClasses = new Set();
let match;
while ((match = classAttrRegex.exec(cleaned)) !== null) {
  match[1]
    .split(/\s+/)
    .filter(Boolean)
    .forEach((c) => templateClasses.add(c));
}

// ── 2. Extract safelisted utilities from @source inline("...") ────────────
const inputCss = readFileSync(join(THEME_DIR, "input.css"), "utf8");

const safelistRegex = /@source\s+inline\("([^"]*)"\)/g;
const safelisted = new Set();
while ((match = safelistRegex.exec(inputCss)) !== null) {
  match[1]
    .split(/\s+/)
    .filter(Boolean)
    .forEach((c) => safelisted.add(c));
}

// ── 3. Extract custom CSS class selectors defined in input.css ────────────
const customClassRegex = /\.([a-zA-Z_][\w-]*(?:__[\w-]*)?(?:--[\w-]*)?)\s*[{,:\s]/g;
const customClasses = new Set();
while ((match = customClassRegex.exec(inputCss)) !== null) {
  customClasses.add(match[1]);
}

// ── 4. Find missing classes ───────────────────────────────────────────────
const missing = [...templateClasses].filter((c) => !safelisted.has(c) && !customClasses.has(c));

if (missing.length > 0) {
  console.error("Tailwind safelist validation FAILED");
  console.error("Classes in template.hbs missing from @source inline():");
  missing.forEach((c) => console.error(`  - ${c}`));
  process.exit(1);
}

console.log(`Tailwind safelist validation passed (${templateClasses.size} classes checked)`);
