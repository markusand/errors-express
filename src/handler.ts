import type { NextFunction, Request, Response } from 'express';
import HttpError from './HttpError';
import Messages from './messages';

type ErrorAdapter = (error: Error) => HttpError | undefined;
type ErrorHandlerCallback = (error: Error | HttpError, req: Request, res: Response) => void;

interface ErrorHandlerOptions {
  adapters?: ErrorAdapter[];
  callback?: ErrorHandlerCallback;
}

export default (options: ErrorHandlerOptions | ErrorHandlerCallback = {}) => {
  const { adapters = [], callback } = typeof options === 'function'
    ? { adapters: [], callback: options }
    : options;

  return (error: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(error);

    const httpError = error instanceof HttpError
      ? error
      : adapters.reduce<HttpError | undefined>((acc, adapt) => acc ?? adapt(error), undefined);

    // Notify the client about the error. For security reasons, hide details if not HttpError
    const { status, code, details, message } = httpError ?? {
      status: 500,
      code: 'INTERNAL_ERROR',
      message: Messages.INTERNAL_SERVER,
      details: undefined,
    };

    res.status(status).send({ status, code, message, details });

    return callback?.(error, req, res);
  };
};
