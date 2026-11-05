import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Package, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company, whatsappLink } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, locales } from "@/lib/i18n";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) return {};
  return pageMetadata(lang, `/services/${slug}`, s.seoTitle[lang], s.short[lang]);
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) notFound();
  const d = getDictionary(lang);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title.en,
          alternateName: s.title.ar,
          description: s.intro.en,
          serviceType: s.title.en,
          areaServed: "United Arab Emirates",
          provider: { "@id": `${SITE_URL}/#business` },
          url: `${SITE_URL}/${lang}/services/${s.slug}`,
        }}
      />
      <PageHero
        title={s.title[lang]}
        subtitle={s.short[lang]}
        image={s.image}
        crumbs={[
          { label: d.nav.home, href: `/${lang}` },
          { label: d.nav.services, href: `/${lang}/services` },
          { label: s.title[lang] },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`/${lang}/quote?service=${s.slug}`} size="lg" variant="accent">
            {d.common.requestQuote}
          </Button>
          <Button href={`tel:${company.phones[0].tel}`} size="lg" variant="outlineLight">
            <Phone className="size-4" /> {d.common.callNow}
          </Button>
        </div>
      </PageHero>

      <section className={ui.white}>
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-navy-800 sm:text-xl">{s.intro[lang]}</p>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900">{d.services.benefits}</h2>
            </Reveal>
            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.benefits[lang].map((b) => (
                <StaggerItem key={b} className="h-full">
                  <div className={`group flex h-full items-start gap-3 p-5 ${ui.card} ${ui.cardHover}`}>
                    <span className={ui.iconSm}>
                      <Check className="size-4" />
                    </span>
                    <span className="font-medium text-navy-900">{b}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900">{d.services.cargo}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.cargo[lang].map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2 rounded-lg border border-silver-200 bg-white px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    <Package className="size-4 text-brand-600" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src={s.image} alt={s.title.en} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="end">
              <div className="rounded-2xl bg-blue-band shadow-lift p-7 text-white">
                <span className={ui.iconDark}>
                  <ServiceIcon name={s.icon} className="size-6" />
                </span>
                <p className="mt-5 text-3xl font-bold">{s.stat.value[lang]}</p>
                <p className="text-sm text-brand-100">{s.stat.label[lang]}</p>
                <h3 className="mt-6 text-lg font-bold">{d.services.ctaTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100">{d.services.ctaText}</p>
                <div className="mt-6 grid gap-3">
                  <Button href={`/${lang}/quote?service=${s.slug}`} variant="accent">{d.common.requestQuote}</Button>
                  <Button href={whatsappLink(`${d.common.whatsappMsg} (${s.title[lang]})`)} variant="outlineLight">
                    <WhatsAppIcon className="size-4" /> {d.common.whatsapp}
                  </Button>
                </div>
                <Link
                  href={`/${lang}/license`}
                  className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-brand-100 transition-colors hover:text-white"
                >
                  <ShieldCheck className="size-4 text-emerald-400" /> {d.common.licenseNo} {company.licenseNo} · {d.common.verified}
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className={ui.surface}>
        <div className="container-x">
          <SectionHeading title={d.services.other} />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <StaggerItem key={o.slug} className="h-full">
                <Link href={`/${lang}/services/${o.slug}`} className={`group flex h-full flex-col p-6 ${ui.card} ${ui.cardHover}`}>
                  <span className={ui.icon}>
                    <ServiceIcon name={o.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 flex-1 font-bold text-navy-900">{o.title[lang]}</h3>
                  <ArrowRight className="flip-rtl mt-4 size-4 text-brand-600 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
