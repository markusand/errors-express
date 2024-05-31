import type { Request, Response, NextFunction } from 'express';
import Errors from './errors';
import { getPathMethods } from './utils';
import type { ErrorDetails } from './HttpError';

export const NotFound = (msg?: string, details?: ErrorDetails) => () => {
  throw Errors.NotFound(msg, details);
};

export const MethodNotAllowed = (msg?: string, details?: ErrorDetails) => (
  (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-underscore-dangle
    const methods = getPathMethods(req.path, req.app._router.stack);
    if (methods.length && !methods.includes(req.method.toLowerCase())) {
      res.set('Allow', methods.join(', ').toUpperCase());
      throw Errors.MethodNotAllowed(msg, details);
    }
    next();
  }
);
