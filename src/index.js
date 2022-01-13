import 'express-async-errors';
import HttpError from './HttpError';
import Errors from './errors';
import Messages from './messages';

const errorHandler = callback => (error, req, res, next) => {
  if (res.headersSent) return next(error);
  const { status = 500, code, message } = error;
  const isHttp = error instanceof HttpError;

  // Notify the client about the error. For security reasons, hide details if not HttpError
  res.status(status).send({ status, code, message: isHttp ? message : Messages.INTERNAL_SERVER });

  // Call callback if provided
  callback?.(error, req, res);
};

const Guards = {
  NotFound: msg => () => { throw Errors.NotFound(msg) },
  MethodNotAllowed: msg => () => { throw Errors.MethodNotAllowed(msg); },
};

export default errorHandler;
export { HttpError, Errors, Guards };
