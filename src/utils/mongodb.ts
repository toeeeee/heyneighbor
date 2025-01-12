import mongoose from "mongoose";

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

export const connectMongo = async () => {
    if (cached.conn) return cached.conn;
    cached.conn = await mongoose.connect(MONGO_URI);
    return cached.conn;
};



// maybe 

// declare global {
//     var mongoose: {
//       conn: typeof mongoose | null
//       promise: Promise<typeof mongoose> | null
//     }
//   }
  
//   if (!process.env.MONGO_URI) {
//     throw new Error('Please add your MongoDB URI to .env.local')
//   }
  
//   let cached = global.mongoose
  
//   if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
//   }
//
// export async function connectMongo() {
//     if (cached.conn) {
//       return cached.conn
//     }
  
//     if (!cached.promise) {
//       const opts = {
//         bufferCommands: false,
//       }
  
//       cached.promise = mongoose.connect(process.env.MONGO_URI!, opts).then((mongoose) => {
//         return mongoose
//       })
//     }
    
//     try {
//       cached.conn = await cached.promise
//     } catch (e) {
//       cached.promise = null
//       throw e
//     }
  
//     return cached.conn
//   }