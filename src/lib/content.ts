import type { L10n, L10nList } from "./i18n";

export type FleetItem = {
  id: string;
  image?: string;
  name: L10n;
  desc: L10n;
  specs: { label: L10n; value: L10n }[];
  uses: L10nList;
};

export const fleet: FleetItem[] = [
  {
    id: "heavy",
    image: "/images/container-coastal.webp",
    name: { en: "Heavy Trucks & Trailers", ar: "الشاحنات الثقيلة والمقطورات" },
    desc: {
      en: "Tractor heads with container chassis and flatbed trailers for full loads, containers and raw materials.",
      ar: "رؤوس قاطرة مع هياكل حاويات ومقطورات مسطحة للحمولات الكاملة والحاويات والمواد الأولية.",
    },
    specs: [
      { label: { en: "Payload", ar: "الحمولة" }, value: { en: "Up to 40 tonnes", ar: "حتى 40 طناً" } },
      { label: { en: "Trailer", ar: "المقطورة" }, value: { en: "Container / flatbed", ar: "حاويات / مسطحة" } },
      { label: { en: "Containers", ar: "الحاويات" }, value: { en: "20 ft & 40 ft", ar: "20 و40 قدماً" } },
    ],
    uses: {
      en: ["Container haulage", "Raw materials", "Project cargo"],
      ar: ["نقل الحاويات", "المواد الأولية", "شحنات المشاريع"],
    },
  },
  {
    id: "refrigerated",
    image: "/images/refrigerated-fleet.webp",
    name: { en: "Refrigerated Trucks", ar: "الشاحنات المبردة" },
    desc: {
      en: "Insulated reefer trailers with dedicated cooling units for chilled and frozen cargo.",
      ar: "مقطورات مبردة معزولة بوحدات تبريد مخصصة للبضائع المبردة والمجمدة.",
    },
    specs: [
      { label: { en: "Range", ar: "النطاق" }, value: { en: "−20°C to +15°C", ar: "من −20 إلى +15 درجة" } },
      { label: { en: "Body", ar: "الهيكل" }, value: { en: "Insulated reefer box", ar: "صندوق تبريد معزول" } },
      { label: { en: "Pallets", ar: "المنصات" }, value: { en: "Up to 33 pallets", ar: "حتى 33 منصة" } },
    ],
    uses: {
      en: ["Food & beverages", "Pharmaceuticals", "Fresh produce"],
      ar: ["الأغذية والمشروبات", "الأدوية", "المنتجات الطازجة"],
    },
  },
  {
    id: "rigid",
    image: "/images/workshop-loading.webp",
    name: { en: "Box Trucks & Loading Crew", ar: "شاحنات الصناديق وطاقم التحميل" },
    desc: {
      en: "Closed-box rigid trucks backed by forklifts and trained crews for safe loading and unloading.",
      ar: "شاحنات صندوقية مغلقة مدعومة برافعات شوكية وطواقم مدربة للتحميل والتفريغ الآمن.",
    },
    specs: [
      { label: { en: "Payload", ar: "الحمولة" }, value: { en: "Up to 12 tonnes", ar: "حتى 12 طناً" } },
      { label: { en: "Body", ar: "الهيكل" }, value: { en: "Closed box, side door", ar: "صندوق مغلق بباب جانبي" } },
      { label: { en: "Support", ar: "الدعم" }, value: { en: "Forklift & crew", ar: "رافعة شوكية وطاقم" } },
    ],
    uses: {
      en: ["Crated goods", "Loading & unloading", "Warehouse runs"],
      ar: ["البضائع المعبأة بالصناديق", "التحميل والتفريغ", "رحلات المستودعات"],
    },
  },
  {
    id: "light",
    name: { en: "Light Trucks", ar: "الشاحنات الخفيفة" },
    desc: {
      en: "Pickups and light trucks for quick city deliveries and part loads across Dubai and the Northern Emirates.",
      ar: "شاحنات صغيرة وخفيفة للتوصيل السريع داخل المدينة والحمولات الجزئية في دبي والإمارات الشمالية.",
    },
    specs: [
      { label: { en: "Payload", ar: "الحمولة" }, value: { en: "1 – 3 tonnes", ar: "1 – 3 أطنان" } },
      { label: { en: "Body", ar: "الهيكل" }, value: { en: "Open deck / pickup", ar: "سطح مفتوح / بيك أب" } },
      { label: { en: "Best for", ar: "الأنسب لـ" }, value: { en: "City & part loads", ar: "المدينة والحمولات الجزئية" } },
    ],
    uses: {
      en: ["Retail deliveries", "Spare parts", "Building supplies"],
      ar: ["توصيلات التجزئة", "قطع الغيار", "مستلزمات البناء"],
    },
  },
];

export const faqs: { q: L10n; a: L10n }[] = [
  {
    q: { en: "Is Muhammad Wisal Transport a licensed company?", ar: "هل شركة محمد وصال للنقليات مرخصة؟" },
    a: {
      en: "Yes. We are a Limited Liability Company licensed by Dubai Economy and Tourism under license No. 652143 since 2011, and a member of the Dubai Chamber (No. 229044). You can view and verify our documents on the Trade License page.",
      ar: "نعم. نحن شركة ذات مسؤولية محدودة مرخصة من دائرة الاقتصاد والسياحة في دبي برقم رخصة 652143 منذ عام 2011، وعضو في غرفة دبي (رقم 229044). يمكنكم عرض مستنداتنا والتحقق منها في صفحة الرخصة التجارية.",
    },
  },
  {
    q: { en: "Which areas do you cover?", ar: "ما المناطق التي تغطونها؟" },
    a: {
      en: "We are based in Ras Al Khor, Dubai, and transport cargo by road across all seven emirates of the UAE.",
      ar: "مقرنا في راس الخور، دبي، وننقل البضائع براً في جميع الإمارات السبع.",
    },
  },
  {
    q: { en: "How do I get a quote?", ar: "كيف أحصل على عرض سعر؟" },
    a: {
      en: "Fill in the Get a Quote form with pickup, delivery, cargo type and weight, or call / WhatsApp us. We usually reply within a few working hours.",
      ar: "املأ نموذج طلب عرض السعر مع موقع الاستلام والتسليم ونوع البضاعة ووزنها، أو اتصل بنا أو راسلنا عبر واتساب. نرد عادةً خلال ساعات عمل قليلة.",
    },
  },
  {
    q: { en: "Do your prices include VAT?", ar: "هل تشمل أسعاركم ضريبة القيمة المضافة؟" },
    a: {
      en: "All quotes and invoices clearly show the 5% UAE VAT amount, in line with Dubai Economy and Tourism requirements.",
      ar: "تُظهر جميع عروض الأسعار والفواتير قيمة ضريبة القيمة المضافة 5% بوضوح، وفقاً لمتطلبات دائرة الاقتصاد والسياحة في دبي.",
    },
  },
  {
    q: { en: "Can you transport frozen or chilled food?", ar: "هل يمكنكم نقل الأغذية المجمدة أو المبردة؟" },
    a: {
      en: "Yes. Our refrigerated trucks are licensed for temperature-controlled transport and are pre-cooled before loading.",
      ar: "نعم. شاحناتنا المبردة مرخصة للنقل بدرجات حرارة مضبوطة ويتم تبريدها مسبقاً قبل التحميل.",
    },
  },
  {
    q: { en: "Do you provide loading and unloading crews?", ar: "هل توفرون طواقم للتحميل والتفريغ؟" },
    a: {
      en: "Yes. Cargo loading and unloading is one of our licensed services, with trained crews and forklifts available.",
      ar: "نعم. تحميل وتفريغ البضائع من خدماتنا المرخصة، مع توفر طواقم مدربة ورافعات شوكية.",
    },
  },
  {
    q: { en: "Do you move shipping containers?", ar: "هل تنقلون حاويات الشحن؟" },
    a: {
      en: "Yes. Our heavy trucks haul 20 ft and 40 ft containers between ports, free zones, warehouses and sites within the UAE.",
      ar: "نعم. تنقل شاحناتنا الثقيلة حاويات 20 و40 قدماً بين الموانئ والمناطق الحرة والمستودعات والمواقع داخل الإمارات.",
    },
  },
];
