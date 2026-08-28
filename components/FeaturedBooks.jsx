import books from "@/data/books.json";
import BookCard from "./BookCard";

export default function FeaturedBooks() {
  const featured = books.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">
        This week's picks
      </span>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Featured Books</h2>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {featured.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
