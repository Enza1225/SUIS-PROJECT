"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Lang = "mn" | "en" | "zh";

const programs = [
  {
    id: 1,
    name: "Дүрслэх урлагийн хөтөлбөр",
    degree: "Bachelor",
    score: 520,
    requirement: "ЕШ + Ур чадварын шалгалт",
    majors: ["Уран зураг", "Уран баримал", "График дизайн"],
  },
  {
    id: 2,
    name: "Хөгжмийн урлагийн хөтөлбөр",
    degree: "Bachelor",
    score: 500,
    requirement: "ЕШ + Сонсгол, хөгжимдөх шалгалт",
    majors: ["Хөгжмийн боловсрол", "Дуучин", "Хөгжмийн найруулга"],
  },
  {
    id: 3,
    name: "Театр, дэлгэцийн урлагийн хөтөлбөр",
    degree: "Master",
    score: 550,
    requirement: "Мэргэжлийн ярилцлага + Портфолио",
    majors: ["Жүжиглэлт", "Найруулагч", "Кино урлаг"],
  },
];

const majors = [
  "Уран зураг",
  "Уран баримал",
  "График дизайн",
  "Хөгжмийн боловсрол",
  "Дуучин",
  "Хөгжмийн найруулга",
  "Жүжиглэлт",
  "Найруулагч",
  "Кино урлаг",
];

const examSchedules = [
  { date: "2026-06-20 09:00", program: "Дүрслэх урлаг", major: "Уран зураг", place: "A байр, 301" },
  { date: "2026-06-21 10:00", program: "Хөгжмийн урлаг", major: "Дуучин", place: "B байр, 201" },
  { date: "2026-06-22 14:00", program: "Театр", major: "Жүжиглэлт", place: "Соёл урлагийн танхим" },
];

const faqs = [
  {
    q: "Бүртгэл хэзээ эхлэх вэ?",
    a: "2026 оны 6-р сарын 1-нд цахимаар эхэлнэ.",
  },
  {
    q: "Ямар бичиг баримт бүрдүүлэх вэ?",
    a: "Иргэний үнэмлэх, боловсролын үнэмлэх, цээж зураг, шаардлагатай бол портфолио.",
  },
  {
    q: "Ур чадварын шалгалт заавал өгөх үү?",
    a: "Тийм. Мэргэжлээс хамаарч ур чадварын шалгалт эсвэл ярилцлага авна.",
  },
];

const copy = {
  mn: {
    title: "СОЁЛ УРЛАГИЙН ИХ СУРГУУЛЬ",
    subtitle: "Албан ёсны элсэлтийн бүртгэлийн систем",
    registerNow: "Бүртгүүлэх",
    admissionInfo: "Бүртгэлийн мэдээлэл",
    rules: "Дүрэм журам",
    guide: "Бүртгэлийн заавар",
    stats: "Элсэлтийн статистик",
    programs: "Хөтөлбөрүүд",
    majors: "Мэргэжлүүд",
    chatbot: "Туслах чатбот",
    degree: "Бүртгүүлэх түвшин",
  },
  en: {
    title: "MONGOLIAN NATIONAL UNIVERSITY OF ARTS AND CULTURE",
    subtitle: "Official admission registration system",
    registerNow: "Register",
    admissionInfo: "Admission information",
    rules: "Rules & regulations",
    guide: "Registration guide",
    stats: "Admission statistics",
    programs: "Programs",
    majors: "Majors",
    chatbot: "Assistant chatbot",
    degree: "Apply for degree",
  },
  zh: {
    title: "蒙古国立文化艺术大学",
    subtitle: "官方招生注册系统",
    registerNow: "立即注册",
    admissionInfo: "报名信息",
    rules: "规章制度",
    guide: "注册指南",
    stats: "招生统计",
    programs: "培养项目",
    majors: "专业",
    chatbot: "问答机器人",
    degree: "选择申请层级",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("mn");
  const [programQuery, setProgramQuery] = useState("");
  const [majorQuery, setMajorQuery] = useState("");
  const [examQuery, setExamQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const [showDegreeOptions, setShowDegreeOptions] = useState(false);
  const [showAuthSuccess] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("auth") === "success";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "success") {
      params.delete("auth");
      const nextQuery = params.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }, []);

  const t = copy[lang];

  const filteredPrograms = useMemo(
    () => programs.filter((p) => p.name.toLowerCase().includes(programQuery.toLowerCase())),
    [programQuery],
  );

  const filteredMajors = useMemo(
    () => majors.filter((m) => m.toLowerCase().includes(majorQuery.toLowerCase())),
    [majorQuery],
  );

  const filteredSchedules = useMemo(
    () =>
      examSchedules.filter((s) => {
        const value = `${s.program} ${s.major} ${s.place}`.toLowerCase();
        return value.includes(examQuery.toLowerCase());
      }),
    [examQuery],
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {showAuthSuccess ? (
        <div className="mx-auto max-w-6xl px-6 pt-6 md:px-14">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            ✅ Амжилттай нэвтэрлээ.
          </div>
        </div>
      ) : null}

      <section className="relative min-h-[92vh] overflow-hidden px-6 pt-4 pb-8 text-white md:px-14">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/videoplayback.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6b0f1a]/75 to-[#8b1e2d]/65" />

        <header className="relative z-20 -mx-6 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 px-6 pb-3 text-xs font-semibold uppercase tracking-wide text-white/90 md:-mx-14 md:px-14 md:text-sm">
          <nav className="flex flex-wrap items-center gap-4 md:gap-6">
            {["News & Stories", "Calendars", "Alumni", "The Museum", "Support"].map((item) => (
              <a key={item} href="#" className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            <nav className="flex flex-wrap items-center gap-4 md:gap-6">
              {["Resources", "Apply", "Get Info", "Meet Us"].map((item) => (
                <a key={item} href="#" className="transition hover:text-white">
                  {item}
                </a>
              ))}
            </nav>
            <Link href="/signin" className="rounded-lg border border-white/60 px-4 py-1.5 text-white transition hover:bg-white/10 normal-case">Sign in</Link>
            <div className="flex gap-1 rounded-full bg-white/20 p-1 text-[11px] font-bold normal-case md:text-sm">
              {([
                ["mn", "MN"],
                ["en", "EN"],
                ["zh", "中文"],
              ] as [Lang, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setLang(key)}
                  className={`rounded-full px-3 py-1.5 ${lang === key ? "bg-white text-[#7a1221]" : "text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[72vh] w-full max-w-6xl flex-col">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3 md:items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-xl bg-white/95 p-2 shadow-md">
                <Image
                  src="/suis-logo.png"
                  alt="SUIS logo"
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain sm:h-16 sm:w-16"
                  priority
                />
              </div>
              <h1 className="max-w-4xl text-xl font-bold leading-tight sm:text-2xl md:text-4xl">{t.title}</h1>
            </div>
            {null}
          </div>
          <p className="mb-8 text-sm text-rose-100 sm:text-base md:text-lg">{t.subtitle}</p>
          <div className="mt-auto mb-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowDegreeOptions((prev) => !prev)}
              className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-[#7a1221] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-rose-50 active:scale-95 animate-pulse"
            >
              {t.registerNow}
            </button>
          </div>

          {showDegreeOptions ? (
            <section className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-white/30 bg-black/20 p-6 text-center shadow-lg backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-bold text-white">{t.degree}</h2>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/signup?degree=bachelor" className="rounded-lg bg-[#7a1221] px-5 py-2 text-center text-white hover:bg-[#65101c]">Bachelor</Link>
                <Link href="/signup?degree=master" className="rounded-lg bg-[#7a1221] px-5 py-2 text-center text-white hover:bg-[#65101c]">Master</Link>
                <Link href="/signup?degree=phd" className="rounded-lg bg-[#7a1221] px-5 py-2 text-center text-white hover:bg-[#65101c]">PhD</Link>
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:px-14">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.admissionInfo}</h2>
          <ul className="grid gap-2 text-sm md:grid-cols-3">
            <li className="rounded-xl bg-slate-100 p-4">Бүртгэл: 2026.06.01 - 2026.06.25</li>
            <li className="rounded-xl bg-slate-100 p-4">Шалгалт: 2026.06.20 - 2026.06.30</li>
            <li className="rounded-xl bg-slate-100 p-4">Элсэлт баталгаажуулалт: 2026.07.01 - 2026.07.05</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.rules}</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "Элсэлтийн ерөнхий журам",
              "Ур чадварын шалгалтын журам",
              "Төлбөр, буцаалт, хөнгөлөлтийн журам",
            ].map((rule) => (
              <a key={rule} href="#" className="rounded-xl border p-4 text-sm transition hover:border-[#8b1e2d] hover:text-[#7a1221]">
                {rule}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.guide}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-100 p-4 text-sm">🎥 Видео заавар (YouTube embed байрлуулах хэсэг)</div>
            <ol className="list-decimal space-y-2 pl-5 text-sm">
              <li>Системд нэвтрэх / бүртгэл үүсгэх</li>
              <li>Хөтөлбөр болон мэргэжлээ сонгох</li>
              <li>Баримт бичиг upload хийх</li>
              <li>Шалгалтын тов авах</li>
              <li>Төлбөр төлж баталгаажуулах</li>
            </ol>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Сошиалд хуваалцах</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="rounded-lg bg-slate-900 px-4 py-2 text-white" href="#">Facebook</a>
            <a className="rounded-lg bg-sky-500 px-4 py-2 text-white" href="#">X / Twitter</a>
            <a className="rounded-lg bg-blue-500 px-4 py-2 text-white" href="#">Telegram</a>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.stats}</h2>
          <div className="grid gap-3 text-sm md:grid-cols-4">
            <div className="rounded-xl bg-rose-50 p-4">2025 элсэгч: <b>4,860</b></div>
            <div className="rounded-xl bg-rose-50 p-4">Өрсөлдөөн: <b>1:3.1</b></div>
            <div className="rounded-xl bg-rose-50 p-4">Тэтгэлэг авсан: <b>812</b></div>
            <div className="rounded-xl bg-rose-50 p-4">Орон нутаг: <b>41%</b></div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.programs}</h2>
          <input
            value={programQuery}
            onChange={(e) => setProgramQuery(e.target.value)}
            placeholder="Хөтөлбөр хайх..."
            className="mb-4 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <div className="grid gap-3">
            {filteredPrograms.map((p) => (
              <div key={p.id} className="rounded-xl border p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{p.name}</h3>
                  <span className="rounded-md bg-rose-100 px-2 py-1 text-xs text-[#7a1221]">Босго оноо: {p.score}</span>
                </div>
                <p className="mt-1 text-slate-600">Түвшин: {p.degree}</p>
                <p className="mt-1 text-slate-600">Шаардлага: {p.requirement}</p>
                <p className="mt-1 text-slate-600">Мэргэжлүүд: {p.majors.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.majors}</h2>
          <input
            value={majorQuery}
            onChange={(e) => setMajorQuery(e.target.value)}
            placeholder="Мэргэжил хайх..."
            className="mb-4 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2 text-sm">
            {filteredMajors.map((m) => (
              <span key={m} className="rounded-full bg-slate-100 px-3 py-1">
                {m}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Ур чадварын шалгалтын хуваарь</h2>
          <input
            value={examQuery}
            onChange={(e) => setExamQuery(e.target.value)}
            placeholder="Хөтөлбөр/мэргэжил/байршлаар хайх..."
            className="mb-4 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <div className="space-y-3 md:hidden">
            {filteredSchedules.map((s, i) => (
              <div key={i} className="rounded-xl border p-3 text-sm">
                <p><span className="font-semibold">Огноо:</span> {s.date}</p>
                <p><span className="font-semibold">Хөтөлбөр:</span> {s.program}</p>
                <p><span className="font-semibold">Мэргэжил:</span> {s.major}</p>
                <p><span className="font-semibold">Байршил:</span> {s.place}</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-3 py-2">Огноо</th>
                  <th className="px-3 py-2">Хөтөлбөр</th>
                  <th className="px-3 py-2">Мэргэжил</th>
                  <th className="px-3 py-2">Байршил</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-3 py-2">{s.date}</td>
                    <td className="px-3 py-2">{s.program}</td>
                    <td className="px-3 py-2">{s.major}</td>
                    <td className="px-3 py-2">{s.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{t.chatbot}</h2>
          <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-2">
              {faqs.map((f, i) => (
                <button
                  key={f.q}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${activeFaq === i ? "border-[#8b1e2d] bg-rose-50" : ""}`}
                  onClick={() => setActiveFaq(i)}
                >
                  {f.q}
                </button>
              ))}
            </div>
            <div className="rounded-xl bg-slate-100 p-4 text-sm">{faqs[activeFaq].a}</div>
          </div>
        </section>

        <section className="hidden" aria-hidden="true" />
      </div>
    </main>
  );
}
