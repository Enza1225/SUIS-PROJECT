import LogoutButton from "@/app/components/logout-button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#7a1221]">My Profile</h1>
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-[#7a1221]">
            ← Back to dashboard
          </Link>
        </div>

        <div className="space-y-3 rounded-xl border p-4 text-sm">
          <p>
            <span className="font-semibold">First name:</span> {user.firstName ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Last name:</span> {user.lastName ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">User ID:</span> {user.id}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
