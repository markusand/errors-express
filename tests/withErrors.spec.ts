import Errors from '../src/errors';
import withErrors from '../src/with-errors';
import { call } from './__mocks__';

describe('withErrors', () => {
  it('should map to a static HttpError', async () => {
    const { req, res, next } = call();
    const wrap = withErrors([[Error, Errors.NotFound('User not found')]]);
    await wrap(async () => { throw new Error('oops'); })(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 404, message: 'User not found' }));
  });

  it('should map using a factory that receives the original error', async () => {
    const { req, res, next } = call();
    const wrap = withErrors([[Error, e => Errors.Unprocessable(e.message)]]);
    await wrap(async () => { throw new Error('bad email'); })(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 422, message: 'bad email' }));
  });

  it('should pass error through unchanged when no mapping matches', async () => {
    class CustomError extends Error {}
    class OtherError extends Error {}
    const { req, res, next } = call();
    const wrap = withErrors([[OtherError, Errors.NotFound()]]);
    await wrap(async () => { throw new CustomError('unmatched'); })(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
  });

  it('should match the first mapping in registration order', async () => {
    class AppError extends Error {}
    class LibError extends Error {}
    const { req, res, next } = call();
    const wrap = withErrors([
      [LibError, Errors.Unprocessable()],
      [AppError, Errors.BadRequest()],
      [Error, Errors.InternalServer()],
    ]);
    await wrap(async () => { throw new AppError('x'); })(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
  });

  it('should match subclass errors against a parent class mapping', async () => {
    class GenericError extends Error {}
    class SpecificError extends GenericError {}
    const { req, res, next } = call();
    const wrap = withErrors([[GenericError, e => Errors.BadRequest(e.message)]]);
    await wrap(async () => { throw new SpecificError('specific'); })(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400, message: 'specific' }));
  });

  it('should forward non-Error throws directly to next', async () => {
    const { req, res, next } = call();
    const wrap = withErrors([[Error, Errors.BadRequest()]]);
    await wrap(async () => { throw 'string error'; })(req, res, next);
    expect(next).toHaveBeenCalledWith('string error');
  });

  it('should not call next when handler succeeds', async () => {
    const { req, res, next } = call();
    const wrap = withErrors([[Error, Errors.BadRequest()]]);
    await wrap(async () => {})(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it('should reuse the same wrapper across multiple handlers', async () => {
    class AppError extends Error {}
    const wrap = withErrors([[AppError, Errors.Forbidden()]]);

    const call1 = call();
    await wrap(async () => { throw new AppError('a'); })(call1.req, call1.res, call1.next);
    expect(call1.next).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }));

    const call2 = call();
    await wrap(async () => { throw new AppError('b'); })(call2.req, call2.res, call2.next);
    expect(call2.next).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }));
  });
});
