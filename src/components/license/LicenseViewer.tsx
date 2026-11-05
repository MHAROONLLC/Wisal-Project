"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";
import { Download, ExternalLink, Maximize, Minus, Plus, Printer, RotateCcw, ScanLine, X, ZoomIn } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { documents } from "@/lib/company";

const MIN = 1;
const MAX = 5;

export function LicenseViewer() {
  const { locale, dict } = useI18n();
  const t = dict.license;
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);
  const doc = documents[active];

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label={t.title} className="no-print grid grid-cols-3 gap-1 rounded-xl border border-silver-200 bg-white p-1">
        {documents.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${d.id}`}
            onClick={() => setActive(i)}
            className={`focus-ring relative rounded-lg px-2 py-2.5 text-xs leading-snug font-semibold transition-colors sm:px-4 sm:text-sm ${
              active === i ? "text-white" : "text-navy-800 hover:text-brand-600"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="doc-tab"
                className="absolute inset-0 rounded-lg bg-brand-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{d.title[locale]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={doc.id}
          role="tabpanel"
          id={`panel-${doc.id}`}
          aria-labelledby={`tab-${doc.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-silver-400">{doc.issuer[locale]}</p>
            <div className="no-print flex flex-wrap gap-2">
              <ToolButton onClick={() => setViewer(true)} icon={Maximize} label={t.fullscreen} />
              <ToolButton href={doc.pdf} download icon={Download} label={t.download} primary />
              <ToolButton onClick={() => window.print()} icon={Printer} label={t.print} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setViewer(true)}
            aria-label={`${t.zoom}: ${doc.title[locale]}`}
            className="group focus-ring print-full relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-silver-200 bg-white"
          >
            {/* Original 2480px PNG, never re-compressed, so the QR code stays scannable */}
            <Image
              src={doc.image}
              alt={`${doc.title.en} — Muhammad Wisal Transport L.L.C`}
              width={2480}
              height={3505}
              unoptimized
              priority={active === 0}
              className="h-auto w-full"
            />
            <span className="no-print absolute inset-0 grid place-items-center bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/25">
              <span className="flex scale-90 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <ZoomIn className="size-4" /> {t.zoom}
              </span>
            </span>
          </button>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-navy-800">
            <ScanLine className="mt-0.5 size-5 shrink-0 text-brand-600" />
            <p>{doc.verify[locale]}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>{viewer && <Lightbox src={doc.image} title={doc.title[locale]} onClose={() => setViewer(false)} />}</AnimatePresence>
    </div>
  );
}

function ToolButton({
  icon: Icon,
  label,
  onClick,
  href,
  download,
  primary,
}: {
  icon: typeof Download;
  label: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  primary?: boolean;
}) {
  const cls = `focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95 ${
    primary ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-white text-navy-900 ring-1 ring-silver-300 hover:ring-brand-500"
  }`;
  if (href)
    return (
      <a href={href} download={download} className={cls}>
        <Icon className="size-4" /> {label}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      <Icon className="size-4" /> {label}
    </button>
  );
}

/** Full-screen zoom/pan viewer. Wheel or buttons to zoom, drag to pan, Esc to close. */
function Lightbox({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const { dict } = useI18n();
  const t = dict.license;
  const [scale, setScale] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const frame = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const zoomTo = useCallback(
    (next: number) => {
      const s = Math.min(MAX, Math.max(MIN, next));
      setScale(s);
      if (s === 1) {
        animate(x, 0);
        animate(y, 0);
      }
    },
    [x, y],
  );

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(MAX, s + 0.5));
      if (e.key === "-") setScale((s) => Math.max(MIN, s - 0.5));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  function onWheel(e: WheelEvent) {
    zoomTo(scale + (e.deltaY < 0 ? 0.25 : -0.25));
  }

  // Two-finger pinch zoom on touch screens
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  function onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) pinch.current = { dist: dist(e.touches), scale };
  }
  function onTouchMove(e: TouchEvent) {
    if (e.touches.length === 2 && pinch.current) zoomTo((pinch.current.scale * dist(e.touches)) / pinch.current.dist);
  }

  // Pan limits grow with the zoom level so every corner (and the QR code) can be reached
  const { w, h } = box;
  const constraints = { left: (-w * (scale - 1)) / 2, right: (w * (scale - 1)) / 2, top: (-h * (scale - 1)) / 2, bottom: (h * (scale - 1)) / 2 };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="no-print fixed inset-0 z-[100] flex flex-col bg-navy-950/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3 p-3 text-white sm:p-4">
        <p className="truncate font-semibold">{title}</p>
        <div className="flex items-center gap-1.5">
          <IconBtn label={t.zoomOut} onClick={() => zoomTo(scale - 0.5)} disabled={scale <= MIN}>
            <Minus className="size-5" />
          </IconBtn>
          <span className="w-12 text-center text-sm tabular-nums">{Math.round(scale * 100)}%</span>
          <IconBtn label={t.zoomIn} onClick={() => zoomTo(scale + 0.5)} disabled={scale >= MAX}>
            <Plus className="size-5" />
          </IconBtn>
          <IconBtn label={t.reset} onClick={() => zoomTo(1)}>
            <RotateCcw className="size-5" />
          </IconBtn>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open original image"
            className="hidden size-10 place-items-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10 sm:grid"
          >
            <ExternalLink className="size-5" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.closeViewer}
            className="grid size-10 place-items-center rounded-full bg-white text-navy-900 transition-transform hover:rotate-90"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={frame}
        onWheel={onWheel}
        onTouchStart={(e) => onTouchStart(e.nativeEvent)}
        onTouchMove={(e) => onTouchMove(e.nativeEvent)}
        onTouchEnd={() => (pinch.current = null)}
        onDoubleClick={() => zoomTo(scale > 1 ? 1 : 2.5)}
        className="relative flex-1 touch-none overflow-hidden"
      >
        <motion.div
          drag={scale > 1}
          dragConstraints={constraints}
          dragElastic={0.15}
          style={{ x, y }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={`absolute inset-0 flex items-center justify-center p-3 ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- full original PNG, no optimisation */}
          <img src={src} alt={title} draggable={false} className="max-h-full max-w-full rounded-lg bg-white object-contain shadow-2xl select-none" />
        </motion.div>
      </div>
      <p className="p-3 text-center text-xs text-silver-300">{t.dragHint}</p>
    </motion.div>
  );
}

function IconBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-10 place-items-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
