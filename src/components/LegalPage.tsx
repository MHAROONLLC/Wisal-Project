import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { legal } from "@/lib/legal";

export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const d = getDictionary(locale);
  const doc = legal[kind][locale];
  return (
    <>
      <PageHero title={doc.title} subtitle={doc.updated} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: doc.title }]} />
      <section className="section-y bg-surface">
        <div className="container-x max-w-3xl">
          <div className="rounded-2xl border border-silver-200 bg-white p-6 sm:p-10">
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} delay={Math.min(i, 3) * 0.05} className="border-b border-silver-200 py-8 first:pt-0 last:border-0">
              <h2 className="flex items-center gap-3 text-xl font-bold text-navy-900">
                <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-sm text-brand-600">{i + 1}</span>
                {s.h}
              </h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-silver-400">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
