"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

function BookDetailsContent({ id }) {
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(setBook)
      .catch(() => setNotFound(true));
  }, [id]);

  const handleBorrow = async () => {
    setBorrowing(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id, title: book.title }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setBorrowing(false);
    }
  };

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-ink/70">This title isn't in the catalog.</p>
        <Link href="/all-books" className="mt-4 inline-block text-brass underline">
          Back to All Books
        </Link>
      </div>
    );
  }

  if (!book) {
    return <div className="mx-auto max-w-3xl px-5 py-20 text-center text-ink/60">Fetching the ledger entry…</div>;
  }

  const outOfStock = book.available_quantity <= 0;

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/all-books" className="mb-8 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft size={16} /> Back to all books
      </Link>

      <div className="grid gap-10 md:grid-cols-[340px_1fr]">
        <div className="relative aspect-[5/7] w-full overflow-hidden rounded-sm border border-ink/10 shadow-lg">
          <Image src={book.image_url} alt={`Cover of ${book.title}`} fill sizes="340px" className="object-cover" />
        </div>

        <div>
          <span className="stamp text-xs text-brass">{book.category}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">{book.title}</h1>
          <p className="mt-2 text-ink/60">by {book.author}</p>

          <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">{book.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                outOfStock ? "bg-rust/10 text-rust" : "bg-sage/10 text-sage"
              }`}
            >
              {outOfStock ? "No copies left" : `${book.available_quantity} copies left`}
            </span>
          </div>

          <button
            onClick={handleBorrow}
            disabled={outOfStock || borrowing}
            className="mt-8 rounded-full bg-ink px-8 py-3 text-sm font-semibold text-paper transition hover:bg-brass disabled:cursor-not-allowed disabled:opacity-40"
          >
            {outOfStock ? "Currently Unavailable" : borrowing ? "Borrowing…" : "Borrow This Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage({ params }) {
  const { id } = use(params);
  return (
    <AuthGuard>
      <BookDetailsContent id={id} />
    </AuthGuard>
  );
}
