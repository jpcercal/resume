import { readFileSync } from "fs";
import { setPdfMetadata } from "./set-pdf-metadata.js";

export async function run(page, html, resume, outputPath, expectedPages) {
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

  if (pageCount !== expectedPages) {
    throw new Error(
      `PDF page count guard FAILED: expected ${expectedPages} pages, got ${pageCount}`
    );
  }

  console.log(`PDF page count: ${pageCount} (expected: ${expectedPages})`);

  // ── Set PDF metadata ────────────────────────────────────────────────
  // Inject Author, Subject, Keywords, Creator into the PDF's /Info dict
  await setPdfMetadata(outputPath, resume);
  console.log("PDF metadata set");
}
