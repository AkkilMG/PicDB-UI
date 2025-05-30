// lib/mongoConnect.ts
import { MongoClient } from 'mongodb';
import { MONGODB_DB, MONGODB_URI } from '@/config/env.config';

const uri = MONGODB_URI as string;
const dbName = MONGODB_DB as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please add your Mongo DB Name to .env.local');
}

declare global {
  // Prevent multiple instances of MongoClient during hot reloading in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// if (NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
// }

export async function getMongoClient() {
  const client = await clientPromise;
  return client.db(dbName);
}