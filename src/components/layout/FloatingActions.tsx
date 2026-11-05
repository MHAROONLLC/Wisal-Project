"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { company, whatsappLink } from "@/lib/company";

/** Mobile: sticky bottom action bar. Desktop: floating WhatsApp bubble + back-to-top. */
export function FloatingActions() {
  const { dict } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 400));
  const wa = whatsappLink(dict.common.whatsappMsg);

  return (
    <>
      {/* Mobile bottom bar */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-navy-950/90 p-2 shadow-[0_-10px_40px_-10px_rgb(0_0_0/0.5)] ring-1 ring-white/10 backdrop-blur-xl">
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={`tel:${company.phones[0].tel}`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white"
          >
            <Phone className="size-5" /> {dict.common.callNow}
          </motion.a>
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1fa855] font-semibold text-white"
          >
            <WhatsAppIcon className="size-5" /> {dict.common.whatsapp}
          </motion.a>
        </div>
      </div>

      {/* Desktop floating buttons */}
      <div className="no-print fixed bottom-6 z-40 hidden flex-col items-center gap-3 sm:flex ltr:right-6 rtl:left-6">
        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              whileHover={{ y: -3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid size-11 place-items-center rounded-full bg-white text-navy-900 shadow-lift ring-1 ring-silver-200"
            >
              <ArrowRight className="size-5 -rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a
          href={`tel:${company.phones[0].tel}`}
          aria-label={dict.common.callNow}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="grid size-12 place-items-center rounded-full bg-brand-600 text-white shadow-lift"
        >
          <Phone className="size-5" />
        </motion.a>
        <motion.a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.common.whatsapp}
          whileHover={{ scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          className="relative grid size-14 place-items-center rounded-full bg-[#1fa855] text-white shadow-[0_12px_30px_-8px_rgb(31_168_85/0.8)]"
        >
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#1fa855]" aria-hidden />
          <WhatsAppIcon className="relative size-7" />
        </motion.a>
      </div>
    </>
  );
}
