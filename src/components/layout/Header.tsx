"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, FileText, Languages, Menu, Phone, X } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/icons";
import { company } from "@/lib/company";
import { switchLocalePath } from "@/lib/i18n";
import { services } from "@/lib/services";
import { Brand } from "./Brand";

export function Header() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close menus whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const base = `/${locale}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/services`, label: dict.nav.services, dropdown: true },
    { href: `${base}/fleet`, label: dict.nav.fleet },
    { href: `${base}/faq`, label: dict.nav.faq },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => (href === base ? pathname === base : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-white px-4 py-2 font-semibold text-navy-900 focus:not-sr-only focus:absolute focus:start-4 focus:top-4"
      >
        {dict.common.skip}
      </a>

      <div
        className={`transition-all duration-500 ${
          solid
            ? "bg-navy-950/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
            : "bg-gradient-to-b from-navy-950/80 to-transparent"
        }`}
      >
        <div className={`mx-auto flex w-full max-w-[84rem] items-center justify-between gap-3 px-4 transition-[height] duration-500 sm:px-6 lg:px-8 ${scrolled ? "h-16 sm:h-[72px]" : "h-20 sm:h-24"}`}>
          <Link href={base} aria-label={dict.nav.home} className="focus-ring rounded-lg">
            <Brand dark compact={scrolled} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center xl:flex">
            {links.map((l) =>
              l.dropdown ? (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={l.href}
                    className="focus-ring relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-white/85 transition-colors hover:text-white"
                    aria-expanded={servicesOpen}
                    onFocus={() => setServicesOpen(true)}
                  >
                    {isActive(l.href) && <ActivePill />}
                    <span className="relative">{l.label}</span>
                    <ChevronDown className={`relative size-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full w-[420px] pt-3 ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2"
                      >
                        <div className="overflow-hidden rounded-xl border border-silver-200 bg-white p-2 shadow-lift">
                          {services.map((s, i) => (
                            <motion.div
                              key={s.slug}
                              initial={{ opacity: 0, x: locale === "ar" ? 10 : -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={`${base}/services/${s.slug}`}
                                onBlur={(e) => {
                                  if (!e.currentTarget.closest("div.relative")?.contains(e.relatedTarget as Node)) setServicesOpen(false);
                                }}
                                className="group/item focus-ring flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover/item:bg-brand-600 group-hover/item:text-white">
                                  <ServiceIcon name={s.icon} className="size-5" />
                                </span>
                                <span className="text-sm font-semibold text-navy-900">{s.title[locale]}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="focus-ring relative rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-white/85 transition-colors hover:text-white"
                >
                  {isActive(l.href) && <ActivePill />}
                  <span className="relative">{l.label}</span>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchLocalePath(pathname, locale === "en" ? "ar" : "en")}
              aria-label={dict.nav.switchLangLabel}
              lang={locale === "en" ? "ar" : "en"}
              className="focus-ring hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold whitespace-nowrap text-white ring-1 ring-white/25 transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <Languages className="size-4" />
              {dict.nav.switchLang}
            </Link>
            <Link
              href={`${base}/license`}
              className="focus-ring hidden h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold whitespace-nowrap text-white ring-1 ring-white/25 transition-all hover:bg-white hover:text-navy-900 md:inline-flex"
            >
              <FileText className="size-4" />
              {dict.nav.license}
            </Link>
            <span className="hidden sm:block">
              <Button href={`${base}/quote`} size="sm" variant="accent">
                {dict.nav.quote}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              className="focus-ring grid size-10 place-items-center rounded-lg text-white ring-1 ring-white/25 transition-colors hover:bg-white/10 xl:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-brand-500 rtl:origin-right" />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-0 bottom-0 -z-10 overflow-y-auto bg-navy-950/98 pt-24 pb-10 backdrop-blur-xl xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col">
              {[...links, { href: `${base}/license`, label: dict.nav.license }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: locale === "ar" ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-bold transition-colors ${
                      isActive(l.href) ? "text-brand-300" : "text-white hover:text-brand-200"
                    }`}
                  >
                    {l.label}
                    {isActive(l.href) && <span className="size-2 rounded-full bg-accent" />}
                  </Link>
                  {l.dropdown && (
                    <div className="grid gap-1 py-3">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`${base}/services/${s.slug}`}
                          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-silver-300 hover:bg-white/5 hover:text-white"
                        >
                          <ServiceIcon name={s.icon} className="size-4 text-brand-300" />
                          {s.title[locale]}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                <Button href={`${base}/quote`} size="lg" variant="accent">
                  {dict.nav.quote}
                </Button>
                <Button href={`tel:${company.phones[0].tel}`} size="lg" variant="outlineLight">
                  <Phone className="size-4" /> {dict.common.callNow}
                </Button>
                <Link
                  href={switchLocalePath(pathname, locale === "en" ? "ar" : "en")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg text-white ring-1 ring-white/20 sm:col-span-2"
                >
                  <Languages className="size-4" /> {dict.nav.switchLang}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActivePill() {
  return (
    <motion.span
      layoutId="nav-active"
      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-400"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}
