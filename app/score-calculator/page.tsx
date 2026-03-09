"use client";

import Link from "next/link";
import { useState } from "react";

export default function ScoreCalculatorPage() {
  const [exam, setExam] = useState("520");
  const [skill, setSkill] = useState("85");
  const [interview, setInterview] = useState("20");

  const total = Number(exam || 0) + Number(skill || 0) + Number(interview || 0);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm text-[#7a1221] hover:underline">← Нүүр хуудас</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-[#7a1221]">Шалгалтын онооны тооцоолуур</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
          <label>
            <span className="mb-1 block font-medium">ЕШ оноо</span>
            <input type="number" value={exam} onChange={(e) => setExam(e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label>
            <span className="mb-1 block font-medium">Ур чадварын оноо</span>
            <input type="number" value={skill} onChange={(e) => setSkill(e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label>
            <span className="mb-1 block font-medium">Ярилцлагын оноо</span>
            <input type="number" value={interview} onChange={(e) => setInterview(e.target.value)} className="w-full rounded-lg border px-3 py-2" />
          </label>
        </div>
        <div className="mt-6 rounded-2xl bg-rose-50 p-6">
          <p className="text-sm text-slate-500">Нийт урьдчилсан оноо</p>
          <p className="mt-2 text-4xl font-extrabold text-[#7a1221]">{total}</p>
        </div>
      </div>
    </main>
  );
}
