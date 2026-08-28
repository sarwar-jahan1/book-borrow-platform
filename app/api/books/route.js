import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET() {
  // Served from local JSON, as allowed by the assignment brief.
  // Swap this for a MongoDB collection query if you'd rather manage
  // books from a database.
  return NextResponse.json(books);
}
