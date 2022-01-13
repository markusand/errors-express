export default class HttpError extends Error {
  constructor(status = 400, message = 'Error', code) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = Date.now();

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace?.(this, HttpError);
  }
}
