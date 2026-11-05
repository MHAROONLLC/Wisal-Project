"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from "react";
import { FileText, Loader2, Receipt, Send, Upload, X } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/company";
import { services } from "@/lib/services";

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  pickup: string;
  delivery: string;
  cargoType: string;
  weight: string;
  date: string;
  message: string;
  consent: boolean;
  website: string; // honeypot — humans never see or fill this
};

const empty: Fields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  service: "",
  pickup: "",
  delivery: "",
  cargoType: "",
  weight: "",
  date: "",
  message: "",
  consent: false,
  website: "",
};

const REQUIRED: (keyof Fields)[] = ["name", "phone", "email", "service", "pickup", "delivery", "cargoType", "consent"];
const MAX_FILE = 10 * 1024 * 1024;

const makeReference = () => `MWT-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export function QuoteForm() {
  const { locale, dict } = useI18n();
  const t = dict.quote;
  const params = useSearchParams();
  const preset = params.get("service");
  const [f, setF] = useState<Fields>(() => ({ ...empty, service: services.some((s) => s.slug === preset) ? preset! : "" }));
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");
  const [minDate, setMinDate] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- today's date must come from the client clock
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  function validate(k: keyof Fields): string {
    const v = f[k];
    if (REQUIRED.includes(k) && !v) return t.required;
    if (k === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v))) return t.invalidEmail;
    if (k === "phone" && v && !/^(971|0)?(5\d{8}|[2-9]\d{7})$/.test(String(v).replace(/\D/g, ""))) return t.invalidPhone;
    return "";
  }
  const errors = Object.fromEntries((Object.keys(f) as (keyof Fields)[]).map((k) => [k, validate(k)])) as Record<keyof Fields, string>;
  const err = (k: keyof Fields) => (touched[k] ? errors[k] : "");

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((p) => ({ ...p, [k]: true }));

  function pickFile(next: File | undefined | null) {
    if (!next) return;
    if (next.size > MAX_FILE) {
      setFileError(t.fileTooBig);
      setFile(null);
      return;
    }
    setFileError("");
    setFile(next);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(Object.fromEntries(REQUIRED.map((k) => [k, true])));
    if (REQUIRED.some((k) => errors[k]) || errors.email || errors.phone || fileError) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    if (f.website) return; // bot filled the honeypot — silently drop
    setStatus("sending");
    // Front-end only: simulate the API call. Replace with a POST to the backend/CMS later.
    await new Promise((r) => setTimeout(r, 1400));
    const reference = makeReference();
    try {
      const saved = JSON.parse(localStorage.getItem("mwt-enquiries") ?? "[]");
      saved.push({ ...f, file: file?.name ?? null, reference, createdAt: new Date().toISOString() });
      localStorage.setItem("mwt-enquiries", JSON.stringify(saved));
    } catch {}
    setRef(reference);
    setStatus("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setF(empty);
    setTouched({});
    setFile(null);
    setStatus("idle");
  }

  const serviceName = services.find((s) => s.slug === f.service)?.title[locale] ?? "";
  const waText = [
    dict.common.whatsappMsg,
    `${t.name}: ${f.name}`,
    f.company && `${t.company}: ${f.company}`,
    serviceName && `${t.service}: ${serviceName}`,
    f.pickup && `${t.pickup}: ${f.pickup}`,
    f.delivery && `${t.delivery}: ${f.delivery}`,
    f.cargoType && `${t.cargoType}: ${f.cargoType}`,
    f.weight && `${t.weight}: ${f.weight}`,
    f.date && `${t.date}: ${f.date}`,
  ]
    .filter(Boolean)
    .join("\n");

  const groupDone = [
    !errors.name && !errors.phone && !errors.email,
    !errors.service && !errors.pickup && !errors.delivery && !errors.cargoType,
    !errors.consent,
  ];

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-silver-200 bg-white p-8 text-center sm:p-12"
          role="status"
        >
          <svg viewBox="0 0 52 52" className="mx-auto size-24" aria-hidden>
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.path
              d="M15 27l7 7 15-15"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            />
          </svg>
          <h2 className="mt-6 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t.successTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-silver-400">{t.successText}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-5 py-2 font-mono text-lg font-bold text-brand-700 ring-1 ring-brand-100">
            {t.reference}: {ref}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(`${waText}\n${t.reference}: ${ref}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1fa855] px-6 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" /> {t.orWhatsapp}
            </a>
            <button
              type="button"
              onClick={reset}
              className="h-12 rounded-lg px-6 font-semibold text-navy-900 ring-1 ring-silver-300 transition-colors hover:bg-silver-100"
            >
              {t.another}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={submit}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-2xl border border-silver-200 bg-white p-5 sm:p-8"
        >
          <Group n={1} title={t.step1} done={groupDone[0]}>
            <Field label={t.name} required error={err("name")}>
              <input value={f.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" {...inputProps(err("name"))} />
            </Field>
            <Field label={t.company}>
              <input value={f.company} onChange={set("company")} autoComplete="organization" {...inputProps("")} />
            </Field>
            <Field label={t.phone} required error={err("phone")}>
              <input
                type="tel"
                dir="ltr"
                placeholder="05X XXX XXXX"
                value={f.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
                autoComplete="tel"
                {...inputProps(err("phone"))}
              />
            </Field>
            <Field label={t.email} required error={err("email")}>
              <input
                type="email"
                dir="ltr"
                value={f.email}
                onChange={set("email")}
                onBlur={blur("email")}
                autoComplete="email"
                {...inputProps(err("email"))}
              />
            </Field>
          </Group>

          <Group n={2} title={t.step2} done={groupDone[1]}>
            <Field label={t.service} required error={err("service")} full>
              <select value={f.service} onChange={set("service")} onBlur={blur("service")} {...inputProps(err("service"))}>
                <option value="">{t.selectService}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title[locale]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t.pickup} required error={err("pickup")}>
              <input value={f.pickup} onChange={set("pickup")} onBlur={blur("pickup")} {...inputProps(err("pickup"))} />
            </Field>
            <Field label={t.delivery} required error={err("delivery")}>
              <input value={f.delivery} onChange={set("delivery")} onBlur={blur("delivery")} {...inputProps(err("delivery"))} />
            </Field>
            <Field label={t.cargoType} required error={err("cargoType")}>
              <input value={f.cargoType} onChange={set("cargoType")} onBlur={blur("cargoType")} {...inputProps(err("cargoType"))} />
            </Field>
            <Field label={t.weight}>
              <input value={f.weight} onChange={set("weight")} {...inputProps("")} />
            </Field>
            <Field label={t.date}>
              <input type="date" min={minDate || undefined} value={f.date} onChange={set("date")} {...inputProps("")} />
            </Field>
          </Group>

          <Group n={3} title={t.step3} done={groupDone[2]} last>
            <Field label={t.message} full>
              <textarea rows={4} value={f.message} onChange={set("message")} {...inputProps("")} />
            </Field>

            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-navy-900">{t.file}</span>
              <motion.div
                animate={{ scale: dragging ? 1.02 : 1 }}
                onDragOver={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(false);
                  pickFile(e.dataTransfer.files[0]);
                }}
                className={`relative rounded-2xl border-2 border-dashed p-5 text-center transition-colors ${
                  dragging ? "border-brand-500 bg-brand-50" : "border-silver-300 hover:border-brand-400 hover:bg-silver-100/60"
                }`}
              >
                {file ? (
                  <div className="flex items-center justify-between gap-3 text-start">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                        <FileText className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-navy-900">{file.name}</span>
                        <span className="text-xs text-silver-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      aria-label="Remove file"
                      className="grid size-9 place-items-center rounded-full text-silver-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInput.current?.click()} className="w-full">
                    <Upload className={`mx-auto size-7 text-brand-500 transition-transform ${dragging ? "-translate-y-1" : ""}`} />
                    <span className="mt-2 block text-sm font-semibold text-navy-900">{t.file}</span>
                    <span className="text-xs text-silver-400">{t.fileHint}</span>
                  </button>
                )}
                <input
                  ref={fileInput}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.xls,.xlsx,.csv,.doc,.docx"
                  className="sr-only"
                  tabIndex={-1}
                  onChange={(e) => pickFile(e.target.files?.[0])}
                />
              </motion.div>
              {fileError && <p className="mt-1.5 text-xs font-medium text-red-600">{fileError}</p>}
            </div>

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-800 sm:col-span-2">
              <input
                type="checkbox"
                checked={f.consent}
                onChange={set("consent")}
                onBlur={blur("consent")}
                aria-invalid={!!err("consent")}
                className="mt-0.5 size-5 shrink-0 accent-brand-600"
              />
              <span>
                {t.consent}{" "}
                <Link href={`/${locale}/privacy`} className="font-semibold text-brand-600 hover:underline">
                  {dict.footer.privacy}
                </Link>
                {err("consent") && <span className="mt-1 block text-xs font-medium text-red-600">{err("consent")}</span>}
              </span>
            </label>
          </Group>

          <div className="mt-6 flex flex-col gap-4 border-t border-silver-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-silver-400">
              <Receipt className="size-4 text-brand-500" /> {t.vatNote}
            </p>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-80"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> {t.sending}
                </>
              ) : (
                <>
                  <Send className="flip-rtl size-5" /> {t.submit}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function inputProps(error: string) {
  return {
    "aria-invalid": !!error,
    className: `w-full rounded-lg bg-white px-4 py-3 text-navy-900 ring-1 transition-all duration-200 outline-none placeholder:text-silver-400 focus:bg-white focus:ring-2 ${
      error ? "ring-red-400 focus:ring-red-500" : "ring-silver-200 hover:ring-silver-300 focus:ring-brand-500"
    }`,
  };
}

function Field({ label, required, error, full, children }: { label: string; required?: boolean; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-xs font-medium text-red-600"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function Group({ n, title, done, last, children }: { n: number; title: string; done: boolean; last?: boolean; children: ReactNode }) {
  return (
    <fieldset className={`relative ps-12 ${last ? "" : "pb-8"}`}>
      {!last && <span className="absolute top-10 bottom-0 w-0.5 bg-silver-200 ltr:left-[17px] rtl:right-[17px]" aria-hidden />}
      <motion.span
        animate={{ scale: done ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.4 }}
        className={`absolute top-0 grid size-9 place-items-center rounded-full text-sm font-bold transition-colors duration-500 ltr:left-0 rtl:right-0 ${
          done ? "bg-emerald-600 text-white" : "bg-brand-600 text-white"
        }`}
      >
        {done ? "✓" : n}
      </motion.span>
      <legend className="sr-only">{title}</legend>
      <p className="pt-1.5 text-lg font-bold text-navy-900" aria-hidden>
        {title}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
