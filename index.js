import { promises as fs } from "fs";
import puppeteer from "puppeteer";
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

for (const locale of localesToBuild) {
  const { expectedPages } = LOCALE_CONFIG[locale];
  const paths = outputPaths(locale);
  const resume = JSON.parse(await fs.readFile(paths.resumeJson, "utf-8"));

  await generatePdf(page, resume, paths.resumePdf, expectedPages);
  await generatePdfPreview(page, resume, paths.resumePdfPng, expectedPages);
  await generateJsonPreview(page, resume, paths.resumeJsonPng);
}

await browser.close();
