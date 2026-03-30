export const LOCALE_CONFIG = {
  en: { jsonFile: "/app/resume.json", expectedPages: 3 },
  "pt-BR": { jsonFile: "/app/resume.pt-BR.json", expectedPages: 3 },
};

export const DEFAULT_LOCALE = "en";

export const PREVIEW_WIDTH = 800;

export function outputPaths(locale) {
  const suffix = locale === DEFAULT_LOCALE ? "" : `.${locale}`;
  return {
    resumeJson: LOCALE_CONFIG[locale].jsonFile,
    resumeHtml: `/app/resume${suffix}.html`,
    resumePdf: `/app/resume${suffix}.pdf`,
    resumePdfPng: `/app/resume${suffix}.pdf.png`,
    resumeJsonPng: `/app/resume${suffix}.json.png`,
  };
}
