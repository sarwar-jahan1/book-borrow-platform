import books from "@/data/books.json";

export default function Marquee() {
  const items = [
    `New Arrivals: ${books[0].title} by ${books[0].author}`,
    `New Arrivals: ${books[3].title} by ${books[3].author}`,
    "Special Discount on Annual Memberships — 20% off this month",
    `Just In: ${books[7].title} by ${books[7].author}`,
    "Borrow up to 3 books at once with a free membership",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink/15 bg-ink py-2.5">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span
            key={i}
            className="mx-6 flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-sm text-paper/85"
          >
            <span className="text-brass">&#10022;</span> {text}
          </span>
        ))}
      </div>
    </div>
  );
}
