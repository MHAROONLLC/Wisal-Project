# Muhammad Wisal Transport L.L.C — Website (front end)

Bilingual (English / Arabic RTL) corporate site built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.
Front end only: all content lives in typed data files, so a CMS/backend can replace them later.

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /en
npm run build && npm start
```

## Where to edit content
| What | File |
| --- | --- |
| Company details, phones, email, hours, license numbers & dates, documents | `src/lib/company.ts` |
| The 5 licensed services (EN/AR text, benefits, cargo) | `src/lib/services.ts` |
| Fleet cards and FAQ | `src/lib/content.ts` |
| All interface text (EN/AR) | `src/lib/dictionary.ts` |
| Privacy Policy / Terms | `src/lib/legal.ts` |
| Production domain (SEO, sitemap) | `NEXT_PUBLIC_SITE_URL` env var (see `src/lib/seo.ts`) |

## License documents
`public/documents/` holds the Commercial License, Commercial Register and DCCI certificate as
2480 px PNG + single-page PDF. Person numbers, paid capital and landlord details are redacted;
the Partners annex and remarks page are not published. QR codes are untouched and were verified
to decode (file, laptop screen, phone screen). To renew: replace the files with the same names and
update `issueDate` / `expiryDate` / `expiryISO` in `src/lib/company.ts` — the validity badge turns
amber 60 days before expiry and red after it.

## Not yet wired (needs a backend)
Quote-form emails and admin storage (form currently validates, shows a reference number and keeps a
copy in the browser's localStorage), CMS/admin panel, CSV export, Google Analytics 4.
