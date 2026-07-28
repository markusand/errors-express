import type { Request, Response, NextFunction } from 'express';
import type HttpError from './HttpError';

type Constructor = new (...args: never[]) => Error;
type Factory = (error: Error) => HttpError;
type Handler<T> = (req: T, res: Response, next: NextFunction) => Promise<void>;

export default (mappings: [Constructor, HttpError | Factory][]) => (
  <Req extends Request = Request>(handler: Handler<Req>) => (
    async (req: Req, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        if (!(error instanceof Error)) return next(error);
        const [, handle] = mappings.find(([type]) => error instanceof type) ?? [];
        const factory = typeof handle === 'function' ? handle : () => handle;
        next(factory?.(error) ?? error);
      }
    }
  )
);
