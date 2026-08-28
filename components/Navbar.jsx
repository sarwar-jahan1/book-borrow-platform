"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookMarked, Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const links = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out. See you again soon.");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper">
            <BookMarked size={18} />
          </span>
          The Reading Room
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide transition-colors hover:text-brass ${
                pathname === link.href ? "text-brass font-semibold" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? null : session?.user ? (
            <>
              <span className="font-sans text-sm text-ink/80">
                Hi, <span className="font-semibold text-ink">{session.user.name?.split(" ")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-ink/20 px-4 py-1.5 text-sm font-medium text-ink transition hover:border-rust hover:text-rust"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ink px-5 py-1.5 text-sm font-medium text-paper transition hover:bg-brass"
            >
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-ink/85">
                {link.label}
              </Link>
            ))}
            {isPending ? null : session?.user ? (
              <button onClick={handleLogout} className="text-left text-sm text-rust">
                Logout ({session.user.name?.split(" ")[0]})
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-brass">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
