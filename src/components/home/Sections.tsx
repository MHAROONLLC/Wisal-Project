import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  CircleCheckBig,
  FileText,
  Forklift,
  Phone,
  QrCode,
  Receipt,
  Send,
  ShieldCheck,
  Snowflake,
  Timer,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company, documents, whatsappLink } from "@/lib/company";
import { fleet } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";

type P = { locale: Locale };

function Arrow() {
  return <ArrowRight className="flip-rtl size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />;
}

export function TrustStrip({ locale }: P) {
  const t = getDictionary(locale).trust;
  const items = [
    { icon: ShieldCheck, title: t.licensed, sub: t.licensedSub },
    { icon: CalendarCheck, title: t.since, sub: t.sinceSub },
    { icon: Award, title: t.dcci, sub: t.dcciSub },
    { icon: QrCode, title: t.verify, sub: t.verifySub, href: `/${locale}/license` },
  ];
  return (
    <section className="relative z-10 -mt-24 bg-[linear-gradient(to_bottom,transparent_6rem,var(--color-sky-tint)_6rem)]">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand-100 bg-brand-100 shadow-lift lg:grid-cols-4">
            {items.map(({ icon: Icon, title, sub, href }) => {
              const body = (
                <>
                  <span className={ui.icon}>
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy-900 sm:text-base">{title}</span>
                    <span className="mt-0.5 block text-xs text-silver-400 sm:text-sm">{sub}</span>
                  </span>
                </>
              );
              const cls = "group flex flex-col gap-3 bg-white p-5 transition-colors sm:flex-row sm:items-center sm:gap-4 sm:p-6";
              return href ? (
                <Link key={title} href={href} className={`${cls} hover:bg-brand-50`}>
                  {body}
                </Link>
              ) : (
                <div key={title} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesGrid({ locale }: P) {
  const d = getDictionary(locale);
  return (
    <section className={ui.surface}>
      <div className="container-x">
        <SectionHeading
          eyebrow={d.home.servicesEyebrow}
          title={d.home.servicesTitle}
          text={d.home.servicesText}
          action={
            <Link href={`/${locale}/services`} className={ui.link}>
              {d.nav.allServices} <Arrow />
            </Link>
          }
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug} className="h-full">
              <Link href={`/${locale}/services/${s.slug}`} className={`group flex h-full flex-col p-7 ${ui.card} ${ui.cardHover}`}>
                <span className={ui.icon}>
                  <ServiceIcon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{s.title[locale]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-400">{s.short[locale]}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {d.common.learnMore} <Arrow />
                </span>
              </Link>
            </StaggerItem>
          ))}
          <StaggerItem className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-blue-band p-7 text-white shadow-lift">
              <div>
                <h3 className="text-xl font-bold">{d.home.ctaTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100">{d.home.ctaText}</p>
              </div>
              <div className="mt-8 grid gap-3">
                <Button href={`/${locale}/quote`} variant="accent">{d.nav.quote}</Button>
                <Button href={whatsappLink(d.common.whatsappMsg)} variant="outlineLight">
                  <WhatsAppIcon className="size-4" /> {d.common.whatsapp}
                </Button>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

export function AboutPreview({ locale }: P) {
  const d = getDictionary(locale);
  const icons = [Wrench, Forklift, Phone];
  return (
    <section className={ui.white}>
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal direction="start" className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-400 to-cyan-400 opacity-90  " aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/images/workshop-loading.jpg"
              alt="Forklift loading crated cargo onto a Muhammad Wisal Transport truck at the Ras Al Khor workshop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 rounded-xl bg-amber-400 px-6 py-4 text-navy-950 shadow-lift ltr:left-6 rtl:right-6">
            <p className="text-xs font-bold tracking-wider text-navy-900/70 uppercase rtl:tracking-normal">{d.common.since}</p>
            <p className="text-3xl font-bold">
              <Counter from={1990} to={company.foundedYear} />
            </p>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={d.home.aboutEyebrow} title={d.home.aboutTitle} text={d.home.aboutText} />
          <Stagger className="mt-8 grid gap-3">
            {d.home.aboutPoints.map((p, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={p}>
                  <div className={`group flex items-center gap-4 p-4 ${ui.card} ${ui.cardHover}`}>
                    <span className={ui.iconSm}>
                      <Icon className="size-4" />
                    </span>
                    <span className="font-semibold text-navy-900">{p}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal delay={0.15} className="mt-8">
            <Button href={`/${locale}/about`} variant="outline">
              {d.common.learnMore} <Arrow />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function StatsBand({ locale }: P) {
  const d = getDictionary(locale);
  return (
    <section className="bg-blue-band py-16 text-white sm:py-20">
      <Stagger className="container-x">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/20 lg:rtl:divide-x-reverse">
        {d.home.stats.map((s) => (
          <StaggerItem key={s.label} className="px-4 text-center">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">
              <Counter to={s.value} from={"plain" in s && s.plain ? 1990 : 0} suffix={s.suffix} />
            </p>
            <span className="mx-auto mt-3 block h-1 w-10 rounded-full bg-amber-400" aria-hidden />
            <p className="mt-3 text-sm font-medium text-brand-100">{s.label}</p>
          </StaggerItem>
        ))}
        </div>
      </Stagger>
    </section>
  );
}

export function WhyChooseUs({ locale }: P) {
  const d = getDictionary(locale);
  const icons = [BadgeCheck, Timer, Snowflake, ShieldCheck, Wrench, Receipt];
  return (
    <section className={ui.dark}>
      <div className="container-x">
        <SectionHeading eyebrow={d.home.whyEyebrow} title={d.home.whyTitle} center dark />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.home.why.map((w, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={w.title} className="h-full">
                <div className={`group h-full p-7 ${ui.cardDark}`}>
                  <span className={`${ui.iconDark} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">{w.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function Process({ locale }: P) {
  const d = getDictionary(locale);
  const icons = [Send, Receipt, Forklift, CircleCheckBig];
  return (
    <section className={ui.surface}>
      <div className="container-x">
        <SectionHeading eyebrow={d.home.processEyebrow} title={d.home.processTitle} center />
        <div className="relative mt-14">
          <div className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r from-brand-600 via-cyan-400 to-amber-400 lg:block rtl:bg-gradient-to-l" aria-hidden />
          <Stagger className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {d.home.process.map((p, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={p.title} className="group text-center">
                  <div className="relative mx-auto grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-[0_10px_24px_-10px_rgb(26_79_230/0.8)] ring-8 ring-sky-tint transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-5 inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-navy-950">0{i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-navy-900">{p.title}</h3>
                  <p className="mx-auto mt-2 max-w-60 text-sm leading-relaxed text-silver-400">{p.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export function FleetPreview({ locale }: P) {
  const d = getDictionary(locale);
  const items = fleet.filter((f) => f.image).slice(0, 3);
  return (
    <section className={ui.white}>
      <div className="container-x">
        <SectionHeading
          eyebrow={d.home.fleetEyebrow}
          title={d.home.fleetTitle}
          action={
            <Link href={`/${locale}/fleet`} className={ui.link}>
              {d.common.viewAll} <Arrow />
            </Link>
          }
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((f) => (
            <StaggerItem key={f.id} className="h-full">
              <Link href={`/${locale}/fleet#${f.id}`} className={`group flex h-full flex-col overflow-hidden ${ui.card} ${ui.cardHover}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={f.image!}
                    alt={f.name.en}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-navy-900">{f.name[locale]}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-400">{f.desc[locale]}</p>
                  {/* <div className="mt-5 flex flex-wrap gap-2">
                    {f.specs.slice(0, 2).map((s) => (
                      <span key={s.label.en} className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                        {s.value[locale]}
                      </span>
                    ))}
                  </div> */}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function LicenseShowcase({ locale }: P) {
  const d = getDictionary(locale);
  return (
    <section className={ui.dark}>
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={d.home.licenseEyebrow} title={d.home.licenseTitle} text={d.home.licenseText} dark />
          <Reveal delay={0.1}>
            <dl className="mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/12 bg-white/[0.06] rtl:divide-x-reverse">
              {[
                { k: d.license.licenseNo, v: company.licenseNo },
                { k: d.license.registerNo, v: company.registerNo },
                { k: d.license.dcciNo, v: company.dcciNo },
              ].map((x) => (
                <div key={x.k} className="p-4">
                  <dt className="text-xs text-cyan-200">{x.k}</dt>
                  <dd className="mt-1 text-lg font-bold tracking-wide sm:text-xl">{x.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/license`} size="lg" variant="accent">
              <FileText className="size-4" /> {d.common.viewLicense}
            </Button>
            <Button href={company.dcciVerifyUrl} size="lg" variant="outlineLight">
              <ShieldCheck className="size-4" /> dubaichamber.ae/verify
            </Button>
          </Reveal>
        </div>

        {/* Document stack — spreads apart on hover */}
        <Reveal direction="end" className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]">
          <Link href={`/${locale}/license`} className="group absolute inset-0" aria-label={d.common.viewLicense}>
            {documents.map((doc, i) => {
              const pos = [
                "z-10 -rotate-6 ltr:translate-x-[-16%] rtl:translate-x-[16%] group-hover:-rotate-9 ltr:group-hover:translate-x-[-28%] rtl:group-hover:translate-x-[28%]",
                "z-20 group-hover:-translate-y-3",
                "z-0 rotate-6 ltr:translate-x-[16%] rtl:translate-x-[-16%] group-hover:rotate-9 ltr:group-hover:translate-x-[28%] rtl:group-hover:translate-x-[-28%]",
              ][[1, 0, 2][i]];
              return (
                <span
                  key={doc.id}
                  className={`absolute top-0 left-[19%] block w-[62%] overflow-hidden rounded-lg bg-white shadow-[0_24px_48px_-16px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-out ${pos}`}
                >
                  <Image src={doc.preview} alt={doc.title[locale]} width={900} height={1272} sizes="300px" className="h-auto w-full" />
                </span>
              );
            })}
            <span className="absolute bottom-0 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-lg">
              <BadgeCheck className="size-4" /> {d.license.valid} {company.expiryDate}
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta({ locale, surface }: P & { surface?: boolean }) {
  const d = getDictionary(locale);
  return (
    <section className={surface ? ui.surface : ui.white}>
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-blue-band px-6 py-12 shadow-lift sm:px-12 sm:py-14">
            <div className="absolute -bottom-24 size-72 rounded-full bg-amber-400/25 blur-3xl ltr:-right-16 rtl:-left-16" aria-hidden />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{d.home.ctaTitle}</h2>
                <p className="mt-3 text-brand-100 sm:text-lg">{d.home.ctaText}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button href={`/${locale}/quote`} size="lg" variant="accent">
                  {d.nav.quote} <Arrow />
                </Button>
                <Button href={`tel:${company.phones[0].tel}`} size="lg" variant="outlineLight">
                  <Phone className="size-4" /> <span dir="ltr">{company.phones[0].display}</span>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
