export const PREVIEW_WIDTH = 800;

export async function run(page, html, outputPath, expectedPages) {
  const PREVIEW_HEIGHT = 29.7 * 37 * expectedPages; // A4 cm-to-px × page count

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
