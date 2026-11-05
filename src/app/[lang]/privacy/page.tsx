import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { hasLocale } from "@/lib/i18n";
import { legal } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const doc = legal.privacy[lang];
  return pageMetadata(lang, "/privacy", doc.title, doc.sections[0].p[0]);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage locale={lang} kind="privacy" />;
}
