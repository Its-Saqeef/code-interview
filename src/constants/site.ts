export const SITE_NAME = 'Compile.io';

export function formatDocumentTitle(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
}
