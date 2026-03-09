# Resume Project

## Build Commands

```bash
npm run validate-safelist  # check template.hbs classes exist in input.css safelist
npm run validate           # validate resume.json against JSON Resume schema
npm run render             # resume.json → /app/resume.html
npm run generate-pdf       # resume.html → /app/resume.pdf + preview PNGs
npm run build              # validate-safelist + validate + render + generate-pdf (sequential)
```

Rebuild after any change to `resume.json` or anything in `theme/`.

## Local Development

Docker is the ONLY supported build method. npm scripts use hardcoded `/app` paths and won't
work outside a container.

```bash
# Pull the pre-built multi-arch image from Docker Hub
docker pull jpcercal/resume

# Or build locally (after Dockerfile changes)
docker build -t jpcercal/resume .

# Generate artifacts
docker run --rm -v "$PWD:/app" jpcercal/resume

# Windows PowerShell
docker run --rm -v "${PWD}:/app" jpcercal/resume
```

`$PWD` mounts as `/app` inside the container. Outputs (`resume.pdf`, `resume.pdf.png`,
`resume.json.png`) are written directly into `$PWD`. `node_modules` is baked into the
image at `/deps/node_modules` — outside the bind-mount, so it is never overwritten by the mount.

## File Responsibilities

| File | Role | Edit? |
|---|---|---|
| `resume.json` | Source of truth — JSON Resume schema v1.0.0 | Yes |
| `theme/template.hbs` | Handlebars HTML template | Yes |
| `theme/input.css` | TailwindCSS v4 tokens + custom classes + utility safelist | Yes |
| `theme/index.js` | CommonJS: compiles CSS, registers helpers, exports `render()` | Yes |
| `index.js` | ESM: orchestrates Puppeteer, delegates to scripts/ | Yes |
| `scripts/constants.js` | ESM: shared constants (`EXPECTED_PDF_PAGES`) | Yes |
| `scripts/generate-pdf.js` | ESM: renders HTML → `resume.pdf` + page count guard | Yes |
| `scripts/generate-pdf-preview.js` | ESM: screenshots rendered HTML → `resume.pdf.png` | Yes |
| `scripts/generate-json-preview.js` | ESM: renders Monokai JSON view → `resume.json.png` | Yes |
| `scripts/validate-safelist.js` | ESM: validates template classes against CSS safelist | Yes |
| `Dockerfile` | Multi-stage: node:24-alpine + system Chromium; deps baked into `/deps/node_modules`; WORKDIR `/app` | Rarely |
| `.github/workflows/resume.yml` | Full CI/CD pipeline | Rarely |
| `.puppeteerrc.cjs` | Puppeteer cache dir (CommonJS — required by Puppeteer config loader) | Rarely |
| `resume.html` | Generated — never edit | Never |
| `resume.pdf` | Generated — never edit | Never |
| `resume.pdf.png` | Generated — never edit | Never |
| `resume.json.png` | Generated — never edit | Never |

## Module Systems — Critical

- `package.json` has `"type": "module"` → `index.js` is ESM (`import`/`export`)
- `theme/index.js` is CommonJS (`require`/`exports`) — intentional, required by the `resumed` theme API
- **Do NOT convert `theme/index.js` to ESM**
- `theme/package.json` is `{"private": true}` only — do not add a `"type"` field

## Hardcoded Paths

Do not change any path without updating all locations simultaneously.

| Path | Hardcoded in |
|---|---|
| `/app/resume.json` | `package.json` scripts, `index.js` |
| `/app/resume.html` | `package.json` scripts |
| `/app/resume.pdf` | `scripts/generate-pdf.js` |
| `/app/resume.pdf.png` | `scripts/generate-pdf-preview.js` |
| `/app/resume.json.png` | `scripts/generate-json-preview.js` |
| `/app` | Dockerfile WORKDIR; bind-mount target in `docker run` and CI |
| `/usr/bin/chromium-browser` | Dockerfile `ENV PUPPETEER_EXECUTABLE_PATH` |
| `EXPECTED_PDF_PAGES = 3` | `scripts/constants.js` (used by `generate-pdf.js` guard + `generate-pdf-preview.js` height) |

## TailwindCSS Safelist — Required

The Handlebars template is rendered at runtime; Tailwind cannot scan it at build time. Every
Tailwind utility used in `theme/template.hbs` must be present in `theme/input.css` via
`@source inline("...")`.

Custom classes (`.header`, `.skill-pill`, etc.) are defined explicitly in `input.css` — safe.
The risk is Tailwind utilities used directly in the template markup (e.g., `flex`, `gap-3`,
`text-sm`, `space-y-5`, `break-inside-avoid`).

**Rule:** when adding a new Tailwind utility to `template.hbs`, add it to `@source inline()` in
`theme/input.css`. The `npm run validate-safelist` script (runs first in `build`) will catch
any mismatches automatically.

## Handlebars Helpers

All registered in `theme/index.js`. Use `{{{triple-stache}}}` for SafeString helpers.

| Helper | Usage | Output |
|---|---|---|
| `style` | `{{style}}` | Inlines full compiled CSS (SafeString) |
| `formatDate` | `{{formatDate dateStr}}` | `"2024-08"` → `"Aug 2024"` |
| `formatPeriod` | `{{formatPeriod start end}}` | `"Jan 2022 – Present"` |
| `networkIcon` | `{{{networkIcon network}}}` | Inline SVG — LinkedIn or GitHub (SafeString) |
| `compilePhoneNumber` | `{{compilePhoneNumber phone}}` | Strips spaces/dashes/parens for `tel:` href |
| `highlightPunctuation` | `{{highlightPunctuation @index total}}` | Returns `.` for last item, `;` for others |

## Skills Data Structure

```json
{
  "name": "PHP",
  "level": "100",
  "keywords": [],
  "meta": { "display": true, "highlighted": true }
}
```

Filtering and sorting is done in `theme/index.js` (not in Handlebars):
- Only `meta.display === true` are included
- Sorted: `meta.highlighted` first, then `level` descending
- Passed to template as `displayedSkills`

Do not add display/sort logic to the template.

## Design Tokens

Defined in `theme/input.css` `@theme` block:

| Token | Value |
|---|---|
| `--color-accent` | `#ed5f1a` |
| `--font-sans` | Inter, system-ui, -apple-system, sans-serif |
| `--font-mono` | JetBrains Mono, Courier New, monospace |

Fonts loaded from Google Fonts in `template.hbs`. Accent exposed as `.text-accent` and
`var(--color-accent)` throughout.

Custom CSS classes: `.page-background`, `.header`, `.header-content`, `.header-photo`,
`.header-summary`, `.contact-strip`, `.contact-item`, `.contact-item--email`,
`.section-heading`, `.highlight-item`, `.skill-pill`, `.skill-pill--highlighted`, `.text-accent`.

## What Is Committed vs Gitignored

| Item | Status |
|---|---|
| `resume.json` | Committed — source |
| `resume.pdf` | Gitignored — build artifact (CI only, force-added on main) |
| `resume.pdf.png` | Gitignored — build artifact (CI only, force-added on main) |
| `resume.json.png` | Gitignored — build artifact (CI only, force-added on main) |
| `resume.html` | Gitignored — build artifact (CI only, force-added on main) |
| `node_modules/` | Gitignored |
| `.cache/` | Gitignored |

All 4 build artifacts are in `.gitignore` and not locally tracked. On the main branch only,
the CI workflow runs `git add -f` on all 4 files during the amend step, which overrides
gitignore for that commit. Non-main branches never commit or push build artifacts — they are
available only as the `resume-artifacts` CI artifact (7-day retention).

## Code Style

- 2-space indentation (JS, JSON, YAML, HBS, CSS)
- Double quotes in JS, JSON, YAML
- Semicolons in JS
- `camelCase` for JS variables and functions
- `SCREAMING_SNAKE_CASE` for JS module-level constants
- `kebab-case` for CSS class names
- CSS sections delimited with: `/* ─── Section name ─── */`
- No linting/formatting config (ESLint, Prettier, EditorConfig) — convention only

## Git Conventions

- **Commits:** lowercase imperative, no trailing period — e.g., `add emma experience to the cv`
- **Branches:** kebab-case, descriptive — e.g., `update-cv`, `include-emma-experience-on-the-cv`
- Do not include AI attribution in commit messages

## CI/CD Pipeline

Triggers on every push to any branch.

| Step | Branch |
|---|---|
| Checkout (full history) | all |
| Set up QEMU (cross-arch emulation) | all |
| Set up Docker Buildx | all |
| Login to Docker Hub (`DOCKERHUB_USERNAME` + `DOCKERHUB_TOKEN` secrets) | main only |
| Build multi-arch image (`linux/amd64,linux/arm64`) and push to `jpcercal/resume` | main only |
| Build single-arch image and load locally (no push) | non-main only |
| `docker run --rm -v "$PWD:/app" jpcercal/resume:<sha>` | all |
| Upload all 4 artifacts as `resume-artifacts` (7-day retention) | all |
| Check dependency freshness (`npm audit` + `npm outdated`, informational) | main only |
| Minify `resume.html` via `html-minifier-terser` | main only |
| Deploy HTML to `gh-pages` via `peaceiris/actions-gh-pages@v4` | main only |
| `git commit --amend --no-edit` — rewrites commit to include PDF + HTML + preview PNGs | main only |
| Force-push with `force_with_lease` to triggering branch | main only |
| Create versioned GitHub release; upload `resume.pdf` as asset | main only |

Release version format: `(year-2023).MM.DDHHmmss`
Example: push on 2025-03-04 14:12:05 → `2.03.041412005`

Required secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` (Docker Hub access token).
Built-in `GITHUB_TOKEN` used for gh-pages, artifact upload, and release.

## Cross-Platform

- Docker is the only supported build method (local and CI)
- Image: `jpcercal/resume` on Docker Hub — built for `linux/amd64` and `linux/arm64`
  - Covers: Intel/AMD (Windows, Linux, Mac Intel), Apple Silicon (Mac M-series), ARM servers
- Base: `node:24-alpine` (Node 24 LTS)
- System Chromium via `PUPPETEER_SKIP_DOWNLOAD=true` + `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser`
- Puppeteer launches with `--no-sandbox` (required inside containers)
- Node version pinned in `Dockerfile` (`node:24-alpine`) and enforced via `"engines": {"node": ">=24"}` in `package.json`

## Phases

- Phase 1 ✅ HTML resume (drives both web and PDF)
- Phase 2 — Print/PDF-only theme variant
- Phase 3 — Cover letter (PDF only)
