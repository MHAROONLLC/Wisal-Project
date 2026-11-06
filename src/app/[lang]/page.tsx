import { Hero } from "@/components/home/Hero";
import {
  AboutPreview,
  FinalCta,
  FleetPreview,
 
  Process,
  ServicesGrid,
  StatsBand,
  TrustStrip,
  WhyChooseUs,
} from "@/components/home/Sections";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return lang === "ar"
    ? pageMetadata(
        lang,
        "",
        "محمد وصال للنقليات ش.ذ.م.م | شركة نقل بالشاحنات في دبي",
        "شركة نقل بري مرخصة في دبي منذ 2011. نقل بالشاحنات الثقيلة والخفيفة والمبردة وخدمات التحميل والتفريغ في جميع أنحاء الإمارات.",
      )
    : pageMetadata(
        lang,
        "",
        "Muhammad Wisal Transport L.L.C | Truck Transport Company in Dubai",
        "Dubai-licensed transport company since 2011. Heavy, light and refrigerated truck transport, raw materials and cargo loading & unloading across the UAE.",
      );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Hero />
      <TrustStrip locale={lang} />
      <ServicesGrid locale={lang} />
      <AboutPreview locale={lang} />
      <StatsBand locale={lang} />
      <WhyChooseUs locale={lang} />
      <Process locale={lang} />
      <FleetPreview locale={lang} />
      
      <FinalCta locale={lang} />
    </>
  );
}
