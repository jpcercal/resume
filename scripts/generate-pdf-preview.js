import * as theme from "jsonresume-theme-local";
import { render } from "resumed";
import { EXPECTED_PDF_PAGES } from "./constants.js";

const PREVIEW_WIDTH = 800;
const PREVIEW_HEIGHT = 29.7 * 37 * EXPECTED_PDF_PAGES; // A4 cm-to-px × page count

export async function run(page, resume, outputPath) {
  const html = await render(resume, theme);

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await page.setViewport({ width: PREVIEW_WIDTH, height: Math.round(PREVIEW_HEIGHT) });
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
