import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#7a1221] hover:underline">← Нүүр хуудас</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-[#7a1221]">Бидэнтэй холбогдох</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm leading-7">
          <div className="rounded-2xl border p-4">
            <p><b>Хаяг:</b> Улаанбаатар хот, Сүхбаатар дүүрэг</p>
            <p><b>Утас:</b> +976 11 123456</p>
            <p><b>Имэйл:</b> admission@suis.edu.mn</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p><b>Ажлын цаг:</b> Даваа–Баасан 09:00–18:00</p>
            <p><b>Facebook:</b> SUIS Admission</p>
            <p><b>Telegram:</b> @suisadmission</p>
          </div>
        </div>
      </div>
    </main>
  );
}
