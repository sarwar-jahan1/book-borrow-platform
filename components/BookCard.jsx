import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book, ctaLabel = "View Details" }) {
  const outOfStock = book.available_quantity <= 0;

  return (
    <div className="catalog-card flex h-full flex-col rounded-sm p-4">
      <div className="relative mb-4 aspect-[5/7] w-full overflow-hidden rounded-sm bg-paper-2">
        <Image
          src={book.image_url}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover"
        />
        <span
          className={`stamp absolute right-2 top-2 bg-paper/90 text-[10px] ${
            outOfStock ? "text-rust" : "text-sage"
          }`}
        >
          {outOfStock ? "None left" : `${book.available_quantity} left`}
        </span>
      </div>

      <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-brass">
        {book.category}
      </span>
      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
        {book.title}
      </h3>
      <p className="mt-1 text-sm text-ink/60">by {book.author}</p>

      <Link
        href={`/books/${book.id}`}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-ink/20 py-2 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
