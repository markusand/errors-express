import Errors from '../src/errors';
import Messages from '../src/messages';

describe('Errors', () => {
  it('should return 400 error', () => {
    const error = Errors.BadRequest();
    expect(error.status).toBe(400);
    expect(error.message).toBe(Messages.BAD_REQUEST);

    const error2 = Errors.BadRequest('Bad request', 'BAD_REQUEST');
    expect(error2.status).toBe(400);
    expect(error2.message).toBe('Bad request');
    expect(error2.code).toBe('BAD_REQUEST');
  });

  it('should return 401 error', () => {
    const error = Errors.Unauthorized();
    expect(error.status).toBe(401);
    expect(error.message).toBe(Messages.UNAUTHORIZED);

    const error2 = Errors.Unauthorized('Unauthorized', 'UNAUTHORIZED');
    expect(error2.status).toBe(401);
    expect(error2.message).toBe('Unauthorized');
    expect(error2.code).toBe('UNAUTHORIZED');
  });

  it('should return 403 error', () => {
    const error = Errors.Forbidden();
    expect(error.status).toBe(403);
    expect(error.message).toBe(Messages.FORBIDDEN);

    const error2 = Errors.Forbidden('Forbidden', 'FORBIDDEN');
    expect(error2.status).toBe(403);
    expect(error2.message).toBe('Forbidden');
    expect(error2.code).toBe('FORBIDDEN');
  });

  it('should return 404 error', () => {
    const error = Errors.NotFound();
    expect(error.status).toBe(404);
    expect(error.message).toBe(Messages.NOT_FOUND);

    const error2 = Errors.NotFound('Not found', 'NOT_FOUND');
    expect(error2.status).toBe(404);
    expect(error2.message).toBe('Not found');
    expect(error2.code).toBe('NOT_FOUND');
  });

  it('should return 405 error', () => {
    const error = Errors.MethodNotAllowed();
    expect(error.status).toBe(405);
    expect(error.message).toBe(Messages.METHOD_NOT_ALLOWED);

    const error2 = Errors.MethodNotAllowed('Method not allowed', 'METHOD_NOT_ALLOWED');
    expect(error2.status).toBe(405);
    expect(error2.message).toBe('Method not allowed');
    expect(error2.code).toBe('METHOD_NOT_ALLOWED');
  });

  it('should return 409 error', () => {
    const error = Errors.Conflict();
    expect(error.status).toBe(409);
    expect(error.message).toBe(Messages.CONFLICT);

    const error2 = Errors.Conflict('Conflict', 'CONFLICT');
    expect(error2.status).toBe(409);
    expect(error2.message).toBe('Conflict');
    expect(error2.code).toBe('CONFLICT');
  });

  it('should return 422 error', () => {
    const error = Errors.Unprocessable();
    expect(error.status).toBe(422);
    expect(error.message).toBe(Messages.UNPROCESSABLE);

    const error2 = Errors.Unprocessable('Unprocessable', 'UNPROCESSABLE');
    expect(error2.status).toBe(422);
    expect(error2.message).toBe('Unprocessable');
    expect(error2.code).toBe('UNPROCESSABLE');
  });

  it('should return 429 error', () => {
    const error = Errors.TooManyRequests();
    expect(error.status).toBe(429);
    expect(error.message).toBe(Messages.TOO_MANY_REQUESTS);

    const error2 = Errors.TooManyRequests('Too many requests', 'TOO_MANY_REQUESTS');
    expect(error2.status).toBe(429);
    expect(error2.message).toBe('Too many requests');
    expect(error2.code).toBe('TOO_MANY_REQUESTS');
  });

  it('should return 500 error', () => {
    const error = Errors.InternalServer();
    expect(error.status).toBe(500);
    expect(error.message).toBe(Messages.INTERNAL_SERVER);

    const error2 = Errors.InternalServer('Internal server error', 'INTERNAL_SERVER');
    expect(error2.status).toBe(500);
    expect(error2.message).toBe('Internal server error');
    expect(error2.code).toBe('INTERNAL_SERVER');
  });
});
