import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company, whatsappLink } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/quote">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/quote", d.quote.title, d.quote.subtitle);
}

export default async function QuotePage({ params }: PageProps<"/[lang]/quote">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      <PageHero
        title={d.quote.title}
        subtitle={d.quote.subtitle}
        image="/images/container-coastal.webp"
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.quote }]}
      />
      <section className={ui.surface}>
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <Suspense fallback={<div className={`h-[900px] animate-pulse ${ui.card}`} />}>
                <QuoteForm />
              </Suspense>
            </Reveal>
          </div>
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Reveal direction="end">
              <div className="rounded-2xl bg-blue-band shadow-lift p-7 text-white">
                <h2 className="text-xl font-bold">{d.quote.sideTitle}</h2>
                <p className="mt-2 text-sm text-brand-100">{d.quote.sideText}</p>
                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {[...company.phones, company.landline].map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`} className="group flex items-center gap-3 py-3 transition-colors hover:text-amber-300">
                        <Phone className="size-4 text-amber-300" />
                        <span dir="ltr" className="font-semibold">
                          {p.display}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-3">
                  <Button href={whatsappLink(d.common.whatsappMsg)} variant="whatsapp">
                    <WhatsAppIcon className="size-4" /> {d.common.whatsapp}
                  </Button>
                  <Button href={`mailto:${company.email}`} variant="outlineLight">
                    <Mail className="size-4" /> {company.email}
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal direction="end" delay={0.1}>
              <div className={`p-6 ${ui.card}`}>
                <h3 className="flex items-center gap-2 font-bold text-navy-900">
                  <Clock className="size-5 text-brand-600" /> {d.contact.hours}
                </h3>
                <dl className="mt-3 divide-y divide-silver-200 text-sm">
                  {company.hours[lang].map((h) => (
                    <div key={h.days} className="flex justify-between gap-3 py-2.5">
                      <dt className="text-silver-400">{h.days}</dt>
                      <dd className="font-semibold text-navy-900">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 border-t border-silver-200 pt-4 text-xs text-silver-400">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" /> {d.common.licenseNo} {company.licenseNo} · {d.footer.licensed}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
