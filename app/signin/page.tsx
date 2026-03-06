import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#7a1221]">Sign in</h1>
          <Link href="/" className="text-sm text-slate-500 hover:text-[#7a1221]">
            ← Back to home
          </Link>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input className="w-full rounded-lg border px-3 py-2 text-sm" type="email" placeholder="name@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input className="w-full rounded-lg border px-3 py-2 text-sm" type="password" placeholder="••••••••" />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#7a1221] px-4 py-2.5 font-semibold text-white transition hover:bg-[#65101c]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          New user?{" "}
          <Link href="/signup" className="font-medium text-[#7a1221] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
