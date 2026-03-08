import { promises as fs } from "fs";
import puppeteer from "puppeteer";
import { run as generatePdf } from "./scripts/generate-pdf.js";
import { run as generatePdfPreview } from "./scripts/generate-pdf-preview.js";
import { run as generateJsonPreview } from "./scripts/generate-json-preview.js";

const PATHS = {
  resumeJson:      "/app/resume.json",
  resumePdf:       "/app/resume.pdf",
  resumePdfPng:    "/app/resume.pdf.png",
  resumeJsonPng:   "/app/resume.json.png",
};

const resume = JSON.parse(await fs.readFile(PATHS.resumeJson, "utf-8"));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

await generatePdf(page, resume, PATHS.resumePdf);
await generatePdfPreview(page, resume, PATHS.resumePdfPng);
await generateJsonPreview(page, resume, PATHS.resumeJsonPng);

await browser.close();
