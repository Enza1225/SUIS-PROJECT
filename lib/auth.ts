import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export type SessionUser = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("suis_session")?.value;

  if (!raw) return null;

  const userId = Number.parseInt(raw, 10);
  if (!Number.isFinite(userId)) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  return user;
}
