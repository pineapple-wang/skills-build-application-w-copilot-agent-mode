import app, { getApiBaseUrl } from './app';
import { connectToDatabase } from './config/database';

const port = Number(process.env.PORT || 8000);
const baseUrl = getApiBaseUrl(port);

app.locals.baseUrl = baseUrl;

console.log(`API base URL: ${baseUrl}`);

connectToDatabase()
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
