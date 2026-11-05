import Image from "next/image";
import { notFound } from "next/navigation";
import { Eye, Handshake, Scale, ShieldCheck, Target, Timer } from "lucide-react";
import { CredentialsList, LicenseLink } from "@/components/CredentialsCard";
import { FinalCta } from "@/components/home/Sections";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { ui } from "@/components/ui/styles";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/about", d.about.title, d.about.subtitle);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const valueIcons = [Scale, ShieldCheck, Timer, Handshake];

  return (
    <>
      <PageHero
        title={d.about.title}
        subtitle={d.about.subtitle}
        image="/images/workshop-loading.webp"
        crumbs={[{ label: d.nav.home, href: `/${lang}` }, { label: d.nav.about }]}
      />

      <section className={ui.white}>
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow={d.about.storyTitle} title={company.taglines.primary[lang]} />
            <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-silver-400 sm:text-lg">
              {d.about.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal direction="end" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/refrigerated-fleet.webp"
                alt="Muhammad Wisal Transport refrigerated trucks on Sheikh Zayed Road, Dubai"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 rounded-xl bg-amber-400 px-6 py-4 text-navy-950 shadow-lift ltr:left-6 rtl:right-6">
              <p className="text-xs font-bold tracking-wider text-navy-900/70 uppercase rtl:tracking-normal">{d.common.since}</p>
              <p className="text-3xl font-bold">{company.foundedYear}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={ui.surface}>
        <div className="container-x grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, title: d.about.missionTitle, text: d.about.mission },
            { icon: Eye, title: d.about.visionTitle, text: d.about.vision },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className={`group h-full p-8 sm:p-10 ${ui.card} ${ui.cardHover}`}>
                <span className={ui.icon}>
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-navy-900">{title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-silver-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={ui.dark}>
        <div className="container-x">
          <SectionHeading title={d.about.valuesTitle} center dark />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.about.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <StaggerItem key={v.title} className="h-full">
                  <div className={`group h-full p-7 ${ui.cardDark}`}>
                    <span className={`${ui.iconDark} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver-300">{v.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className={ui.surface}>
        <div className="container-x grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading title={d.about.credentialsTitle} text={d.about.credentialsText} />
            <Reveal delay={0.1} className="mt-6">
              <LicenseLink locale={lang} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className={`p-6 sm:p-8 ${ui.card}`}>
              <CredentialsList locale={lang} showActivities={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta locale={lang} />
    </>
  );
}
