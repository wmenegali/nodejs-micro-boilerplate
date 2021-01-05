import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  process.env.JWT_KEY = 'testing-key';

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// global function for not having to import on every test file. Only available on test env;
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await request(app).post(`/api/users/signup`).send({ email: 'test@test.com', password: 'password' }).expect(201);
  const cookie = response.get('Set-Cookie');

  return cookie;
};