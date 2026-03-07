const Handlebars = require("handlebars");
const path = require("path");
const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const fs = require("fs");

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const NETWORK_ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>`,
};

/** "2024-08" → "Aug 2024"  |  "2011-01" → "Jan 2011" */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length < 2) return parts[0];
  const [year, month] = parts;
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

const FONTSOURCE_DIR = path.join(__dirname, "..", "node_modules", "@fontsource");

function fontDataUri(relPath) {
  const bytes = fs.readFileSync(path.join(FONTSOURCE_DIR, relPath));
  return "data:font/woff2;base64," + bytes.toString("base64");
}

const FONT_FACE_CSS = [
  `@font-face{font-family:'Inter';font-style:normal;font-weight:300;src:url('${fontDataUri("inter/files/inter-latin-300-normal.woff2")}')format('woff2');}`,
  `@font-face{font-family:'Inter';font-style:normal;font-weight:400;src:url('${fontDataUri("inter/files/inter-latin-400-normal.woff2")}')format('woff2');}`,
  `@font-face{font-family:'Inter';font-style:normal;font-weight:500;src:url('${fontDataUri("inter/files/inter-latin-500-normal.woff2")}')format('woff2');}`,
  `@font-face{font-family:'Inter';font-style:normal;font-weight:600;src:url('${fontDataUri("inter/files/inter-latin-600-normal.woff2")}')format('woff2');}`,
  `@font-face{font-family:'Inter';font-style:normal;font-weight:700;src:url('${fontDataUri("inter/files/inter-latin-700-normal.woff2")}')format('woff2');}`,
  `@font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:400;src:url('${fontDataUri("jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2")}')format('woff2');}`,
].join("\n");

exports.render = async (resume) => {
  const {
    meta = {},
    basics = {},
    work = [],
    skills = [],
    education = [],
    languages = [],
  } = resume;

  // Compile TailwindCSS from input.css
  const inputCssPath = path.join(__dirname, "input.css");
  const inputCss = fs.readFileSync(inputCssPath, "utf8");
  const result = await postcss([tailwindcss()]).process(inputCss, {
    from: inputCssPath,
  });
  const compiledCss = FONT_FACE_CSS + "\n" + result.css;

  // ── Handlebars helpers ──────────────────────────────────────────────────

  Handlebars.registerHelper("style", () => new Handlebars.SafeString(compiledCss));

  Handlebars.registerHelper("formatDate", (dateStr) => formatDate(dateStr));

  Handlebars.registerHelper("formatPeriod", (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "Present";
    return `${start} – ${end}`;
  });

  Handlebars.registerHelper("networkIcon", (network) =>
    new Handlebars.SafeString(
      NETWORK_ICONS[(network || "").toLowerCase()] || "",
    ),
  );

  Handlebars.registerHelper("compilePhoneNumber", (phone) =>
    new Handlebars.SafeString(
      (phone || "")
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, ""),
    ),
  );

  Handlebars.registerHelper("stripProtocol", (url) =>
    (url || "").replace(/^https?:\/\//, ""),
  );

  Handlebars.registerHelper("highlightPunctuation", (index, total) =>
    index === total - 1 ? "." : ";",
  );

  Handlebars.registerHelper("formatDateHtml", (dateStr) => {
    if (!dateStr) return "";
    return new Handlebars.SafeString(
      `<time datetime="${dateStr}">${formatDate(dateStr)}</time>`,
    );
  });

  Handlebars.registerHelper("jsonLd", () => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": basics.name,
      "jobTitle": basics.label,
      "description": basics.summary,
      "image": basics.picture,
      "email": basics.email ? `mailto:${basics.email}` : undefined,
      "telephone": basics.phone,
      "url": basics.website,
      "address": basics.location ? {
        "@type": "PostalAddress",
        "addressLocality": basics.location.address,
      } : undefined,
      "sameAs": (basics.profiles || []).map((p) => p.url),
      "hasOccupation": (work || []).map((w) => ({
        "@type": "Occupation",
        "name": w.position,
        "hiringOrganization": { "@type": "Organization", "name": w.company },
        "startDate": w.startDate,
        "endDate": w.endDate || undefined,
      })),
      "knowsAbout": (skills || []).filter((s) => s.meta?.display).map((s) => s.name),
      "knowsLanguage": (languages || []).map((l) => ({
        "@type": "Language",
        "name": l.language,
      })),
    };
    return new Handlebars.SafeString(
      `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`,
    );
  });

  // ── Pre-process skills ──────────────────────────────────────────────────
  // Filter to displayed ones; highlighted first, then sorted by level desc.
  const displayedSkills = (skills || [])
    .filter((s) => s.meta?.display)
    .sort((a, b) => {
      const aH = a.meta?.highlighted ? 1 : 0;
      const bH = b.meta?.highlighted ? 1 : 0;
      if (bH !== aH) return bH - aH;
      return parseInt(b.level || "0", 10) - parseInt(a.level || "0", 10);
    });

  // ── Render ──────────────────────────────────────────────────────────────
  const template = Handlebars.compile(
    fs.readFileSync(path.join(__dirname, "template.hbs"), "utf8"),
  );

  return template({
    meta,
    basics,
    work,
    education,
    languages,
    displayedSkills,
  });
};
