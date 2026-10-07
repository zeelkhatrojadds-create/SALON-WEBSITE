import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let mongod = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/glam_girl_by_janki';

    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 2000
      });
      console.log(`MongoDB Connected: ${conn.connection.host} / DB: ${conn.connection.name}`);
      return conn;
    } catch (localErr) {
      console.log(`Local MongoDB unavailable at ${mongoUri}. Launching isolated MongoMemoryServer instance...`);
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`MongoMemoryServer Connected: ${conn.connection.host} / DB: ${conn.connection.name}`);
      return conn;
    }
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};

export default connectDB;
