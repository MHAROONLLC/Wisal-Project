import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/components/I18nProvider";
import { JsonLd } from "@/components/JsonLd";
import { company } from "@/lib/company";
import { getDictionary } from "@/lib/dictionary";
import { dirOf, hasLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/lib/services";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#040b1f",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const ar = lang === "ar";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: ar ? "محمد وصال للنقليات ش.ذ.م.م | شركة نقل في دبي" : "Muhammad Wisal Transport L.L.C | Transport Company in Dubai",
      template: ar ? "%s | محمد وصال للنقليات" : "%s | Muhammad Wisal Transport",
    },
    description: ar
      ? "شركة نقل بري مرخصة في دبي منذ 2011: نقل بالشاحنات الثقيلة والخفيفة والمبردة، نقل المواد الأولية وخدمات التحميل والتفريغ."
      : "Dubai-licensed road transport company since 2011: heavy, light and refrigerated truck transport, raw materials transport and cargo loading & unloading across the UAE.",
    applicationName: company.name.en,
    keywords: [
      "transport company Dubai",
      "refrigerated truck transport UAE",
      "truck loading and unloading Dubai",
      "heavy truck transport Dubai",
      "container transportation UAE",
      "شركة نقل في دبي",
      "نقل بالشاحنات المبردة",
    ],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    "@id": `${SITE_URL}/#business`,
    name: company.name.en,
    alternateName: company.name.ar,
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/container-coastal.webp`,
    telephone: company.phones[0].tel,
    email: company.email,
    foundingDate: "2011-04-05",
    slogan: company.taglines.primary.en,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Warehouse No. 5, Ras Al Khor",
      addressLocality: "Dubai",
      postOfficeBoxNumber: company.poBox,
      addressCountry: "AE",
    },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Licensed transport services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title.en } })),
    },
    identifier: [
      { "@type": "PropertyValue", name: "Dubai Trade License", value: company.licenseNo },
      { "@type": "PropertyValue", name: "DCCI Membership", value: company.dcciNo },
    ],
  };

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${jakarta.variable} ${cairo.variable} antialiased`}>
      <body className="min-h-dvh">
        <JsonLd data={localBusiness} />
        <I18nProvider locale={lang} dict={dict}>
          <Header />
          <main id="main">{children}</main>
          <Footer locale={lang} />
          <FloatingActions />
          <CookieNotice />
        </I18nProvider>
      </body>
    </html>
  );
}
