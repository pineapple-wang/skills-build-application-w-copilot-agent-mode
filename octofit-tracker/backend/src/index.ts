import { startServer } from './server';

startServer().catch((error) => {
  console.error('MongoDB connection failed', error);
  process.exit(1);
});
