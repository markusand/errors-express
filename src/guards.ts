import type { Request, Response, NextFunction } from 'express';
import Errors from './errors';
import { getPathMethods } from './utils';

export const NotFound = (msg?: string) => () => {
  throw Errors.NotFound(msg);
};

export const MethodNotAllowed = (msg?: string) => (
  (req: Request, res: Response, next: NextFunction) => {
    const methods = getPathMethods(req.path, req.app._router.stack);
    if (methods.length && !methods.includes(req.method.toLowerCase())) {
      res.set('Allow', methods.join(', ').toUpperCase());
      throw Errors.MethodNotAllowed(msg);
    }
    next();
  }
);
