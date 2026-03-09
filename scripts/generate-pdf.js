import { readFileSync } from "fs";
import * as theme from "jsonresume-theme-local";
import { render } from "resumed";
import { EXPECTED_PDF_PAGES } from "./constants.js";

export async function run(page, resume, outputPath) {
  const html = await render(resume, theme);

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outputPath,
    format: "a4",
    printBackground: true,
    tagged: true, // emit PDF/UA structure tree for screen readers and ATS parsers
  });

  // ── Page count guard ────────────────────────────────────────────────
  // Read the Pages catalog /Count — more reliable than counting /Type /Page
  const pdfContent = readFileSync(outputPath, "latin1");
  const countMatch = pdfContent.match(/\/Type\s*\/Pages\s*[^>]*\/Count\s+(\d+)/);
  const pageCount = countMatch ? parseInt(countMatch[1], 10) : 0;

  if (pageCount !== EXPECTED_PDF_PAGES) {
    console.error(
      `PDF page count guard FAILED: expected ${EXPECTED_PDF_PAGES} pages, got ${pageCount}`
    );
    process.exit(1);
  }

  console.log(`PDF page count: ${pageCount} (expected: ${EXPECTED_PDF_PAGES})`);
}
