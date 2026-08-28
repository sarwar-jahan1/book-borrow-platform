import Link from "next/link";

const categories = [
  { name: "Story", desc: "Fiction, mystery, and literary favorites", accent: "bg-rust/10 text-rust" },
  { name: "Tech", desc: "Engineering, software, and systems design", accent: "bg-sage/10 text-sage" },
  { name: "Science", desc: "Physics, biology, and the natural world", accent: "bg-brass/10 text-brass-dark" },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-paper-2/60 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">
          Browse by shelf
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
          Three sections, one reading room
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/all-books?category=${c.name}`}
              className="group rounded-sm border border-ink/10 bg-paper p-6 transition hover:border-ink/30"
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${c.accent}`}>
                {c.name}
              </span>
              <p className="mt-4 text-sm text-ink/65">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-ink underline decoration-brass/60 underline-offset-4 group-hover:text-brass">
                Browse shelf →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
