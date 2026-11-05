import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./motion";

// export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
//   return (
//     <p
//       className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-[0.14em] uppercase ring-1 rtl:tracking-normal ${
//         dark ? "bg-white/10 text-cyan-200 ring-white/15" : "bg-brand-100/70 text-brand-700 ring-brand-200"
//       }`}
//     >
//       <span className="size-1.5 rounded-full bg-amber-400" />
//       {children}
//     </p>
//   );
// }

/** The single section heading style used across the site. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  dark,
  action,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  dark?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-6 ${action ? "md:flex-row md:items-end md:justify-between" : ""}`}>
      <Reveal className={`max-w-2xl ${center ? "mx-auto text-center " : ""}`}>
        {/* {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>} */}
        <h2 className={`mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl ${dark ? "text-white" : "text-navy-900"}`}>
          {title}
        </h2>
        {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-silver-300" : "text-silver-400"}`}>{text}</p>}
      </Reveal>
      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}

/** Inner-page header: navy band, optional faded photo, breadcrumb. Same on every page. */
export function PageHero({
  title,
  subtitle,
  image,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  crumbs: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-glow pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-20" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-brand-700/40 rtl:bg-gradient-to-l" />
      <div className="absolute -top-32 -z-10 size-[28rem] rounded-full bg-cyan-500/20 blur-3xl ltr:-right-24 rtl:-left-24" aria-hidden />
      <div className="container-x">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-silver-300">
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="flip-rtl size-3.5 opacity-60" aria-hidden />}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-cyan-200" aria-current="page">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver-300 sm:text-lg">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-600 via-cyan-400 to-amber-400 rtl:bg-gradient-to-l" aria-hidden />
    </section>
  );
}
