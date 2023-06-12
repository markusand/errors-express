export default class HttpError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly timestamp: number;

  constructor(status = 400, message = 'Error', code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = Date.now();

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace?.(this, HttpError);
  }
}
