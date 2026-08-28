"use client";

const categories = ["All", "Story", "Tech", "Science"];

export default function CategorySidebar({ active, onChange, counts }) {
  return (
    <aside className="h-max rounded-sm border border-ink/10 bg-paper p-5 md:sticky md:top-24">
      <h3 className="font-display text-sm uppercase tracking-[0.18em] text-brass">
        Shelves
      </h3>
      <ul className="mt-4 space-y-1.5">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onChange(cat)}
              className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition ${
                active === cat
                  ? "bg-ink text-paper"
                  : "text-ink/75 hover:bg-paper-2"
              }`}
            >
              <span>{cat}</span>
              <span className="text-xs opacity-60">{counts[cat] ?? 0}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
