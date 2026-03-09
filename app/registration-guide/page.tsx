import Link from "next/link";

const steps = [
  "Системд нэвтрэх эсвэл шинэ хэрэглэгч үүсгэх",
  "Бүрэлдэхүүн сургууль болон хөтөлбөрөө сонгох",
  "Шаардлагатай мэдээлэл, баримтаа бөглөх",
  "Шалгалтын товоо баталгаажуулах",
  "Төлбөрөө төлж бүртгэлээ эцэслэх",
];

export default function RegistrationGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#7a1221] hover:underline">← Нүүр хуудас</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-[#7a1221]">Бүртгэлийн заавар</h1>
        <ol className="mt-6 space-y-4 text-sm">
          {steps.map((step, index) => (
            <li key={step} className="rounded-2xl border p-4"><b>{index + 1}.</b> {step}</li>
          ))}
        </ol>
      </div>
    </main>
  );
}
