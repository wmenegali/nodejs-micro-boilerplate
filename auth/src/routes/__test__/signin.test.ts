import request from 'supertest';
import { app } from '../../app';

const makeRequest = async (params: any, status: number, path?: string) => request(app).post(`/api/users/${path || 'signin'}`).send(params).expect(status);

it('fails when an email that doesnt exist is supplied', async () =>
  makeRequest({ email: 'test@test.com', password: 'password ' }, 400));

it('fails when an incorrect password is supplied', async () => {
  await makeRequest({ email: 'test@test.com', password: 'password' }, 201, 'signup');
  await makeRequest({ email: 'test@test.com', password: 'passdkmf' }, 400);
});

it('responds with a cookie when request is successful', async () => {
  await makeRequest({ email: 'test@test.com', password: 'password' }, 201, 'signup');
  const response = await makeRequest({ email: 'test@test.com', password: 'password' }, 200);
  expect(response.get('Set-Cookie')).toBeDefined();
});