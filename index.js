import { promises as fs } from "fs";
import puppeteer from "puppeteer";
import { render } from "resumed";
import * as theme from "jsonresume-theme-local";
import { run as generatePdf } from "./scripts/generate-pdf.js";
import { run as generatePdfPreview } from "./scripts/generate-pdf-preview.js";
import { run as generateJsonPreview } from "./scripts/generate-json-preview.js";
import { LOCALE_CONFIG, outputPaths } from "./scripts/constants.js";

const LOCALE = process.env.LOCALE || null;
const localesToBuild = LOCALE ? [LOCALE] : Object.keys(LOCALE_CONFIG);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

try {
  for (const locale of localesToBuild) {
    const { expectedPages } = LOCALE_CONFIG[locale];
    const paths = outputPaths(locale);
    const resume = JSON.parse(await fs.readFile(paths.resumeJson, "utf-8"));
    const html = await render(resume, theme);

    await generatePdf(page, html, resume, paths.resumePdf, expectedPages);
    await generatePdfPreview(page, html, paths.resumePdfPng, expectedPages);
    await generateJsonPreview(page, resume, paths.resumeJsonPng);
  }
} finally {
  await browser.close();
}
