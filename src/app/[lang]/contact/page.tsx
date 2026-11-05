import { notFound } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, Navigation, Phone, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company, whatsappLink } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/contact", d.contact.title, d.contact.subtitle);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const c = d.contact;
  const linkCls = "block font-semibold text-navy-900 transition-colors hover:text-brand-600";

  const cards = [
    {
      icon: Phone,
      title: c.phones,
      body: (
        <div className="space-y-1">
          {company.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} dir="ltr" className={linkCls}>
              {p.display}
            </a>
          ))}
        </div>
      ),
    },
    {
      icon: PhoneCall,
      title: c.landline,
      body: (
        <a href={`tel:${company.landline.tel}`} dir="ltr" className={linkCls}>
          {company.landline.display}
        </a>
      ),
    },
    {
      icon: Mail,
      title: c.emailLabel,
      body: (
        <a href={`mailto:${company.email}`} className={`${linkCls} break-all`}>
          {company.email}
        </a>
      ),
    },
    {
      icon: WhatsAppIcon,
      title: d.common.whatsapp,
      body: (
        <a href={whatsappLink(d.common.whatsappMsg)} target="_blank" rel="noopener noreferrer" dir="ltr" className={linkCls}>
          {company.phones[0].display}
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHero
        title={c.title}
        subtitle={c.subtitle}
        image="/images/workshop-loading.webp"
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.contact }]}
      />

      <section className={ui.surface}>
        <div className="container-x">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <div className={`group h-full p-6 ${ui.card} ${ui.cardHover}`}>
                  <span className={ui.icon}>
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-5 text-sm font-medium text-silver-400">{title}</h2>
                  <div className="mt-1.5">{body}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="flex h-full flex-col rounded-2xl bg-blue-band shadow-lift p-7 text-white sm:p-8">
                <span className={ui.iconDark}>
                  <MapPin className="size-5" />
                </span>
                <h2 className="mt-5 text-sm font-medium text-brand-100">{c.address}</h2>
                <p className="mt-1.5 text-lg font-semibold">{company.address[lang]}</p>
                <p className="mt-1 text-sm text-brand-100">
                  {c.poBox} {company.poBox}
                </p>

                <h3 className="mt-8 flex items-center gap-2 text-sm font-medium text-brand-100">
                  <Clock className="size-4" /> {c.hours}
                </h3>
                <dl className="mt-3 divide-y divide-white/10 text-sm">
                  {company.hours[lang].map((h) => (
                    <div key={h.days} className="flex justify-between gap-3 py-2.5">
                      <dt className="text-brand-100">{h.days}</dt>
                      <dd className="font-semibold">{h.time}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto grid gap-3 pt-8">
                  <Button href={company.mapLink} variant="white">
                    <Navigation className="size-4" /> {c.directions}
                  </Button>
                  <Button href={`/${lang}/quote`} variant="outlineLight">
                    {c.formCta} <ArrowRight className="flip-rtl size-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className={`h-full min-h-[360px] overflow-hidden lg:min-h-[480px] ${ui.card}`}>
                <iframe
                  title={`${company.name.en} — ${company.address.en}`}
                  src={company.mapEmbed}
                  className="size-full min-h-[360px] lg:min-h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
