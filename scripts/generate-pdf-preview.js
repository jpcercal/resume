import * as theme from "jsonresume-theme-local";
import { render } from "resumed";

const PREVIEW_WIDTH = 800;
const PREVIEW_HEIGHT = 29.7 * 37 * 2; // (A4 in centimeters to pixels) * 2 pages

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
