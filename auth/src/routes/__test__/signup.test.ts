import request from 'supertest';
import { app } from '../../app';

const makeRequest = async (params: any, status: number) => request(app).post('/api/users/signup').send(params).expect(status);

it('returns a 201 on successful signup', async () =>
  makeRequest({
    email: 'test@test.com',
    password: 'password'
  }, 201));

it('returns a 400 with invalid email', async () =>
  makeRequest({
    email: 'testtestasda',
    password: 'password'
  }, 400));

it('returns a 400 with invalid password', async () =>
  makeRequest({
    email: 'testtestasda',
    password: 'p'
  }, 400));

it('returns a 400 with missing email', async () =>
  makeRequest({
    password: 'password'
  }, 400));

it('returns a 400 with missing password', async () =>
  makeRequest({
    email: 'test@test.com',
  }, 400));

it('disallows duplicate emails', async () => {
  await makeRequest({
    email: 'test@test.com',
    password: 'password'
  }, 201);

  await makeRequest({
    email: 'test@test.com',
    password: 'password'
  }, 400);
});

it('sets a cookie after successful signup', async () => {
  const response = await makeRequest({
    email: 'test@test.com',
    password: 'password'
  }, 201);

  expect(response.get('Set-Cookie')).toBeDefined();
});