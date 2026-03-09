import Link from "next/link";

const stats = [
  { label: "2025 элсэгч", value: "4,860" },
  { label: "Өрсөлдөөн", value: "1:3.1" },
  { label: "Тэтгэлэг авсан", value: "812" },
  { label: "Орон нутаг", value: "41%" },
];

export default function AdmissionStatsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#7a1221] hover:underline">← Нүүр хуудас</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-[#7a1221]">Элсэлтийн статистик</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-4 text-sm">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-rose-50 p-4">
              <p className="text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#7a1221]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
