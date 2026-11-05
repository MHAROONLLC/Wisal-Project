import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/lib/services";

const paths = ["", "/about", "/services", ...services.map((s) => `/services/${s.slug}`), "/fleet", "/license", "/quote", "/contact", "/faq", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}/en${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/license" || p === "/quote" ? 0.9 : 0.7,
    alternates: { languages: { en: `${SITE_URL}/en${p}`, ar: `${SITE_URL}/ar${p}` } },
  }));
}
