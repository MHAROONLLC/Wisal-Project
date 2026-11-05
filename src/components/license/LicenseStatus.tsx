"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Clock, TriangleAlert } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { company } from "@/lib/company";

/** Days before expiry when the badge switches to "renewal in progress" (matches the 60-day admin alert). */
const WARN_DAYS = 60;

/**
 * "Valid until 04/04/2027" badge. The status is computed in the browser so a statically
 * built page never shows a stale state; the server render shows the plain valid badge.
 */
export function LicenseStatus({ large }: { large?: boolean }) {
  const { dict } = useI18n();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const ms = new Date(`${company.expiryISO}T23:59:59+04:00`).getTime() - Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- needs the client clock
    setDaysLeft(Math.ceil(ms / 86_400_000));
  }, []);

  const expired = daysLeft !== null && daysLeft < 0;
  const soon = daysLeft !== null && daysLeft >= 0 && daysLeft <= WARN_DAYS;
  const tone = expired
    ? "bg-red-50 text-red-700 ring-red-200"
    : soon
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-emerald-50 text-emerald-700 ring-emerald-200";
  const Icon = expired ? TriangleAlert : soon ? Clock : BadgeCheck;
  const label = expired ? dict.license.expired : `${soon ? dict.license.expiringSoon : dict.license.valid} ${company.expiryDate}`;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-bold ring-1 ${tone} ${large ? "px-4 py-2 text-sm sm:text-base" : "px-3 py-1 text-xs"}`}
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-50" />
        <span className="relative inline-flex size-2.5 rounded-full bg-current" />
      </span>
      <Icon className={large ? "size-5" : "size-4"} />
      {label}
    </span>
  );
}
