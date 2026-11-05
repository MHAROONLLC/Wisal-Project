import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company, whatsappLink } from "@/lib/company";
import { faqs } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/faq", d.faq.title, d.faq.subtitle);
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const items = faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
        }}
      />
      <PageHero title={d.faq.title} subtitle={d.faq.subtitle} crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.faq }]} />
      <section className={ui.surface}>
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FaqAccordion items={items} />
          </div>
          <Reveal direction="end" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-blue-band shadow-lift p-7 text-white">
              <h2 className="text-xl font-bold">{d.faq.more}</h2>
              <p className="mt-2 text-sm text-brand-100">{d.quote.sideText}</p>
              <div className="mt-6 grid gap-3">
                <Button href={`tel:${company.phones[0].tel}`} variant="accent">
                  <Phone className="size-4" /> {d.common.callNow}
                </Button>
                <Button href={whatsappLink(d.common.whatsappMsg)} variant="outlineLight">
                  <WhatsAppIcon className="size-4" /> {d.common.whatsapp}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
