import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';


/**
 * Middleware responsible for keeping error reporting standardized
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    message: [{ message: err.message }],
  });
};