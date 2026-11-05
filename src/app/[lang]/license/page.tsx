import { notFound } from "next/navigation";
import { ExternalLink, EyeOff, ShieldCheck } from "lucide-react";
import { CredentialsList } from "@/components/CredentialsCard";
import { LicenseStatus } from "@/components/license/LicenseStatus";
import { LicenseViewer } from "@/components/license/LicenseViewer";
import { SiteQr } from "@/components/license/SiteQr";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/license">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/license", d.license.title, d.license.subtitle);
}

export default async function LicensePage({ params }: PageProps<"/[lang]/license">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.license;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.license }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <LicenseStatus large />
          <span className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold">
            {d.common.licenseNo} {company.licenseNo}
          </span>
        </div>
      </PageHero>

      <section className="section-y bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <LicenseViewer />
          </div>

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Reveal direction="end">
              <div className="rounded-2xl border border-silver-200 bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-navy-900">{t.details}</h2>
                  <LicenseStatus />
                </div>
                <div className="mt-4">
                  <CredentialsList locale={lang} />
                </div>
              </div>
            </Reveal>

            <Reveal direction="end" delay={0.1}>
              <div className="rounded-2xl border border-silver-200 bg-white p-6 sm:p-7">
                <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900">
                  <ShieldCheck className="size-5 text-brand-600" /> {t.verifyTitle}
                </h2>
                <ol className="mt-4 space-y-3 text-sm text-navy-800">
                  <li className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-600 text-xs font-bold text-white">1</span>
                    {t.verifyQr}
                  </li>
                  <li className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-600 text-xs font-bold text-white">2</span>
                    <span>
                      {t.verifyDcci}{" "}
                      <a
                        href={company.dcciVerifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-brand-600 underline-offset-2 hover:underline"
                      >
                        dubaichamber.ae/verify <ExternalLink className="size-3.5" />
                      </a>
                    </span>
                  </li>
                </ol>
                <p className="mt-5 flex items-start gap-2 border-t border-silver-200 pt-4 text-xs text-silver-400">
                  <EyeOff className="mt-0.5 size-4 shrink-0" /> {t.privacyNote}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="no-print container-x mt-10">
          <Reveal>
            <SiteQr />
          </Reveal>
        </div>
      </section>
    </>
  );
}
