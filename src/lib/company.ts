import type { L10n } from "./i18n";

/**
 * Official company data, taken from the Dubai trade license documents.
 * When a backend/CMS is added, this file is the single place to replace.
 */
export const company = {
  name: {
    en: "MUHAMMAD WISAL TRANSPORT L.L.C",
    ar: "",
  } satisfies L10n,
  shortName: { en: "", ar: ""} satisfies L10n,
  // legalType: { en: "Limited Liability Company (LLC)", ar: "ذات مسؤولية محدودة" } satisfies L10n,
  authority: {
    en: "Dubai Department of Economy and Tourism (DET)",
    ar: "دائرة الاقتصاد والسياحة في دبي",
  } satisfies L10n,
  licenseNo: "652143",
  registerNo: "2908069",
  dcciNo: "229044",
  issueDate: "05/04/2011",
  expiryDate: "04/04/2027",
  /** ISO version of expiryDate, used for the validity badge */
  expiryISO: "2027-04-04",
  foundedYear: 2011,
  taglines: {
    primary: { en: "Your Cargo • Our Commitment", ar: "شحنكم .. مسؤوليتنا" } satisfies L10n,
    secondary: { en: "Moving Business Further", ar: "نمضي بأعمالكم إلى الأمام" } satisfies L10n,
  },
  address: {
    en: "Warehouse No. 5, Ras Al Khor, Dubai, United Arab Emirates",
    ar: "مستودع رقم 5، راس الخور، دبي، الإمارات العربية المتحدة",
  } satisfies L10n,
  poBox: "234472",
  phones: [
    { display: "055-8854883", tel: "+971558854883" },
    { display: "056-8640888", tel: "+971568640888" },
    { display: "052-4792888", tel: "+971524792888" },
  ],
  landline: { display: "04-3203358", tel: "+97143203358" },
  whatsapp: "971558854883",
  
  email:"info@muhammadwisaltransportllc.com",
  hours: {
    en: [
      { days: "Saturday – Thursday", time: "8:00 AM – 8:00 PM" },
      { days: "Friday", time: "On-call dispatch" },
    ],
    ar: [
      { days: "السبت – الخميس", time: "8:00 صباحاً – 8:00 مساءً" },
      { days: "الجمعة", time: "خدمة الطوارئ عند الطلب" },
    ],
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Ras%20Al%20Khor%20Industrial%20Area%2C%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://maps.google.com/?q=Ras+Al+Khor+Industrial+Area,+Dubai",
  dcciVerifyUrl: "https://www.dubaichamber.ae/verify",
  /** Confirmed by the owner, shown alongside the licensed activities */
  specialties: [
    { key: "container", en: "Container Transportation", ar: "النقل بالحاويات" },
    { key: "logistics", en: "Logistics", ar: "الخدمات اللوجستية" },
    { key: "heavy", en: "Heavy Vehicles", ar: "المركبات الثقيلة" },
  ],
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

export const documents = [
  {
    id: "commercial-license",
    title: { en: "Commercial License", ar: "الرخصة التجارية" },
    issuer: { en: "Dubai Economy and Tourism", ar: "دائرة الاقتصاد والسياحة في دبي" },
    image: "/documents/commercial-license.png",
    preview: "/documents/commercial-license-preview.webp",
    pdf: "/documents/commercial-license.pdf",
    verify: {
      en: "Scan the QR code at the top of the license to verify it with Dubai Economy and Tourism.",
      ar: "امسح رمز الاستجابة السريعة أعلى الرخصة للتحقق منها لدى دائرة الاقتصاد والسياحة في دبي.",
    },
  },
  {
    id: "commercial-register",
    title: { en: "Commercial Register Certificate", ar: "شهادة السجل التجاري" },
    issuer: { en: "Dubai Economy and Tourism", ar: "دائرة الاقتصاد والسياحة في دبي" },
    image: "/documents/commercial-register.png",
    preview: "/documents/commercial-register-preview.webp",
    pdf: "/documents/commercial-register.pdf",
    verify: {
      en: "Register No. 2908069 is linked to main license 652143 — verify via the license QR code.",
      ar: "رقم القيد 2908069 مرتبط بالرخصة الأم 652143 — يمكن التحقق عبر رمز الاستجابة السريعة على الرخصة.",
    },
  },
  {
    id: "dcci-membership",
    title: { en: "DCCI Membership Certificate", ar: "شهادة عضوية غرفة دبي" },
    issuer: { en: "Dubai Chamber of Commerce & Industry", ar: "غرفة تجارة وصناعة دبي" },
    image: "/documents/dcci-membership.png",
    preview: "/documents/dcci-membership-preview.webp",
    pdf: "/documents/dcci-membership.pdf",
    verify: {
      en: "Verify this certificate online at dubaichamber.ae/verify.",
      ar: "تحقق من هذه الشهادة عبر الموقع dubaichamber.ae/verify.",
    },
  },
] as const;

export type CompanyDocument = (typeof documents)[number];
