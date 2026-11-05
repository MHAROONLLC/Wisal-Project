import type { Locale } from "./i18n";

type Doc = { title: string; updated: string; sections: { h: string; p: string[] }[] };

export const legal: Record<"privacy" | "terms", Record<Locale, Doc>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      updated: "Last updated: November 2026",
      sections: [
        {
          h: "Who we are",
          p: [
            "This website is operated by MUHAMMAD WISAL TRANSPORT L.L.C, Warehouse No. 5, Ras Al Khor, Dubai, UAE (Dubai trade license No. 652143). We respect your privacy and handle personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.",
          ],
        },
        {
          h: "What we collect",
          p: [
            "When you request a quote or contact us we collect the details you provide: name, company, phone, email, pickup and delivery locations, cargo details and any file you attach.",
            "With your consent we may collect anonymous usage statistics (for example through Google Analytics 4) to improve the website.",
          ],
        },
        {
          h: "How we use it",
          p: [
            "We use your details only to respond to your enquiry, prepare quotes, arrange transport and keep business records required by UAE law. We do not sell your data.",
          ],
        },
        {
          h: "Retention & security",
          p: [
            "Enquiries are kept only as long as needed for the purposes above or as required by law. We use HTTPS encryption and restricted access to protect your information.",
          ],
        },
        {
          h: "Cookies",
          p: [
            "Essential cookies make the website work. Analytics cookies are used only if you accept them in the cookie notice; you can change your choice by clearing your browser data.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You may request access to, correction of, or deletion of your personal data by emailing J8854883@gmail.com or calling 055-8854883.",
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      updated: "آخر تحديث: نوفمبر 2026",
      sections: [
        {
          h: "من نحن",
          p: [
            "يدير هذا الموقع محمد وصال للنقليات ش.ذ.م.م، مستودع رقم 5، راس الخور، دبي، الإمارات (رخصة تجارية رقم 652143). نحترم خصوصيتكم ونتعامل مع البيانات الشخصية وفق المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية.",
          ],
        },
        {
          h: "البيانات التي نجمعها",
          p: [
            "عند طلب عرض سعر أو التواصل معنا نجمع البيانات التي تقدمونها: الاسم والشركة والهاتف والبريد الإلكتروني ومواقع الاستلام والتسليم وتفاصيل البضاعة وأي ملف مرفق.",
            "بموافقتكم قد نجمع إحصاءات استخدام مجهولة الهوية (مثل Google Analytics 4) لتحسين الموقع.",
          ],
        },
        {
          h: "كيف نستخدمها",
          p: ["نستخدم بياناتكم فقط للرد على استفساركم وإعداد عروض الأسعار وترتيب النقل والاحتفاظ بالسجلات التجارية التي يتطلبها القانون. لا نبيع بياناتكم."],
        },
        {
          h: "الاحتفاظ والأمان",
          p: ["نحتفظ بالطلبات فقط للمدة اللازمة للأغراض أعلاه أو وفق ما يقتضيه القانون، ونستخدم تشفير HTTPS وصلاحيات وصول محدودة لحماية بياناتكم."],
        },
        {
          h: "ملفات تعريف الارتباط",
          p: ["تعمل ملفات الارتباط الأساسية على تشغيل الموقع. تُستخدم ملفات التحليلات فقط عند موافقتكم عليها، ويمكنكم تغيير اختياركم بمسح بيانات المتصفح."],
        },
        {
          h: "حقوقكم",
          p: ["يمكنكم طلب الاطلاع على بياناتكم الشخصية أو تصحيحها أو حذفها عبر البريد J8854883@gmail.com أو الاتصال على 055-8854883."],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      updated: "Last updated: November 2026",
      sections: [
        {
          h: "Services",
          p: [
            "MUHAMMAD WISAL TRANSPORT L.L.C provides only the activities listed on Dubai trade license No. 652143: raw materials transport by road, cargo transport by heavy trucks, transport by refrigerator trucks, cargo loading & unloading services and cargo transport by light trucks.",
          ],
        },
        {
          h: "Quotes & VAT",
          p: [
            "Quotes are valid for the period stated on the quote. All prices include 5% UAE VAT, and the VAT amount is shown on every quote and invoice. A quote request through this website is not a binding contract until confirmed in writing.",
          ],
        },
        {
          h: "Customer responsibilities",
          p: [
            "Customers must describe cargo accurately (type, weight, dimensions, temperature requirements) and ensure goods are legal, properly packed and accompanied by any required documents. Prohibited, hazardous or counterfeit goods will not be carried.",
          ],
        },
        {
          h: "Liability",
          p: [
            "Our liability for loss or damage is limited as set out in the transport agreement and applicable UAE law. We are not liable for delays caused by events beyond our reasonable control.",
          ],
        },
        {
          h: "Website use",
          p: [
            "Content on this website, including the logo and documents, belongs to MUHAMMAD WISAL TRANSPORT L.L.C and may not be copied or altered. These terms are governed by the laws of the Emirate of Dubai and the UAE.",
          ],
        },
      ],
    },
    ar: {
      title: "الشروط والأحكام",
      updated: "آخر تحديث: نوفمبر 2026",
      sections: [
        {
          h: "الخدمات",
          p: [
            "تقدم محمد وصال للنقليات ش.ذ.م.م فقط الأنشطة المدرجة في الرخصة التجارية رقم 652143: النقل البري للمواد الأولية، نقل البضائع بالشاحنات الثقيلة، النقل بالمركبات المخصصة للتبريد، خدمات تحميل وتفريغ البضائع، ونقل البضائع بالشاحنات الخفيفة.",
          ],
        },
        {
          h: "عروض الأسعار والضريبة",
          p: [
            "عروض الأسعار سارية للمدة المذكورة فيها. جميع الأسعار تشمل ضريبة القيمة المضافة 5%، وتظهر قيمة الضريبة في كل عرض سعر وفاتورة. طلب عرض السعر عبر الموقع ليس عقداً ملزماً حتى يتم تأكيده كتابياً.",
          ],
        },
        {
          h: "مسؤوليات العميل",
          p: [
            "يجب على العميل وصف البضاعة بدقة (النوع والوزن والأبعاد ومتطلبات الحرارة) والتأكد من أنها قانونية ومعبأة بشكل صحيح ومرفقة بالمستندات المطلوبة. لن يتم نقل البضائع المحظورة أو الخطرة أو المقلدة.",
          ],
        },
        {
          h: "المسؤولية",
          p: ["تقتصر مسؤوليتنا عن الفقدان أو التلف على ما هو منصوص عليه في اتفاقية النقل والقانون الإماراتي المعمول به، ولا نتحمل مسؤولية التأخير الناتج عن ظروف خارجة عن إرادتنا."],
        },
        {
          h: "استخدام الموقع",
          p: ["محتوى هذا الموقع بما في ذلك الشعار والمستندات ملك لمحمد وصال للنقليات ش.ذ.م.م ولا يجوز نسخه أو تعديله. تخضع هذه الشروط لقوانين إمارة دبي ودولة الإمارات."],
        },
      ],
    },
  },
};
