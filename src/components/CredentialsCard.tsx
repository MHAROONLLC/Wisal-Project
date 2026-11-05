import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";

/** The official license fields, shown on the About and Trade License pages. */
export function CredentialsList({ locale, showActivities = true }: { locale: Locale; showActivities?: boolean }) {
  const l = getDictionary(locale).license;
  const rows: [string, string, boolean?][] = [
    [l.company, company.name.en],
    [l.tradeName, company.name.ar, true],
    // [l.legalType, company.legalType[locale]],
    [l.authority, company.authority[locale]],
    [l.licenseNo, company.licenseNo],
    [l.registerNo, company.registerNo],
    [l.dcciNo, company.dcciNo],
    [l.memberSince, String(company.foundedYear)],
    [l.issueDate, company.issueDate],
    [l.expiryDate, company.expiryDate],
  ];
  return (
    <div>
      <dl className="divide-y divide-silver-200">
        {rows.map(([k, v, ar]) => (
          <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 py-3 text-sm">
            <dt className="text-silver-400">{k}</dt>
            <dd className={`font-semibold text-navy-900 ${ar ? "font-arabic" : ""}`} dir={ar ? "rtl" : undefined}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
      {showActivities && (
        <div className="mt-5">
          <p className="text-sm font-bold text-navy-900">{l.activities}</p>
          <ul className="mt-3 grid gap-2">
            {services.map((s) => (
              <li key={s.slug} className="flex items-start gap-2 text-sm text-navy-800">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span>
                  {s.title.en}
                  <span className="block font-arabic text-xs text-silver-400" dir="rtl" lang="ar">
                    {s.title.ar}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function LicenseLink({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <Link href={`/${locale}/license`} className="group inline-flex items-center gap-2 font-semibold text-brand-600">
      {d.common.viewLicense}
      <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
