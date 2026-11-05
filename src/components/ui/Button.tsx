"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "outline" | "outlineLight" | "white" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-[0_10px_24px_-10px_rgb(26_79_230/0.8)] hover:from-brand-700 hover:to-brand-600 rtl:bg-gradient-to-l",
  accent: "bg-amber-400 text-navy-950 shadow-[0_10px_24px_-10px_rgb(245_158_11/0.8)] hover:bg-amber-300",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-brand-200 bg-white text-navy-900 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700",
  outlineLight: "border border-white/30 text-white hover:bg-white hover:text-navy-900",
  white: "bg-white text-navy-900 hover:bg-brand-50",
  whatsapp: "bg-[#1fa855] text-white hover:bg-[#1a9149]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `focus-ring inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
};

const MotionLink = motion.create(Link);
const motionProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 420, damping: 24 },
};

/** Link styled as a button: lifts slightly on hover, presses on tap. */
export function Button({ href, children, variant = "primary", size = "md", className = "", ariaLabel }: Props) {
  const cls = buttonClass(variant, size, `group ${className}`);
  const external = href.startsWith("http");
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <motion.a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} className={cls} aria-label={ariaLabel} {...motionProps}>
      {children}
    </MotionLink>
  );
}
