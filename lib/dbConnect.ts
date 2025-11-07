import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const globalWithCache = globalThis as typeof globalThis & {
  mongooseConnection?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

export default async function dbConnect() {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  globalWithCache.mongooseConnection ??= { conn: null, promise: null };

  if (globalWithCache.mongooseConnection.conn) {
    return globalWithCache.mongooseConnection.conn;
  }

  globalWithCache.mongooseConnection.promise ??= mongoose.connect(mongodbUri, {
    bufferCommands: false
  });

  globalWithCache.mongooseConnection.conn = await globalWithCache.mongooseConnection.promise;
  return globalWithCache.mongooseConnection.conn;
}
