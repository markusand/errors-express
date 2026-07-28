import type { NextFunction, Request, Response } from 'express';
import HttpError from './HttpError';
import Messages from './messages';

type ErrorHandlerCallback = (error: Error | HttpError, req: Request, res: Response) => void;

export default (callback?: ErrorHandlerCallback) => (
  (error: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(error);

    // Notify the client about the error. For security reasons, hide details if not HttpError
    const { status, code, details, message } = error instanceof HttpError
      ? error
      : {
        status: 500,
        code: 'INTERNAL_ERROR',
        message: Messages.INTERNAL_SERVER,
        details: undefined,
      };

    res.status(status).send({ status, code, message, details });

    return callback?.(error, req, res);
  }
);
