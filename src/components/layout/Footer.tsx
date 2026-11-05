import Link from "next/link";
import { BadgeCheck, FileText, Mail, MapPin, Phone } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Brand } from "./Brand";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  const quick = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/fleet`, label: dict.nav.fleet },
    { href: `${base}/license`, label: dict.nav.license },
    { href: `${base}/quote`, label: dict.nav.quote },
    { href: `${base}/faq`, label: dict.nav.faq },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="relative bg-navy-950 text-silver-300">
      <div className="h-1 bg-gradient-to-r from-brand-600 via-cyan-400 to-amber-400 rtl:bg-gradient-to-l" aria-hidden />

      <div className="relative container-x pt-16 pb-28 sm:pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{dict.footer.about}</p>
            <Link
              href={`${base}/license`}
              className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 p-3 transition-colors hover:border-brand-400/60"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-brand-600 text-white">
                <BadgeCheck className="size-6" />
              </span>
              <span className="text-sm">
                <span className="block font-bold text-white">
                  {dict.common.licenseNo} {company.licenseNo}
                </span>
                <span className="text-xs text-silver-300">{dict.footer.licensed}</span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase rtl:tracking-normal">{dict.footer.quickLinks}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {quick.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center transition-colors hover:text-white">
                      <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:me-2 group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase rtl:tracking-normal">{dict.footer.servicesTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`${base}/services/${s.slug}`} className="group inline-flex items-center transition-colors hover:text-white">
                      <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:me-2 group-hover:w-3" />
                      {s.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold tracking-wider text-white uppercase rtl:tracking-normal">{dict.footer.contactTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[...company.phones, company.landline].map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} dir="ltr" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <Phone className="size-4 text-brand-400" /> {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappLink(dict.common.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="size-4 text-[#25d366]" /> {dict.common.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 break-all transition-colors hover:text-white">
                    <Mail className="size-4 shrink-0 text-brand-400" /> {company.email}
                  </a>
                </li>
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
                  <span>
                    {company.address[locale]}
                    <br />
                    {dict.contact.poBox} {company.poBox}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            {/* © {company.name.en} · {company.name.ar}. {dict.footer.rights} */}
             MADE
             BY
             MUHAMMAD
             HAROON
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="size-3.5" /> {dict.common.licenseNo} {company.licenseNo}
            </span>
            <Link href={`${base}/privacy`} className="hover:text-white">
              {dict.footer.privacy}
            </Link>
            <Link href={`${base}/terms`} className="hover:text-white">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
