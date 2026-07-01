import app from './app';
import { connectToDatabase } from './config/database';

export const getApiBaseUrl = (port = Number(process.env.PORT || 8000)) => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
};

export const startServer = async () => {
  const port = Number(process.env.PORT || 8000);
  const baseUrl = getApiBaseUrl(port);

  app.locals.baseUrl = baseUrl;
  console.log(`API base URL: ${baseUrl}`);

  await connectToDatabase();
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};
