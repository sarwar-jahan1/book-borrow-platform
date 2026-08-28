import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Please log in to borrow a book." }, { status: 401 });
  }

  const { bookId, title } = await request.json();

  if (!bookId) {
    return NextResponse.json({ message: "bookId is required." }, { status: 400 });
  }

  // In a full build this would decrement available_quantity in MongoDB
  // and record a loan against session.user.id. Kept as a confirmation
  // stub here since the assignment brief only asks for the toast.
  return NextResponse.json({
    message: `"${title}" has been borrowed successfully.`,
  });
}
