import HttpError from './HttpError';
import Message from './messages';

export default {
  BadRequest: (msg = Message.BAD_REQUEST, code?: string) => new HttpError(400, msg, code),
  Unauthorized: (msg = Message.UNAUTHORIZED, code?: string) => new HttpError(401, msg, code),
  Forbidden: (msg = Message.FORBIDDEN, code?: string) => new HttpError(403, msg, code),
  NotFound: (msg = Message.NOT_FOUND, code?: string) => new HttpError(404, msg, code),
  MethodNotAllowed: (msg = Message.METHOD_NOT_ALLOWED, code?: string) => new HttpError(405, msg, code),
  Conflict: (msg = Message.CONFLICT, code?: string) => new HttpError(409, msg, code),
  Unprocessable: (msg = Message.UNPROCESSABLE, code?: string) => new HttpError(422, msg, code),
  TooManyRequests: (msg = Message.TOO_MANY_REQUESTS, code?: string) => new HttpError(429, msg, code),
  InternalServer: (msg = Message.INTERNAL_SERVER, code?: string) => new HttpError(500, msg, code),
};
