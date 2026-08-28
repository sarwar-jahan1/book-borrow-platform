import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #eeece2 0, #eeece2 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div>
          <span className="stamp text-xs text-brass">Est. digital library</span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
            Find Your
            <br />
            Next Read
          </h1>
          <p className="mt-5 max-w-md text-paper/70">
            Hundreds of titles across story, tech, and science — catalogued like a
            reading room, borrowed like the future. No late fees, just good books.
          </p>
          <Link
            href="/all-books"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
          >
            Browse Now <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative mx-auto hidden h-72 w-56 rotate-3 rounded-sm border border-paper/20 bg-paper/5 p-4 backdrop-blur md:block">
          <div className="absolute -left-6 top-10 h-72 w-56 -rotate-6 rounded-sm border border-paper/15 bg-paper/5" />
          <div className="absolute -right-4 -top-6 h-72 w-56 rotate-12 rounded-sm border border-brass/40 bg-brass/10" />
        </div>
      </div>
    </section>
  );
}
