import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book_borrow_platform";

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse the client across hot reloads in development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(process.env.MONGODB_DB || "book_borrow_platform");
}
