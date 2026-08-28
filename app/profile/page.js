"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Mail, CalendarClock } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useSession } from "@/lib/auth-client";

function ProfileContent() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">Member card</span>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ink">My Profile</h1>

      <div className="catalog-card mt-8 flex flex-col items-center gap-6 rounded-sm p-8 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-brass">
          {user?.image ? (
            <Image src={user.image} alt={user.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ink text-2xl font-semibold text-paper">
              {user?.name?.[0] ?? "?"}
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display text-2xl font-semibold text-ink">{user?.name}</h2>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-ink/60 sm:justify-start">
            <Mail size={14} /> {user?.email}
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-ink/60 sm:justify-start">
            <CalendarClock size={14} />
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </p>

          <Link
            href="/profile/update"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition hover:bg-brass"
          >
            <Pencil size={14} /> Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
