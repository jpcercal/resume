import * as theme from "jsonresume-theme-local";
import { render } from "resumed";

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
}
