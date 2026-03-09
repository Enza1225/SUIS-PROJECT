import Link from "next/link";

export default function AdmissionInfoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#7a1221] hover:underline">← Нүүр хуудас</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-[#7a1221]">Бүртгэлийн мэдээлэл</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-2xl bg-rose-50 p-4"><b>Бүртгэл:</b><br/>2026.06.01 – 2026.06.25</div>
          <div className="rounded-2xl bg-rose-50 p-4"><b>Шалгалт:</b><br/>2026.06.20 – 2026.06.30</div>
          <div className="rounded-2xl bg-rose-50 p-4"><b>Баталгаажуулалт:</b><br/>2026.07.01 – 2026.07.05</div>
        </div>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
          <p>Энэ хуудсанд элсэгчийн бүртгэлийн хугацаа, бүрдүүлэх материал, шалгалтын шат дараалал болон хөтөлбөрийн ерөнхий мэдээллийг харуулна.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Иргэний үнэмлэхний хуулбар</li>
            <li>Боловсролын гэрчилгээ, дүнгийн хавсралт</li>
            <li>Цээж зураг</li>
            <li>Портфолио / шаардлагатай бол</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
