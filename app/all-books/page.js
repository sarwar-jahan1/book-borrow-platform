"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/CategorySidebar";

function AllBooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const counts = useMemo(() => {
    const c = { All: books.length, Story: 0, Tech: 0, Science: 0 };
    books.forEach((b) => {
      c[b.category] = (c[b.category] || 0) + 1;
    });
    return c;
  }, [books]);

  const filtered = books.filter((b) => {
    const matchesCategory = category === "All" || b.category === category;
    const matchesQuery = b.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">Catalog</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">All Books</h1>

        <div className="relative mt-6 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by title…"
            className="w-full rounded-full border border-ink/15 bg-paper py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brass"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <CategorySidebar active={category} onChange={setCategory} counts={counts} />

        <div>
          {loading ? (
            <p className="text-sm text-ink/60">Loading the shelves…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-ink/60">No books match your search on this shelf.</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} ctaLabel="Details" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-ink/60">Loading…</div>}>
      <AllBooksContent />
    </Suspense>
  );
}
