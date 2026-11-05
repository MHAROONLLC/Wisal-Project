import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Truck, Wrench } from "lucide-react";
import { FinalCta } from "@/components/home/Sections";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { fleet } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/fleet">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/fleet", d.fleet.title, d.fleet.subtitle);
}

export default async function FleetPage({ params }: PageProps<"/[lang]/fleet">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      <PageHero
        title={d.fleet.title}
        subtitle={d.fleet.subtitle}
        image="/images/refrigerated-fleet.webp"
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.fleet }]}
      />

      <section className={ui.surface}>
        <Stagger className="container-x grid gap-6 lg:grid-cols-2">
          {fleet.map((f) => (
            <StaggerItem key={f.id} className="h-full">
              <article id={f.id} className={`group flex h-full scroll-mt-28 flex-col overflow-hidden ${ui.card} ${ui.cardHover}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
                  {f.image ? (
                    <Image
                      src={f.image}
                      alt={f.name.en}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-blue-band text-center text-white">
                      <div>
                        <Truck className="mx-auto size-16 text-cyan-200 rtl:-scale-x-100" strokeWidth={1.25} />
                        <p className="mt-2 text-xs text-brand-100">{d.fleet.photoSoon}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-navy-900">{f.name[lang]}</h2>
                  <p className="mt-2 leading-relaxed text-silver-400">{f.desc[lang]}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-silver-200 bg-silver-200">
                    {f.specs.map((s) => (
                      <div key={s.label.en} className="bg-surface p-3">
                        <dt className="text-[11px] font-medium text-silver-400">{s.label[lang]}</dt>
                        <dd className="mt-0.5 text-sm font-bold text-navy-900">{s.value[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-xs font-bold tracking-wider text-silver-400 uppercase rtl:tracking-normal">{d.fleet.usedFor}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {f.uses[lang].map((u) => (
                      <li key={u} className="inline-flex items-center gap-1.5 text-sm text-navy-800">
                        <Check className="size-4 text-brand-600" /> {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={ui.white}>
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className={ui.icon}>
              <Wrench className="size-6" />
            </span>
            <div className="mt-6">
              <SectionHeading title={d.fleet.workshopTitle} text={d.fleet.workshopText} />
            </div>
            <Reveal delay={0.1} className="mt-8">
              <Button href={`/${lang}/quote`} size="lg">
                {d.nav.quote}
              </Button>
            </Reveal>
          </div>
          <Reveal direction="end">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/images/workshop-loading.webp"
                alt="Muhammad Wisal Transport workshop and maintenance facility"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta locale={lang} surface />
    </>
  );
}
