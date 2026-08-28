import Link from "next/link";
import { BookMarked, AtSign, MessageCircle, Send, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/15 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink">
              <BookMarked size={18} />
            </span>
            The Reading Room
          </div>
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            A small, well-kept catalog for people who still like the feeling of a due date.
            Borrow digitally, return honestly.
          </p>
          <div className="mt-5 flex gap-3">
            {[AtSign, MessageCircle, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 transition hover:border-brass hover:text-brass"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-brass">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li><Link href="/" className="hover:text-paper">Home</Link></li>
            <li><Link href="/all-books" className="hover:text-paper">All Books</Link></li>
            <li><Link href="/profile" className="hover:text-paper">My Profile</Link></li>
            <li><Link href="/register" className="hover:text-paper">Become a Member</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-brass">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@readingroom.app</li>
            <li>12 Ledger Lane, Book District</li>
            <li>Open daily, 9am – 8pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} The Reading Room. Built for a learning assignment.
      </div>
    </footer>
  );
}
