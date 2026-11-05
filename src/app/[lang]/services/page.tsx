import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { FinalCta } from "@/components/home/Sections";
import { ServiceIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/services", d.services.title, d.services.subtitle);
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      <PageHero
        title={d.services.title}
        subtitle={d.services.subtitle}
        image="/images/container-coastal.webp"
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.services }]}
      >
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver-300">
          {company.specialties.map((s) => (
            <li key={s.key} className="flex items-center gap-2">
              <Check className="size-4 text-cyan-300" /> {s[lang]}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className={ui.surface}>
        <div className="container-x space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <Link
                href={`/${lang}/services/${s.slug}`}
                className={`group grid overflow-hidden md:grid-cols-5 ${ui.card} ${ui.cardHover}`}
              >
                <div className={`relative aspect-[16/10] overflow-hidden md:col-span-2 md:aspect-auto md:min-h-72 ${i % 2 ? "md:order-2" : ""}`}>
                  <Image
                    src={s.image}
                    alt={s.title.en}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 md:col-span-3">
                  <div className="flex items-center gap-4">
                    <span className={ui.icon}>
                      <ServiceIcon name={s.icon} className="size-6" />
                    </span>
                    <span className="text-sm font-bold text-silver-400">0{i + 1}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-navy-900">{s.title[lang]}</h2>
                  <p className="mt-2 leading-relaxed text-silver-400">{s.short[lang]}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {s.benefits[lang].slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-navy-800">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-600" /> {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    {d.common.learnMore}
                    <ArrowRight className="flip-rtl size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta locale={lang} />
    </>
  );
}
