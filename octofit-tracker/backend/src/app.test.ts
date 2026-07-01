import request from 'supertest';
import app from './app';

describe('OctoFit API routes', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', service: 'octofit-backend' });
  });

  it('returns users collection payload', async () => {
    const response = await request(app).get('/api/users/');

    expect(response.status).toBe(200);
    expect(response.body.resource).toBe('users');
  });
});
