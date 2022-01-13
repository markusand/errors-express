import HttpError from './HttpError.js';
import Message from './messages.js';

export default {
  BadRequest: (msg = Message.BAD_REQUEST, code) => new HttpError(400, msg, code),
  Unauthorized: (msg = Message.UNAUTHORIZED, code) => new HttpError(401, msg, code),
  Forbidden: (msg = Message.FORBIDDEN, code) => new HttpError(403, msg, code),
  NotFound: (msg = Message.NOT_FOUND, code) => new HttpError(404, msg, code),
  MethodNotAllowed: (msg = Message.METHOD_NOT_ALLOWED, code) => new HttpError(405, msg, code),
  Conflict: (msg = Message.CONFLICT, code) => new HttpError(409, msg, code),
  Unprocessable: (msg = Message.UNPROCESSABLE, code) => new HttpError(422, msg, code),
  TooManyRequests: (msg = Message.TOO_MANY_REQUESTS, code) => new HttpError(429, msg, code),
  InternalServer: (msg = Message.INTERNAL_SERVER, code) => new HttpError(500, msg, code),
};
