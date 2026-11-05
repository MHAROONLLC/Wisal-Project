import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "404 – Page not found | Muhammad Wisal Transport L.L.C",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="grid min-h-dvh place-items-center bg-navy-glow p-6 text-center text-white">
        <div>
          <p className="text-gradient text-8xl font-extrabold">404</p>
          <h1 className="mt-4 text-2xl font-bold">Page not found · الصفحة غير موجودة</h1>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/en" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold">
              Home
            </Link>
            <Link href="/ar" className="rounded-lg px-6 py-3 font-semibold ring-1 ring-white/30">
              الرئيسية
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
