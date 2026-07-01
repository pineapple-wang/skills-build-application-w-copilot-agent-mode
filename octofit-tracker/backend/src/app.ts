import express from 'express';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

export const getApiBaseUrl = (port = Number(process.env.PORT || 8000)) => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
};

const app = express();

app.use(express.json());
app.locals.baseUrl = getApiBaseUrl();

const sendHealthResponse = (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl: app.locals.baseUrl,
  });
};

app.get('/', sendHealthResponse);
app.get('/api/health', sendHealthResponse);
app.get('/health', sendHealthResponse);

const createCollectionRoute = (model: any, resource: string) => {
  return async (_req: express.Request, res: express.Response) => {
    const items = await model.find({});
    res.json({
      resource,
      message: `${resource} endpoint ready`,
      items,
    });
  };
};

app.get('/api/users/', createCollectionRoute(User, 'users'));
app.get('/api/teams/', createCollectionRoute(Team, 'teams'));
app.get('/api/activities/', createCollectionRoute(Activity, 'activities'));
app.get('/api/leaderboard/', createCollectionRoute(Leaderboard, 'leaderboard'));
app.get('/api/workouts/', createCollectionRoute(Workout, 'workouts'));

export default app;
