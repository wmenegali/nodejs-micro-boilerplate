import request from 'supertest';
import { app } from '../../app';

const makeRequest = async (params: any, status: number, path?: string) => request(app).post(`/api/users/${path || 'signout'}`).send(params).expect(status);

it('clears the cookie after signing out', async () => {
  await makeRequest({ email: 'test@test.com', password: 'password' }, 201, 'signup');
  const response = await makeRequest({ email: 'test@test.com', password: 'password' }, 200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});