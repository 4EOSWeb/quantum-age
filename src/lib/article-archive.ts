/** Quantum Age asked that articles from 2013 through 2020, including COVID-19 era guidance, stay available and be labelled as archive. */
export const ARCHIVE_THROUGH = "2020-12-31";

export function isArchivedArticle(article: { date: string }): boolean {
  return article.date <= ARCHIVE_THROUGH;
}
