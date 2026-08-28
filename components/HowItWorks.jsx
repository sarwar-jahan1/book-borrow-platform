import { Search, BookMarked, Clock3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search the catalog",
    desc: "Browse by category or search by title to find something worth staying up for.",
  },
  {
    icon: BookMarked,
    title: "Reserve your copy",
    desc: "Sign in and borrow instantly — no queues, no waiting for a shelf slot to open up.",
  },
  {
    icon: Clock3,
    title: "Read at your pace",
    desc: "Keep it as long as your membership allows, then return it for the next reader.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">
            How borrowing works
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Three steps, no library card required
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="catalog-card rounded-sm p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
              <Icon size={18} />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-ink/65">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
