"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

const NAVY = "#071435";

/**
 * Permanent QR code that links to this site's license page, for trucks, invoices and cards.
 * Built from the live origin so it always points at the deployed domain.
 */
export function SiteQr() {
  const { locale, dict } = useI18n();
  const t = dict.license;
  const [svg, setSvg] = useState("");
  const [png, setPng] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const target = `${window.location.origin}/${locale}/license`;
    const opts = { errorCorrectionLevel: "H" as const, margin: 2, color: { dark: NAVY, light: "#ffffff" } };
    Promise.all([QRCode.toString(target, { ...opts, type: "svg" }), QRCode.toDataURL(target, { ...opts, width: 1200 })]).then(
      ([s, p]) => {
        setUrl(target);
        setSvg(s);
        setPng(p);
      },
    );
  }, [locale]);

  const svgHref = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : undefined;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-blue-band shadow-lift p-6 text-white sm:p-8">
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative shrink-0 rounded-xl bg-white p-3">
          {svg ? (
            // eslint-disable-next-line @next/next/no-img-element -- generated data URL
            <img src={svgHref} alt={t.siteQrTitle} width={160} height={160} className="size-40" />
          ) : (
            <div className="grid size-40 place-items-center text-brand-400">
              <QrCode className="size-12 animate-pulse" />
            </div>
          )}
          <span className="animate-scan absolute inset-x-3 h-0.5 bg-brand-500/80 shadow-[0_0_12px_2px_rgb(47_102_255/0.8)]" aria-hidden />
        </div>
        <div className="text-center sm:text-start">
          <h3 className="text-xl font-bold">{t.siteQrTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-100">{t.siteQrText}</p>
          {url && (
            <p className="mt-3 truncate text-xs text-brand-200" dir="ltr">
              {url}
            </p>
          )}
          <div className="mt-5 flex justify-center gap-2 sm:justify-start">
            <a
              href={png || undefined}
              download="mwt-license-qr.png"
              aria-disabled={!png}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:scale-95"
            >
              <Download className="size-4" /> {t.downloadPng}
            </a>
            <a
              href={svgHref}
              download="mwt-license-qr.svg"
              aria-disabled={!svg}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/30 px-4 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white hover:text-navy-900 active:scale-95"
            >
              <Download className="size-4" /> {t.downloadSvg}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
