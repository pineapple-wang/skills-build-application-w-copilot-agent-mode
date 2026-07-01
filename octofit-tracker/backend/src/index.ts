import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

const sendHealthResponse = (_req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
};

app.get('/', sendHealthResponse);
app.get('/api/health', sendHealthResponse);
app.get('/health', sendHealthResponse);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
