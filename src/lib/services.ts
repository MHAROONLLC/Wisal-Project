import type { L10n, L10nList } from "./i18n";

export type ServiceIcon = "mountain" | "truck" | "snowflake" | "forklift" | "package";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  image: string;
  title: L10n;
  short: L10n;
  seoTitle: L10n;
  intro: L10n;
  benefits: L10nList;
  cargo: L10nList;
  stat: { value: L10n; label: L10n };
};

/** Only the five activities listed on trade license 652143 may be advertised as services. */
export const services: Service[] = [
  {
    slug: "raw-materials-transport",
    icon: "mountain",
    image: "/images/container-coastal.webp",
    title: { en: "Raw Materials Transport by Road", ar: "النقل البري للمواد الأولية" },
    short: {
      en: "Bulk aggregates, steel, timber and industrial inputs delivered to site on schedule.",
      ar: "نقل الركام والحديد والأخشاب ومدخلات الصناعة إلى مواقعكم في الموعد المحدد.",
    },
    seoTitle: {
      en: "Raw Materials Transport by Road in Dubai & UAE",
      ar: "النقل البري للمواد الأولية في دبي والإمارات",
    },
    intro: {
      en: "Construction projects and factories run on a steady flow of raw materials. We move aggregates, sand, steel bars, timber, cement bags and industrial inputs by road across the UAE, with secured loads and drivers who know site access rules.",
      ar: "تعتمد مشاريع البناء والمصانع على تدفق منتظم للمواد الأولية. ننقل الركام والرمل وحديد التسليح والأخشاب وأكياس الإسمنت ومدخلات الصناعة براً في جميع أنحاء الإمارات، مع تثبيت آمن للحمولة وسائقين على دراية بقواعد دخول المواقع.",
    },
    benefits: {
      en: [
        "Scheduled site deliveries that keep your project on time",
        "Loads secured and covered according to UAE road rules",
        "Flatbed and heavy trailers for long and heavy items",
        "Experienced drivers familiar with construction-site access",
      ],
      ar: [
        "توصيل مجدول إلى المواقع يحافظ على جدول مشروعكم",
        "تثبيت الحمولة وتغطيتها وفق قوانين الطرق في الإمارات",
        "مقطورات مسطحة وثقيلة للمواد الطويلة والثقيلة",
        "سائقون ذوو خبرة بقواعد دخول مواقع البناء",
      ],
    },
    cargo: {
      en: ["Steel bars & beams", "Aggregates & sand", "Timber & plywood", "Cement & blocks", "Pipes & cables"],
      ar: ["حديد التسليح والعوارض", "الركام والرمل", "الأخشاب والخشب الرقائقي", "الإسمنت والطوب", "الأنابيب والكابلات"],
    },
    stat: { value: { en: "40 t", ar: "40 طن" }, label: { en: "Payload per trip", ar: "حمولة في الرحلة" } },
  },
  {
    slug: "heavy-truck-cargo-transport",
    icon: "truck",
    image: "/images/container-coastal.webp",
    title: { en: "Cargo Transport by Heavy Trucks", ar: "نقل البضائع بالشاحنات الثقيلة" },
    short: {
      en: "Full-truckload and container haulage across the UAE with tractor-trailers.",
      ar: "نقل الحمولات الكاملة والحاويات في جميع أنحاء الإمارات بالشاحنات والمقطورات.",
    },
    seoTitle: {
      en: "Heavy Truck Cargo Transport Company in Dubai",
      ar: "شركة نقل البضائع بالشاحنات الثقيلة في دبي",
    },
    intro: {
      en: "Our heavy trucks and trailers handle full-truckload shipments and containers between ports, free zones, warehouses and project sites. Every move is planned around your timeline, with direct communication with the driver from pick-up to delivery.",
      ar: "تتولى شاحناتنا الثقيلة ومقطوراتنا شحنات الحمولة الكاملة والحاويات بين الموانئ والمناطق الحرة والمستودعات ومواقع المشاريع. نخطط لكل رحلة وفق جدولكم الزمني مع تواصل مباشر مع السائق من الاستلام حتى التسليم.",
    },
    benefits: {
      en: [
        "20 ft and 40 ft container haulage",
        "Full-truckload capacity for large shipments",
        "Port, free-zone and warehouse runs",
        "Well-maintained fleet with in-house workshop support",
      ],
      ar: [
        "نقل حاويات 20 و40 قدماً",
        "سعة حمولة كاملة للشحنات الكبيرة",
        "رحلات الموانئ والمناطق الحرة والمستودعات",
        "أسطول بصيانة منتظمة ودعم من ورشتنا الخاصة",
      ],
    },
    cargo: {
      en: ["Shipping containers", "Palletised goods", "Machinery & equipment", "Trading stock", "Project cargo"],
      ar: ["حاويات الشحن", "بضائع على منصات", "الآلات والمعدات", "بضائع تجارية", "شحنات المشاريع"],
    },
    stat: { value: { en: "40 ft", ar: "40 قدم" }, label: { en: "Container capacity", ar: "سعة الحاوية" } },
  },
  {
    slug: "refrigerated-truck-transport",
    icon: "snowflake",
    image: "/images/refrigerated-fleet.webp",
    title: { en: "Transport by Refrigerator Trucks", ar: "النقل بالمركبات المخصصة للتبريد" },
    short: {
      en: "Temperature-controlled transport for food, beverages and pharmaceuticals.",
      ar: "نقل بدرجات حرارة مضبوطة للأغذية والمشروبات والأدوية.",
    },
    seoTitle: {
      en: "Refrigerated Truck Transport in UAE | Chilled & Frozen",
      ar: "النقل بالشاحنات المبردة في الإمارات | مبرد ومجمد",
    },
    intro: {
      en: "Our refrigerated trailers keep chilled and frozen cargo at the right temperature from loading bay to receiving dock. We serve food distributors, catering, retail and pharmaceutical suppliers who cannot afford a broken cold chain.",
      ar: "تحافظ مقطوراتنا المبردة على البضائع المبردة والمجمدة في درجة الحرارة المناسبة من رصيف التحميل حتى رصيف الاستلام. نخدم موزعي الأغذية وشركات التموين والتجزئة وموردي الأدوية الذين لا يحتملون انقطاع سلسلة التبريد.",
    },
    benefits: {
      en: [
        "Chilled and frozen temperature ranges",
        "Pre-cooled trailers before every loading",
        "Insulated, hygienic cargo boxes",
        "Ideal for food, beverages and pharma",
      ],
      ar: [
        "نطاقات حرارة للتبريد والتجميد",
        "تبريد المقطورة مسبقاً قبل كل تحميل",
        "صناديق شحن معزولة وصحية",
        "مثالية للأغذية والمشروبات والأدوية",
      ],
    },
    cargo: {
      en: ["Frozen meat & seafood", "Dairy & beverages", "Fruits & vegetables", "Pharmaceuticals", "Flowers & chocolate"],
      ar: ["اللحوم والمأكولات البحرية المجمدة", "الألبان والمشروبات", "الفواكه والخضروات", "الأدوية", "الزهور والشوكولاتة"],
    },
    stat: { value: { en: "−20°C", ar: "−20°م" }, label: { en: "Down to", ar: "حتى" } },
  },
  {
    slug: "cargo-loading-unloading",
    icon: "forklift",
    image: "/images/workshop-loading.webp",
    title: { en: "Cargo Loading & Unloading Services", ar: "خدمات تحميل وتفريغ البضائع" },
    short: {
      en: "Trained crews and forklifts for safe, fast loading and unloading.",
      ar: "طواقم مدربة ورافعات شوكية لتحميل وتفريغ آمن وسريع.",
    },
    seoTitle: {
      en: "Truck Loading and Unloading Services in Dubai",
      ar: "خدمات تحميل وتفريغ الشاحنات في دبي",
    },
    intro: {
      en: "Loading is where most cargo damage happens. Our trained crews use forklifts, pallet jacks and proper strapping to load and unload your goods quickly and safely — at your warehouse, factory or site.",
      ar: "يحدث معظم تلف البضائع أثناء التحميل. تستخدم طواقمنا المدربة الرافعات الشوكية ورافعات المنصات وأحزمة التثبيت المناسبة لتحميل وتفريغ بضائعكم بسرعة وأمان — في مستودعكم أو مصنعكم أو موقعكم.",
    },
    benefits: {
      en: [
        "Forklift and manual handling crews",
        "Safety gear and correct load securing",
        "Fragile and crated cargo handled with care",
        "Faster turnaround at your loading bay",
      ],
      ar: [
        "طواقم رافعات شوكية ومناولة يدوية",
        "معدات سلامة وتثبيت صحيح للحمولة",
        "عناية خاصة بالبضائع الهشة والمغلفة بالصناديق",
        "إنجاز أسرع عند رصيف التحميل",
      ],
    },
    cargo: {
      en: ["Wooden crates", "Pallets & cartons", "Fragile goods", "Machinery parts", "Bulk bags"],
      ar: ["صناديق خشبية", "منصات وكراتين", "بضائع هشة", "قطع الآلات", "أكياس السوائب"],
    },
    stat: { value: { en: "Same day", ar: "نفس اليوم" }, label: { en: "Crew dispatch", ar: "إرسال الطاقم" } },
  },
  {
    slug: "light-truck-cargo-transport",
    icon: "package",
    image: "/images/workshop-loading.webp",
    title: { en: "Cargo Transport by Light Trucks", ar: "نقل البضائع بالشاحنات الخفيفة" },
    short: {
      en: "Agile pickups and light trucks for city deliveries and smaller loads.",
      ar: "شاحنات خفيفة مرنة للتوصيل داخل المدينة والحمولات الأصغر.",
    },
    seoTitle: {
      en: "Light Truck Cargo Transport & Delivery in Dubai",
      ar: "نقل البضائع والتوصيل بالشاحنات الخفيفة في دبي",
    },
    intro: {
      en: "Not every shipment needs a trailer. Our light trucks move smaller loads quickly through Dubai and the Northern Emirates — ideal for traders, retailers and workshops that need fast, cost-effective deliveries.",
      ar: "ليست كل شحنة بحاجة إلى مقطورة. تنقل شاحناتنا الخفيفة الحمولات الأصغر بسرعة داخل دبي والإمارات الشمالية — مثالية للتجار ومتاجر التجزئة والورش التي تحتاج إلى توصيل سريع وفعال من حيث التكلفة.",
    },
    benefits: {
      en: [
        "Fast city and inter-emirate deliveries",
        "Easy access to tight streets and industrial areas",
        "Cost-effective for part loads",
        "Flexible same-day scheduling",
      ],
      ar: [
        "توصيل سريع داخل المدينة وبين الإمارات",
        "سهولة الوصول إلى الشوارع الضيقة والمناطق الصناعية",
        "تكلفة مناسبة للحمولات الجزئية",
        "جدولة مرنة في نفس اليوم",
      ],
    },
    cargo: {
      en: ["Retail stock", "Spare parts", "Furniture", "Building supplies", "Office equipment"],
      ar: ["بضائع التجزئة", "قطع الغيار", "الأثاث", "مستلزمات البناء", "معدات المكاتب"],
    },
    stat: { value: { en: "3 t", ar: "3 طن" }, label: { en: "Light payload", ar: "حمولة خفيفة" } },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
