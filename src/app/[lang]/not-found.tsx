"use client";

import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { locale, dict } = useI18n();
  return (
    <section className="grid min-h-[80dvh] place-items-center bg-navy-glow px-4 pt-24 text-center text-white">
      <div>
        <p className="text-gradient text-8xl font-extrabold sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-bold">{dict.notFound.title}</h1>
        <p className="mt-3 text-silver-300">{dict.notFound.text}</p>
        <div className="mt-8">
          <Button href={`/${locale}`} size="lg">
            {dict.notFound.back}
          </Button>
        </div>
      </div>
    </section>
  );
}
