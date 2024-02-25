import HttpError, { type ErrorDetails } from './HttpError';
import Message from './messages';

type Details = ErrorDetails | string;

export default {
  BadRequest: (msg = Message.BAD_REQUEST, details?: Details) => new HttpError(400, msg, details),
  Unauthorized: (msg = Message.UNAUTHORIZED, details?: Details) => new HttpError(401, msg, details),
  Forbidden: (msg = Message.FORBIDDEN, details?: Details) => new HttpError(403, msg, details),
  NotFound: (msg = Message.NOT_FOUND, details?: Details) => new HttpError(404, msg, details),
  MethodNotAllowed: (msg = Message.METHOD_NOT_ALLOWED, details?: Details) => new HttpError(405, msg, details),
  Conflict: (msg = Message.CONFLICT, details?: Details) => new HttpError(409, msg, details),
  Unprocessable: (msg = Message.UNPROCESSABLE, details?: Details) => new HttpError(422, msg, details),
  TooManyRequests: (msg = Message.TOO_MANY_REQUESTS, details?: Details) => new HttpError(429, msg, details),
  InternalServer: (msg = Message.INTERNAL_SERVER, details?: Details) => new HttpError(500, msg, details),
};
