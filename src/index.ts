import 'express-async-errors';
import HttpError from './HttpError';
import Errors from './errors';
import Messages from './messages';
import errorHandler from './handler';

const Guards = {
  NotFound: (msg?: string) => () => { throw Errors.NotFound(msg) },
  MethodNotAllowed: (msg?: string) => () => { throw Errors.MethodNotAllowed(msg); },
};

export default errorHandler;
export { HttpError, Errors, Guards, Messages };
