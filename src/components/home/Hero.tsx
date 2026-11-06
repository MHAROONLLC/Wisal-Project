"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BadgeCheck, Phone } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/company";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  const { locale, dict } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-navy-950 pt-28 pb-40 text-white">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }} className="relative size-full">
          <Image
            src="/images/container-coastal.webp"
            alt="Muhammad Wisal Transport container truck on a UAE coastal highway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-brand-700/30 rtl:bg-gradient-to-l" />
      <div className="absolute -bottom-40 -z-10 size-[36rem] rounded-full bg-brand-600/30 blur-3xl ltr:-left-40 rtl:-right-40" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

      <div className="container-x">
        <div className="max-w-2xl">
          <motion.p {...fadeUp(0.1)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.14em] text-cyan-200 uppercase ring-1 ring-white/15 backdrop-blur rtl:tracking-normal">
            <span className="size-1.5 rounded-full bg-amber-400" />
            {dict.home.eyebrow}
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="mt-5 text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle1} <span className="text-gradient">{dict.home.heroTitle2}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg">
            {dict.home.heroText}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/quote`} size="lg" variant="accent">
              {dict.nav.quote}
              <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Button>
            <Button href={`tel:${company.phones[0].tel}`} size="lg" variant="outlineLight">
              <Phone className="size-4" />
              {dict.common.callNow} <span dir="ltr">{company.phones[0].display}</span>
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(0.5)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver-300">
            {company.specialties.map((s) => (
              <li key={s.key} className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-cyan-300" /> {s[locale]}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* License card (desktop) */}
      {/* <motion.div
        {...fadeUp(0.7)}
        className="absolute bottom-44 hidden xl:block ltr:right-[max(2rem,calc((100vw-76rem)/2+2rem))] rtl:left-[max(2rem,calc((100vw-76rem)/2+2rem))]"
      >
        <Link
          href={`/${locale}/license`}
          className="group block w-72 rounded-2xl border border-white/15 bg-gradient-to-br from-brand-700/70 to-navy-950/80 p-5 backdrop-blur-md transition-colors hover:border-cyan-300/60"
        >
          <p className="text-xs font-semibold tracking-wider text-silver-300 uppercase rtl:tracking-normal">{dict.common.licenseNo}</p>
          <p className="mt-1 text-3xl font-bold tracking-wide">{company.licenseNo}</p>
          <p className="mt-2 text-sm text-silver-300">{dict.home.licenseCard}</p>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {dict.license.valid} {company.expiryDate}
            </span>
            <ArrowRight className="flip-rtl size-4 text-amber-300 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </div>
        </Link>
      </motion.div> */}
    </section>
  );
}
