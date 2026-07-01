import mongoose from 'mongoose';

let connectionPromise: Promise<typeof mongoose> | null = null;

export const getMongoUrl = () => process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    mongoose.set('strictQuery', false);
    connectionPromise = mongoose.connect(getMongoUrl(), {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    await connectionPromise;
    return mongoose.connection;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};
