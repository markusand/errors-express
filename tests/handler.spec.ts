import type { Request, Response, NextFunction } from 'express';
import handler from '../src/handler';
import HttpError from '../src/HttpError';
import Messages from '../src/messages';

const call = () => {
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const req = {} as unknown as Request;
  const res = { status, send } as unknown as Response;
  const next = jest.fn() as NextFunction;
  return { send, status, req, res, next };
};

describe('handler', () => {
  it('should not handle error if response has already been sent', () => {
    const { status, req, res, next } = call();
    res.headersSent = true;
    const error = new Error('Error');
    handler()(error, req, res, next);
    expect(status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should handle error with normal Error', () => {
    const { send, status, req, res, next } = call();
    const error = new Error('Error message to strip');
    handler()(error, req, res, next);
    expect(status).toHaveBeenCalledWith(500);
    expect(send).toHaveBeenCalledWith({
      status: 500,
      code: 'INTERNAL_ERROR',
      message: Messages.INTERNAL_SERVER,
    });
  });

  it('should handle error with HttpError', () => {
    const { send, status, req, res, next } = call();
    const error = new HttpError(404, 'Not found', 'NOT_FOUND');
    handler()(error, req, res, next);
    expect(status).toHaveBeenCalledWith(404);
    expect(send).toHaveBeenCalledWith({
      status: 404,
      code: 'NOT_FOUND',
      message: 'Not found',
    });
  });

  it('should handle error and call callback', () => {
    const { status, req, res, next } = call();
    const error = new HttpError(404, 'Not found', 'NOT_FOUND');
    const callback = jest.fn();
    handler(callback)(error, req, res, next);
    expect(status).toHaveBeenCalledWith(404);
    expect(callback).toHaveBeenCalledWith(error, req, res);
  });
});
