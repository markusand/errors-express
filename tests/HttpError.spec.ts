import HttpError, { type ErrorDetails } from '../src/HttpError';

type ErrorDetail = Exclude<ErrorDetails, string>[number];

describe('HttpError', () => {
  it('should create a default HttpError', () => {
    const error = new HttpError();
    expect(error.status).toBe(400);
    expect(error.code).toBeUndefined();
    expect(error.message).toBe('Error');
  });

  it('should create a custom HttpError', () => {
    const error = new HttpError(404, 'Not found', 'NOT_FOUND');
    expect(error.status).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Not found');
  });

  it('should keep error stack', () => {
    const error = new HttpError();
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('HttpError.spec.ts');
  });

  it('should have error details', () => {
    const details = [{
      code: 'invalid_type',
      path: 'email',
      message: 'Invalid email address',
    }];
    const error = new HttpError(422, 'Unprocessable entity', details);
    expect(error.details).toBeDefined();
    expect((error.details?.[0] as ErrorDetail).code).toBe('invalid_type');
  });
});
