import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// behind the proxy of nginx
app.set('trust proxy', true);
app.use(json());

/**
 * Cookies are not signed to avoid complications when handling them
 * in different languages that other microservices might be written in.
 * As a best practice, sensitive information should never be stored in a cookie.
 */
app.use(cookieSession({
  signed: false,
  secure: true,
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");

  } catch (err) {
    console.error(err);
  } finally {
    app.listen(3000, () => {
      console.log('Listening on 3000!!!!')
    });
  }
};

start();