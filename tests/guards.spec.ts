import type { Request, Response, NextFunction } from 'express';
import * as Guards from '../src/guards';
import messages from '../src/messages';
import { createReq } from './__mocks__';

describe('Guards', () => {
  it('should throw 404 error', () => {
    const guard = Guards.NotFound();
    expect(() => guard()).toThrow(messages.NOT_FOUND);
  });

  it('should throw custom 404 error', () => {
    const guard = Guards.NotFound('Not found');
    expect(() => guard()).toThrow('Not found');
  });

  it('should throw 405 error', () => {
    const guard = Guards.MethodNotAllowed();
    const req = createReq('/resource1', 'PUT') as unknown as Request;
    const res = { set: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    expect(() => guard(req, res, next)).toThrow(messages.METHOD_NOT_ALLOWED);
    expect(res.set).toHaveBeenCalledWith('Allow', 'GET, POST');
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw custom 405 error', () => {
    const guard = Guards.MethodNotAllowed('Method not allowed');
    const req = createReq('/resource2', 'PUT') as unknown as Request;
    const res = { set: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    expect(() => guard(req, res, next)).toThrow('Method not allowed');
    expect(res.set).toHaveBeenCalledWith('Allow', 'GET');
    expect(next).not.toHaveBeenCalled();
  });

  it('should skip 405 error if path has not handlers', () => {
    const guard = Guards.MethodNotAllowed();
    const req = createReq('/resource', 'GET') as unknown as Request;
    const res = { set: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;
    expect(() => guard(req, res, next)).not.toThrow();
    expect(res.set).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
