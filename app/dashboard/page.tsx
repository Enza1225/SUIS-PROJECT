import LogoutButton from "@/app/components/logout-button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const programCards = [
  {
    title: "Дүрслэх урлагийн хөтөлбөр",
    degree: "Bachelor",
    minScore: 520,
    note: "ЕШ + Ур чадварын шалгалт",
  },
  {
    title: "Хөгжмийн урлагийн хөтөлбөр",
    degree: "Bachelor",
    minScore: 500,
    note: "ЕШ + Сонсгол, хөгжимдөх шалгалт",
  },
  {
    title: "Театр, дэлгэцийн урлагийн хөтөлбөр",
    degree: "Master",
    minScore: 550,
    note: "Мэргэжлийн ярилцлага + Портфолио",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Амжилттай нэвтэрлээ</p>
              <h1 className="mt-1 text-2xl font-bold text-[#7a1221]">
                Сайн байна уу, {user.firstName ?? user.email}
              </h1>
              <p className="mt-2 text-sm text-slate-600">Эндээс хөтөлбөрүүдээ харж, профайлаа удирдана.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="rounded-lg bg-[#7a1221] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#65101c]"
              >
                Profile
              </Link>
              <LogoutButton />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-bold">Хөтөлбөрийн мэдээлэл</h2>
          <div className="grid gap-3">
            {programCards.map((program) => (
              <article key={program.title} className="rounded-xl border p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{program.title}</h3>
                  <span className="rounded-md bg-rose-100 px-2 py-1 text-xs text-[#7a1221]">
                    Босго оноо: {program.minScore}
                  </span>
                </div>
                <p className="mt-1 text-slate-600">Түвшин: {program.degree}</p>
                <p className="mt-1 text-slate-600">Шаардлага: {program.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
