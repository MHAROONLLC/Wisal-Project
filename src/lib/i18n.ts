export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Bilingual value helper: every user-facing string in data files is stored as { en, ar }. */
export type L10n = { en: string; ar: string };
export type L10nList = { en: string[]; ar: string[] };

/** Swap the locale prefix of a pathname, e.g. /en/fleet -> /ar/fleet */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (parts[1] && hasLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
