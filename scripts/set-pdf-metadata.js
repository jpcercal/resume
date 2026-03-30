import { readFileSync, writeFileSync } from "fs";
import { PDFDocument } from "pdf-lib";

export async function setPdfMetadata(pdfPath, resume) {
  const pdfBuffer = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const { basics, meta } = resume;
  const aiContext = meta?.ai_context || {};

  // Set /Title (already populated by Chromium, but ensure it's correct)
  pdfDoc.setTitle(`${basics.name} – ${basics.label}`);

  // Set /Author
  pdfDoc.setAuthor(basics.name);

  // Set /Subject: label + first sentence of summary
  const summaryFirstSentence = basics.summary?.split(".")[0] || "";
  const subject = `${basics.label} – ${summaryFirstSentence}`;
  pdfDoc.setSubject(subject);

  // Set /Keywords from ai_context.keywords
  if (aiContext.keywords?.length) {
    pdfDoc.setKeywords(aiContext.keywords);
  }

  // Set /Creator: custom signature
  pdfDoc.setCreator("João Cercal – jpcercal.com");

  // Save back to disk
  const pdfBytes = await pdfDoc.save();
  writeFileSync(pdfPath, pdfBytes);
}
