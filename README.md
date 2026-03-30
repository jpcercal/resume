# Resume

[![View Resume (EN)](<https://img.shields.io/badge/Jo%C3%A3o's_Resume_(EN)-VIEW-blue?logo=googlechrome&logoColor=ffffff> "View Resume")](https://github.com/jpcercal/resume/releases/latest/download/resume.pdf) [![Download Resume (EN)](<https://img.shields.io/badge/Jo%C3%A3o's_Resume_(EN)-DOWNLOAD-ED5F1A?logo=githubsponsors&logoColor=ffffff> "Download Resume")](https://github.com/jpcercal/resume/releases/latest/download/resume.pdf) [![View Resume (PT-BR)](<https://img.shields.io/badge/Curr%C3%ADculo_(PT--BR)-VER-blue?logo=googlechrome&logoColor=ffffff> "View Resume")](https://github.com/jpcercal/resume/releases/latest/download/resume.pt-BR.pdf) [![Download Resume (PT-BR)](<https://img.shields.io/badge/Curr%C3%ADculo_(PT--BR)-BAIXAR-ED5F1A?logo=githubsponsors&logoColor=ffffff> "Download Resume")](https://github.com/jpcercal/resume/releases/latest/download/resume.pt-BR.pdf) [![resume.json](https://img.shields.io/badge//resume.json-2B2B2B?logo=github&logoColor=ffffff "resume.json")](https://raw.githubusercontent.com/jpcercal/resume/main/resume.json) [![github actions](https://img.shields.io/badge/github%20actions-2B2B2B?logo=githubactions&logoColor=ffffff "github actions")](https://github.com/jpcercal/resume/actions) [![CI](https://github.com/jpcercal/resume/actions/workflows/resume.yml/badge.svg?branch=main)](https://github.com/jpcercal/resume/actions/workflows/resume.yml?query=branch%3Amain) [![Latest Release](https://img.shields.io/github/v/release/jpcercal/resume?display_name=tag&logo=github&logoColor=ffffff&color=2B2B2B)](https://github.com/jpcercal/resume/releases) [![Docker Pulls](https://img.shields.io/docker/pulls/jpcercal/resume?logo=docker&logoColor=ffffff&color=2496ED)](https://hub.docker.com/r/jpcercal/resume) [![Node 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=ffffff)](https://nodejs.org/)

As a software engineer with a thirst for adventure, I'm constantly looking for ways to
apply engineering rigour to problems that most people solve manually. A resume is one of
those problems. It goes stale, the formatting drifts, version history disappears into a
graveyard of `final_v3.docx` files, and every update turns into a tedious afternoon of
pixel-pushing. I decided to treat my resume the same way I treat production software:
as source code, with automation, versioning, and a proper release pipeline. This
repository is the result.

## Why your resume deserves a repository

The instincts that make engineers effective — reproducibility, automation, auditability —
apply just as well to a resume as they do to any other deliverable. Here is why I think
every engineer should have one of these:

**Your resume is source code.** The single source of truth lives in `resume.json`, a
structured file that follows the open [JSON Resume](https://jsonresume.org/) schema. Every
change is a commit. The full history is preserved. There are no conflicting copies,
no formatting accidents, and no mystery about what changed between versions.

**Every push ships a release.** The moment you push, the CI pipeline takes over. It builds
a Docker image, renders the HTML, generates the PDF, minifies the page, deploys it to
GitHub Pages, and tags a new versioned release with all artifacts attached — all without
you touching a single tool manually. The pipeline does in seconds what used to take an afternoon.

**One Docker command, anywhere.** The build is fully containerised and produces identical
output on Intel, Apple Silicon, and ARM servers. There is no "it works on my machine"
problem. Anyone can clone the repo, run a single command, and have a pixel-perfect PDF
in their working directory.

## How does it work?

The pipeline is intentionally simple:

| Step                    | What happens                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| Edit `resume.json`      | Update your content — work experience, skills, education            |
| `git push`              | Triggers the GitHub Actions workflow                                |
| CI builds the image     | Multi-arch Docker image pushed to Docker Hub                        |
| Artifacts are generated | `resume.pdf`, `resume.html`, and two preview PNGs                   |
| HTML is minified        | CSS, JS, and whitespace compressed for the web                      |
| GitHub Pages is updated | The minified HTML is live at your Pages URL                         |
| Release is tagged       | A versioned GitHub release is created with `resume.pdf` as an asset |

Under the hood, [resumed](https://github.com/rbardini/resumed) validates the JSON and
renders it through a custom [Handlebars](https://handlebarsjs.com/) template styled with
[TailwindCSS v4](https://tailwindcss.com/). [Puppeteer](https://pptr.dev/) then takes the
HTML and prints it to PDF using a headless Chromium instance baked into the Docker image.
No external services, no proprietary tooling — just open-source software running in a
reproducible container.

## See it in action

![A preview of the resume file](https://github.com/jpcercal/resume/releases/latest/download/resume.pdf.png)

At the very top of this page you can click the badges to view and download resumes in
English or Brazilian Portuguese (Português Brasileiro). The project supports multi-language
resume generation.

> For the tech-savvy, the raw data is in
> [`resume.json`](https://raw.githubusercontent.com/jpcercal/resume/main/resume.json) —
> the file that drives everything. Here is a preview of what it looks like:
>
> ![A preview of the resume.json file](https://github.com/jpcercal/resume/releases/latest/download/resume.json.png)

> The full workflow is defined in `.github/workflows/resume.yml`. You can watch it run
> live on [GitHub Actions](https://github.com/jpcercal/resume/actions).

## Build it yourself

The only dependency is [Docker](https://www.docker.com/). Once installed, you have two
options:

**Option 1 — Pull the pre-built image from Docker Hub (fastest):**

```bash
docker pull jpcercal/resume
```

**Option 2 — Build the image locally (after making changes to the `Dockerfile`):**

```bash
docker build --tag jpcercal/resume .
```

Either way, generate all artifacts with a single command:

```bash
docker run --rm -v "$PWD:/app" jpcercal/resume
```

> **Windows PowerShell:** replace `"$PWD"` with `"${PWD}"`.

This mounts the project root as `/app` inside the container and writes eight files directly
into your working directory (English and Brazilian Portuguese variants):

- `resume.pdf` / `resume.pt-BR.pdf`
- `resume.html` / `resume.pt-BR.html`
- `resume.pdf.png` / `resume.pt-BR.pdf.png`
- `resume.json.png`

The image is built for both `linux/amd64` and `linux/arm64`, so it runs natively on
Intel/AMD machines as well as Apple Silicon (M-series) and ARM servers — no emulation
overhead.

Enjoy it. =)

## Fork it and make it yours

The best part about treating a resume as a repository is that the whole pipeline is
forkable. Clone or fork this repo, edit `resume.json` with your own information, push,
and your personal resume pipeline is live — complete with GitHub Pages hosting, versioned
PDF releases, and a Docker image on Docker Hub.

If the default layout does not suit your style, the entire theme lives in the `theme/`
folder: swap the Handlebars template, adjust the TailwindCSS tokens, add new helpers.
The `resume.json` data model stays the same; only the presentation changes.

## Multi-Language Support

The project supports generating resumes in multiple languages. Currently configured:

- **English** — `resume.json` (default)
- **Brazilian Portuguese** — `resume.pt-BR.json`

To build all locales: `docker run --rm -v "$PWD:/app" jpcercal/resume`

To build a single locale: `docker run --rm -v "$PWD:/app" -e LOCALE=pt-BR jpcercal/resume`

Adding a new locale is straightforward: create `resume.{locale}.json`, add the locale to
`scripts/constants.js`, and update `scripts/build.sh` to include it in the build sequence.

Your resume is a living document. It should be treated like one.
