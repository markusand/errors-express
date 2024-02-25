export type ErrorDetails = Array<{
  code: string;
  message: string;
  ctx?: Record<string, any>;
}>;

export default class HttpError extends Error {
  public readonly status: number;
  public readonly code: string | undefined;
  public readonly details: ErrorDetails | undefined;
  public readonly timestamp: number;

  constructor(status = 400, message = 'Error', details?: ErrorDetails | string) {
    super(message);
    this.status = status;
    this.timestamp = Date.now();
    if (typeof details === 'string') this.code = details;
    else this.details = details;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace?.(this, HttpError);
  }
}
