import Errors from './errors';

export const NotFound = (msg?: string) => () => {
  throw Errors.NotFound(msg);
};

export const MethodNotAllowed = (msg?: string) => () => {
  throw Errors.MethodNotAllowed(msg);
};
