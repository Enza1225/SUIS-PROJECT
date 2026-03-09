"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const YOUTUBE_PREVIEW_SECONDS = 10;

type Lang = "mn" | "en" | "zh";

type School = {
  id: number;
  name: string;
  programs: string[];
};

const schools: School[] = [
  {
    id: 1,
    name: "Бүжгийн урлагийн сургууль",
    programs: ["Ардын бүжиг", "Орчин үеийн бүжиг", "Бүжгийн багш"],
  },
  {
    id: 2,
    name: "Театрын урлагийн сургууль",
    programs: ["Жүжиглэлт", "Найруулагч", "Тайзны яриа"],
  },
  {
    id: 3,
    name: "Хөгжимдөх урлагийн сургууль",
    programs: ["Төгөлдөр хуур", "Хийл", "Үндэсний хөгжим"],
  },
  {
    id: 4,
    name: "Дүрслэх урлагийн сургууль",
    programs: ["Уран зураг", "Уран баримал", "График дизайн"],
  },
  {
    id: 5,
    name: "Кино, дэлгэцийн урлагийн сургууль",
    programs: ["Кино найруулга", "Зураглаач", "Кино продюсер"],
  },
  {
    id: 6,
    name: "Соёл судлал, өвийн сургууль",
    programs: ["Соёл судлал", "Өвийн менежмент", "Музейн ажил"],
  },
  {
    id: 7,
    name: "Дизайн, медиа урлагийн сургууль",
    programs: ["Интерьер дизайн", "Медиа арт", "Анимейшн"],
  },
];

const examSchedules = [
  { date: "2026-06-20 09:00", program: "Дүрслэх урлаг", major: "Уран зураг", place: "А байр, 301" },
  { date: "2026-06-21 10:00", program: "Хөгжимдөх урлаг", major: "Төгөлдөр хуур", place: "Б байр, 201" },
  { date: "2026-06-22 14:00", program: "Театрын урлаг", major: "Жүжиглэлт", place: "Соёл урлагийн танхим" },
];

const faqs = [
  {
    q: "Бүртгэл хэзээ эхлэх вэ?",
    a: "2026 оны 6-р сарын 1-нд цахимаар эхэлж, 6-р сарын 25 хүртэл үргэлжилнэ.",
  },
  {
    q: "Онооны тооцоолуур юунд хэрэгтэй вэ?",
    a: "ЕШ, ур чадвар, ярилцлага зэрэг оноогоо оруулаад урьдчилсан нийлбэрээ харах боломжтой.",
  },
  {
    q: "Сургууль сонголтоо хаанаас хийх вэ?",
    a: "Header дээрх “Бүрэлдэхүүн сургууль” цэснээс 7 сургуулийн аль нэгийг сонгож мэдээлэл үзнэ.",
  },
];

const studentStories = [
  {
    id: 1,
    name: "Оюутны видео 1",
    quote: "Энд би өөрийн ур чадвараа илүү тодорхой хөгжүүлж чадсан.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    name: "Оюутны видео 2",
    quote: "Сургалтын орчин, багш нарын дэмжлэг маш хүчтэй санагдсан.",
    youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: 3,
    name: "Оюутны видео 3",
    quote: "Элсэлтийн процесс ойлгомжтой, шат дараатай байсан.",
    youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
];

function extractYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "");
    }

    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
    }

    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
    }

    return parsed.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

function buildYouTubeEmbedUrl(videoId: string, mode: "preview" | "full") {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
  });

  if (mode === "preview") {
    params.set("mute", "1");
    params.set("controls", "0");
    params.set("start", "0");
    params.set("end", String(YOUTUBE_PREVIEW_SECONDS));
    params.set("loop", "1");
    params.set("playlist", videoId);
  } else {
    params.set("mute", "0");
    params.set("controls", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

const copy = {
  mn: {
    title: "СОЁЛ УРЛАГИЙН ИХ СУРГУУЛЬ",
    subtitle: "Албан ёсны элсэлтийн бүртгэлийн систем",
    registerNow: "Бүртгүүлэх",
    admissionInfo: "Бүртгэлийн мэдээлэл",
    guide: "Бүртгэлийн заавар",
    stats: "Элсэлтийн статистик",
    calculator: "Шалгалтын онооны тооцоолуур",
    contact: "Бидэнтэй холбогдох",
    chatbot: "Туслах чатбот",
    degree: "Бүртгүүлэх түвшин",
  },
  en: {
    title: "MONGOLIAN NATIONAL UNIVERSITY OF ARTS AND CULTURE",
    subtitle: "Official admission registration system",
    registerNow: "Register",
    admissionInfo: "Admission information",
    guide: "Registration guide",
    stats: "Admission statistics",
    calculator: "Score calculator",
    contact: "Contact us",
    chatbot: "Assistant chatbot",
    degree: "Apply for degree",
  },
  zh: {
    title: "蒙古国立文化艺术大学",
    subtitle: "官方招生注册系统",
    registerNow: "立即注册",
    admissionInfo: "报名信息",
    guide: "注册指南",
    stats: "招生统计",
    calculator: "分数计算器",
    contact: "联系我们",
    chatbot: "问答机器人",
    degree: "选择申请层级",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("mn");
  const [examQuery, setExamQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const [showDegreeOptions, setShowDegreeOptions] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showSchools, setShowSchools] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<number>(schools[0].id);
  const [previewingStoryId, setPreviewingStoryId] = useState<number | null>(null);
  const [playingStoryId, setPlayingStoryId] = useState<number | null>(null);
  const [examScore, setExamScore] = useState("520");
  const [skillScore, setSkillScore] = useState("85");
  const [interviewScore, setInterviewScore] = useState("20");
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
  const selectedSchool = schools.find((school) => school.id === selectedSchoolId) ?? schools[0];

  const filteredSchedules = useMemo(
    () =>
      examSchedules.filter((s) => {
        const value = `${s.program} ${s.major} ${s.place}`.toLowerCase();
        return value.includes(examQuery.toLowerCase());
      }),
    [examQuery],
  );

  const storyCards = useMemo(
    () =>
      studentStories
        .map((story) => ({ ...story, videoId: extractYouTubeVideoId(story.youtubeUrl) }))
        .filter((story) => story.videoId),
    [],
  );

  const totalScore = Number(examScore || 0) + Number(skillScore || 0) + Number(interviewScore || 0);

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
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="auto">
          <source src="/video/videoplayback.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#5b0b16]/85 via-[#7a1221]/80 to-[#8b1e2d]/75" />

        <header className="relative z-20 -mx-6 mb-8 border-b border-white/20 px-6 pb-4 md:-mx-14 md:px-14">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wide text-white/90 md:text-sm">
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <div className="relative normal-case">
                <button
                  type="button"
                  onClick={() => setShowSchools((prev) => !prev)}
                  className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
                >
                  Бүрэлдэхүүн сургууль ▾
                </button>

                {showSchools ? (
                  <div className="absolute left-0 top-full mt-2 w-[310px] rounded-xl border border-white/15 bg-[#67111d]/95 p-2 text-sm normal-case shadow-2xl backdrop-blur">
                    {schools.map((school) => (
                      <button
                        key={school.id}
                        type="button"
                        onClick={() => {
                          setSelectedSchoolId(school.id);
                          setShowSchools(false);
                        }}
                        className="flex w-full items-start rounded-lg px-3 py-2 text-left transition hover:bg-white/10"
                      >
                        {school.name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <Link href="/admission-info" className="transition hover:text-white">Бүртгэлийн мэдээлэл</Link>
              <Link href="/registration-guide" className="transition hover:text-white">Бүртгэлийн заавар</Link>
              <Link href="/admission-stats" className="transition hover:text-white">Элсэлтийн статистик</Link>
              <Link href="/contact" className="transition hover:text-white">Бидэнтэй холбогдох</Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              <Link href="/score-calculator" className="transition hover:text-white">Шалгалтын оноо</Link>
              <Link href="/signin" className="rounded-lg border border-white/60 px-4 py-1.5 text-white transition hover:bg-white/10 normal-case">Нэвтрэх</Link>
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
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 md:items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-xl bg-white/95 p-2 shadow-md">
                <Image
                  src="/suis-logo.png"
                  alt="SUIS logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
                  priority
                />
              </div>
              <div>
                <h1 className="max-w-5xl text-3xl font-extrabold leading-tight tracking-wide drop-shadow-md sm:text-4xl md:text-6xl">{t.title}</h1>
                <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-base">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="mt-auto mb-6 flex flex-col items-start gap-4">
              <p className="rounded-full border border-white/30 bg-black/25 px-5 py-2 text-center text-base font-bold text-white shadow-md backdrop-blur-sm md:text-xl">
                Бакалаврын элсэлтийн бүртгэл эхэллээ
              </p>
              <p className="max-w-2xl text-sm leading-7 text-white/90 md:text-base">
                Чиний сонгосон сургууль: <span className="font-bold">{selectedSchool.name}</span>. Доорх хөтөлбөрүүдээс сонирхоод, бүртгэл болон шалгалтын мэдээллээ нэг дороос хараарай.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                {selectedSchool.programs.map((program) => (
                  <span key={program} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    {program}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowDegreeOptions((prev) => !prev)}
                  className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-[#7a1221] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-rose-50 active:scale-95"
                >
                  {t.registerNow}
                </button>
                <Link href="/score-calculator" className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  {t.calculator}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-black/20 p-5 shadow-lg backdrop-blur-sm">
              <h2 className="text-lg font-bold">Онцлох холбоосууд</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <Link href="/admission-info" className="rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15">Бүртгэлийн мэдээлэл харах</Link>
                <Link href="/registration-guide" className="rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15">Бүртгэлийн заавар үзэх</Link>
                <Link href="/admission-stats" className="rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15">Элсэлтийн статистик харах</Link>
                <Link href="/contact" className="rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15">Бидэнтэй холбогдох</Link>
              </div>
            </div>
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
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link href="/admission-info" className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-[#7a1221]">01</p>
            <h2 className="mt-2 text-xl font-bold">{t.admissionInfo}</h2>
            <p className="mt-2 text-sm text-slate-600">Хугацаа, бүрдүүлэх материал, шалгалтын үе шат.</p>
          </Link>
          <Link href="/registration-guide" className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-[#7a1221]">02</p>
            <h2 className="mt-2 text-xl font-bold">{t.guide}</h2>
            <p className="mt-2 text-sm text-slate-600">Алхам алхмаар бүртгэл хийх дараалал.</p>
          </Link>
          <Link href="/admission-stats" className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-[#7a1221]">03</p>
            <h2 className="mt-2 text-xl font-bold">{t.stats}</h2>
            <p className="mt-2 text-sm text-slate-600">Өмнөх жилийн элсэлт, өрсөлдөөн, тэтгэлэг.</p>
          </Link>
          <Link href="/contact" className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-[#7a1221]">04</p>
            <h2 className="mt-2 text-xl font-bold">{t.contact}</h2>
            <p className="mt-2 text-sm text-slate-600">Хаяг, утас, имэйл, ажлын цаг.</p>
          </Link>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">{t.calculator}</h2>
            <Link href="/score-calculator" className="text-sm font-semibold text-[#7a1221] hover:underline">Дэлгэрэнгүй хуудас руу</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <label className="text-sm">
              <span className="mb-1 block font-medium">ЕШ оноо</span>
              <input value={examScore} onChange={(e) => setExamScore(e.target.value)} type="number" className="w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Ур чадвар</span>
              <input value={skillScore} onChange={(e) => setSkillScore(e.target.value)} type="number" className="w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Ярилцлага</span>
              <input value={interviewScore} onChange={(e) => setInterviewScore(e.target.value)} type="number" className="w-full rounded-lg border px-3 py-2" />
            </label>
            <div className="rounded-xl bg-rose-50 p-4 text-sm">
              <p className="text-slate-500">Нийт урьдчилсан оноо</p>
              <p className="mt-2 text-3xl font-extrabold text-[#7a1221]">{totalScore}</p>
            </div>
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
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Видео заавар</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {storyCards.map((story) => {
              const isPlaying = playingStoryId === story.id;
              const isPreviewing = !isPlaying && previewingStoryId === story.id;
              const embedUrl = buildYouTubeEmbedUrl(story.videoId, isPlaying ? "full" : "preview");
              const thumbnailUrl = `https://i.ytimg.com/vi/${story.videoId}/hqdefault.jpg`;

              return (
                <article
                  key={story.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-sm"
                  onMouseEnter={() => {
                    if (!isPlaying) setPreviewingStoryId(story.id);
                  }}
                  onMouseLeave={() => {
                    if (!isPlaying) setPreviewingStoryId((current) => (current === story.id ? null : current));
                  }}
                >
                  <div className="relative aspect-[4/5] bg-black">
                    {isPreviewing || isPlaying ? (
                      <iframe
                        key={`${story.id}-${isPlaying ? "full" : "preview"}`}
                        src={embedUrl}
                        title={`${story.name} video`}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <Image src={thumbnailUrl} alt={story.name} fill unoptimized className="object-cover" />
                    )}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {!isPlaying ? (
                      <button
                        type="button"
                        onClick={() => {
                          setPlayingStoryId(story.id);
                          setPreviewingStoryId(null);
                        }}
                        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/85 px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#7a1221]"
                      >
                        PLAY ▶
                      </button>
                    ) : null}

                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-center">
                      <p className="text-lg font-extrabold uppercase tracking-wide">{story.name}</p>
                      <p className="mt-2 text-sm leading-6 text-white/90">“{story.quote}”</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="mt-12 bg-[#7a1221] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">SUIS</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-wide md:text-3xl">Соёл Урлагийн Их Сургууль</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
              Элсэлтийн мэдээлэл, бүртгэл, шалгалтын хуваарь болон шаардлагатай зааврыг нэг дороос авах албан ёсны орчин.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Холбоос</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li><Link href="/admission-info" className="transition hover:text-white">Бүртгэлийн мэдээлэл</Link></li>
              <li><Link href="/registration-guide" className="transition hover:text-white">Бүртгэлийн заавар</Link></li>
              <li><Link href="/admission-stats" className="transition hover:text-white">Элсэлтийн статистик</Link></li>
              <li><Link href="/contact" className="transition hover:text-white">Бидэнтэй холбогдох</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Холбоо барих</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li>Улаанбаатар хот, СБД</li>
              <li>admission@suis.edu.mn</li>
              <li>+976 11 123456</li>
              <li>Даваа–Баасан, 09:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-xs text-white/70 md:flex-row md:items-center md:justify-between md:px-14">
            <p>© 2026 Соёл Урлагийн Их Сургууль. Бүх эрх хуулиар хамгаалагдсан.</p>
            <p>Vine red theme · Admission System</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {chatOpen ? (
          <div className="w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{t.chatbot}</h3>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-full border px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mb-3 flex flex-col gap-2">
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

            <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-800">{faqs[activeFaq].a}</div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="h-14 w-14 rounded-full bg-[#7a1221] text-2xl text-white shadow-xl transition hover:scale-105"
          aria-label="Open chatbot"
        >
          💬
        </button>
      </div>
    </main>
  );
}
