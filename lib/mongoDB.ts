// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("Please add MONGODB_URI in .env file");
// }

// // ✅ DATABASE NAME
// const DB_NAME = "city_clinics_db";

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }

//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// // ✅ CONNECT FUNCTION (NAMED EXPORT)
// export async function connectDB() {
//   const client = await clientPromise;

//   const db = client.db(DB_NAME);

//   return {
//     db,

//     // ✅ COLLECTION NAME
//     reportsCollection: db.collection("reports"),
//   };
// }


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Please add MONGODB_URI in .env.local file");
}


const DB_NAME = "Dashboard";


type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as GlobalWithMongo;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// 🚀 MAIN CONNECT FUNCTION
export async function connectDB() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return {
    db,
    reportsCollection: db.collection("report"),
    templatesCollection: db.collection("templates"),
  };
}