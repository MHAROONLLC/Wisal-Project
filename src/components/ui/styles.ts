/**
 * Shared class recipes — every card, icon tile and section uses these so the
 * site looks the same from page to page.
 *
 * Colour system: navy (dark bands) · brand blue → cyan (main colour) · amber (highlight/CTA).
 */
export const ui = {
  /** Standard white card */
  card: "rounded-2xl border border-brand-100 bg-white shadow-[0_1px_2px_rgb(10_23_51/0.04)]",
  /** Hover for clickable cards (use with `group`): lifts, blue border, gradient bar slides in on top */
  cardHover:
    "relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-brand-600 before:via-brand-400 before:to-cyan-400 before:transition-transform before:duration-500 hover:before:scale-x-100 rtl:before:origin-right",
  /** Glass card for dark/blue sections */
  cardDark:
    "rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.1]",
  /** Gradient icon tile, tilts and glows on card hover */
  icon: "grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-[0_10px_24px_-10px_rgb(26_79_230/0.7)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
  /** Small icon tile for list rows */
  iconSm: "grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-[0_8px_18px_-8px_rgb(26_79_230/0.7)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
  /** Icon tile on dark backgrounds */
  iconDark: "grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-[0_10px_24px_-10px_rgb(6_182_212/0.6)]",
  /** Section backgrounds: white · tint (light blue) · dark (navy) · blue (vivid band) */
  white: "section-y bg-white",
  surface: "section-y bg-tint",
  dark: "section-y bg-navy-glow text-white",
  blue: "section-y bg-blue-band text-white",
  /** Text link with arrow */
  link: "group inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700",
} as const;
