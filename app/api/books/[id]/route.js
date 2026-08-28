import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(_request, { params }) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
