import type { Metadata } from "next";
import { company } from "./company";
import type { Locale } from "./i18n";

/** Replace with the production domain once it is registered. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mwtransport.ae";

/** Builds per-page metadata with canonical + hreflang alternates for /en and /ar. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const suffix = locale === "ar" ? company.shortName.ar : company.shortName.en;
  const fullTitle = path === "" ? title : `${title} | ${suffix}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}${path}`,
      siteName: company.name[locale],
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [{ url: "/images/container-coastal.webp", width: 1408, height: 768 }],
    },
  };
}
