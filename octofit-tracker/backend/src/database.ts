import mongoose from 'mongoose';

export const getMongoUrl = () => process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(getMongoUrl(), {
    serverSelectionTimeoutMS: 10000,
  });

  return mongoose.connection;
};
