// ── Monokai dark-theme colour helpers ────────────────────────────────────────
// Each helper wraps a string in a <span> with the appropriate Monokai colour.

const key = (s) => `<span class="k">${s}</span>`; // green  — JSON keys
const str = (s) => `<span class="s">${s}</span>`; // yellow — string values
const nil = (s) => `<span class="n">${s}</span>`; // purple — null / numbers
const punc = (s) => `<span class="p">${s}</span>`; // pink   — punctuation
const comment = (s) => `<span class="c">${s}</span>`; // grey   — comments

// ── Line-building helpers ─────────────────────────────────────────────────────

// Indent level 1 (2 spaces): top-level key–value pair
const line = (k, v) => `  ${key(`"${k}"`)}${punc(":")} ${v}`;

// Indent level 2 (4 spaces, or custom): nested key–value pair
const nested = (k, v, indent = "    ") => `${indent}${key(`"${k}"`)}${punc(":")} ${v}`;

// ── Data extraction ───────────────────────────────────────────────────────────

// Number of work entries to show before truncating with "… N more positions"
const WORK_SHOWN = 3;
// Number of skills to show before truncating with "+ N more"
const SKILLS_SHOWN = 12;

function buildWorkLines(work) {
  const shown = work.slice(0, WORK_SHOWN).map((w) => {
    const endDate = w.endDate ? str(`"${w.endDate}"`) : nil("null");
    return (
      `    ${punc("{")} ` +
      `${key('"position"')}: ${str(`"${w.position}"`)}${punc(",")} ` +
      `${key('"company"')}: ${str(`"${w.company}"`)}${punc(",")} ` +
      `${key('"startDate"')}: ${str(`"${w.startDate}"`)}${punc(",")} ` +
      `${key('"endDate"')}: ${endDate} ` +
      `${punc("}")}`
    );
  });

  const remainder = work.length - WORK_SHOWN;
  if (remainder > 0) {
    const label = remainder === 1 ? "position" : "positions";
    shown.push(`    ${comment(`// … ${remainder} more ${label}`)}`);
  }

  return shown;
}

function buildSkillsLine(skills) {
  const names = skills
    .slice(0, SKILLS_SHOWN)
    .map((s) => str(`"${s.name}"`))
    .join(`${punc(",")} `);

  const remainder = skills.length - SKILLS_SHOWN;
  const suffix = remainder > 0 ? `${punc(",")} ${comment(`/* +${remainder} more */`)}` : "";

  return names + suffix;
}

// ── HTML template ─────────────────────────────────────────────────────────────

function buildHtml(resume) {
  const { basics, work = [], skills = [] } = resume;

  const profilesInline = basics.profiles
    .map((p) => str(`"${p.network}/${p.username}"`))
    .join(`${punc(",")} `);

  const workLines = buildWorkLines(work);
  const skillsLine = buildSkillsLine(skills);
  const schema = resume["$schema"] ?? "jsonresume/v1.0.0";

  const json = [
    punc("{"),
    line("$schema", str(`"${schema}"`)) + punc(","),
    "",
    line("basics", punc("{")) + punc(","),
    nested("name", str(`"${basics.name}"`)) + punc(","),
    nested("label", str(`"${basics.label}"`)) + punc(","),
    nested("location", str(`"${basics.location?.address ?? ""}"`)) + punc(","),
    nested("email", str(`"${basics.email}"`)) + punc(","),
    nested("profiles", `${punc("[")} ${profilesInline} ${punc("]")}`),
    `  ${punc("}")}` + punc(","),
    "",
    line("work", punc("[")) + punc(","),
    ...workLines.map((l, i) => l + (i < workLines.length - 1 ? punc(",") : "")),
    `  ${punc("]")}` + punc(","),
    "",
    line("skills", `${punc("[")} ${skillsLine} ${punc("]")}`) + punc(","),
    "",
    `  ${comment("// education · volunteer · projects · references — omitted for brevity")}`,
    punc("}"),
  ].join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    background: #272822;
    color: #f8f8f2;
    font-family: "JetBrains Mono", "Fira Mono", "Cascadia Code", "Courier New", monospace;
    font-size: 12.5px;
    line-height: 1.7;
    padding: 16px 20px;
    -webkit-font-smoothing: antialiased;
  }
  pre { white-space: pre-wrap; word-break: break-word; }
  .k { color: #a6e22e; }                    /* keys     — green  */
  .s { color: #e6db74; }                    /* strings  — yellow */
  .n { color: #ae81ff; }                    /* null     — purple */
  .p { color: #f92672; }                    /* punc     — pink   */
  .c { color: #75715e; font-style: italic; }/* comments — grey   */
</style>
</head>
<body>
<pre>${json}</pre>
</body>
</html>`;
}

// ── Entry point ───────────────────────────────────────────────────────────────

import { PREVIEW_WIDTH } from "./constants.js";

const PREVIEW_HEIGHT = 520;

export async function run(page, resume, outputPath) {
  const html = buildHtml(resume);

  await page.setViewport({
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.screenshot({
    path: outputPath,
    type: "png",
    clip: {
      x: 0,
      y: 0,
      width: PREVIEW_WIDTH,
      height: PREVIEW_HEIGHT,
    },
  });
}
