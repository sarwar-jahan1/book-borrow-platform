import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// The MongoDB driver auto-connects lazily on first command, so we can hand
// the adapter a `Db` instance synchronously without a top-level await. This
// keeps route/config collection working even when no database is reachable
// yet (e.g. during a build step), while still connecting for real at request time.
const mongoClient = new MongoClient(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book_borrow_platform"
);
const db = mongoClient.db(process.env.MONGODB_DB || "book_borrow_platform");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },
});
