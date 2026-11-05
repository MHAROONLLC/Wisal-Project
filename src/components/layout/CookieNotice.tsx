"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

const KEY = "mwt-cookie-consent";

export function CookieNotice() {
  const { locale, dict } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (stored) return;
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, []);

  function choose(value: "all" | "essential") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="no-print fixed inset-x-3 bottom-24 z-50 sm:bottom-6 sm:max-w-md ltr:sm:left-6 ltr:sm:right-auto rtl:sm:right-6 rtl:sm:left-auto"
        >
          <div className="rounded-xl border border-silver-200 bg-white p-5 shadow-lift">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <Cookie className="size-5" />
              </span>
              <p className="text-sm leading-relaxed text-navy-800">
                {dict.cookie.text}{" "}
                <Link href={`/${locale}/privacy`} className="font-semibold text-brand-600 underline-offset-2 hover:underline">
                  {dict.cookie.learn}
                </Link>
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => choose("all")}
                className="focus-ring h-10 flex-1 rounded-lg bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {dict.cookie.accept}
              </button>
              <button
                type="button"
                onClick={() => choose("essential")}
                className="focus-ring h-10 flex-1 rounded-lg text-sm font-semibold text-navy-900 ring-1 ring-silver-300 transition-colors hover:bg-silver-100"
              >
                {dict.cookie.decline}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
