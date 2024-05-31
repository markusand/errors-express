import HttpError, { type ErrorDetails } from './HttpError';
import Message from './messages';

export default {
  BadRequest: (
    msg = Message.BAD_REQUEST,
    details: ErrorDetails = 'BAD_REQUEST',
  ) => new HttpError(400, msg, details),

  Unauthorized: (
    msg = Message.UNAUTHORIZED,
    details: ErrorDetails = 'UNAUTHORIZED',
  ) => new HttpError(401, msg, details),

  Forbidden: (
    msg = Message.FORBIDDEN,
    details: ErrorDetails = 'FORBIDDEN',
  ) => new HttpError(403, msg, details),

  NotFound: (
    msg = Message.NOT_FOUND,
    details: ErrorDetails = 'NOT_FOUND',
  ) => new HttpError(404, msg, details),

  MethodNotAllowed: (
    msg = Message.METHOD_NOT_ALLOWED,
    details: ErrorDetails = 'METHOD_NOT_ALLOWED',
  ) => new HttpError(405, msg, details),

  Conflict: (
    msg = Message.CONFLICT,
    details: ErrorDetails = 'CONFLICT',
  ) => new HttpError(409, msg, details),

  Unprocessable: (
    msg = Message.UNPROCESSABLE,
    details: ErrorDetails = 'UNPROCESSABLE',
  ) => new HttpError(422, msg, details),

  TooManyRequests: (
    msg = Message.TOO_MANY_REQUESTS,
    details: ErrorDetails = 'TOO_MANY_REQUESTS',
  ) => new HttpError(429, msg, details),

  InternalServer: (
    msg = Message.INTERNAL_SERVER,
    details: ErrorDetails = 'INTERNAL_SERVER',
  ) => new HttpError(500, msg, details),
};
