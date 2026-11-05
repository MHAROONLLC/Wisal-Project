import Image from "next/image";
import { company } from "@/lib/company";

/**
 * Logo + the exact licensed business name. DET rule: Arabic above the English,
 * same size, matching the license — so both lines share one font size here.
 */
export function Brand({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/images/logo-sm.png"
        alt="Muhammad Wisal Transport L.L.C logo"
        width={400}
        height={289}
        priority
        className={`h-auto shrink-0 drop-shadow-md ${compact ? "w-14 sm:w-16" : "w-16 sm:w-[74px]"}`}
      />
      <span
        className={`flex flex-col items-start leading-tight font-extrabold whitespace-nowrap text-[10.5px] sm:text-xs ${dark ? "text-white" : "text-navy-900"}`}
      >
        <span lang="ar" dir="rtl" className="font-arabic">
          {company.name.ar}
        </span>
        <span lang="en" dir="ltr" className="tracking-wide">
          {company.name.en}
        </span>
      </span>
    </span>
  );
}
