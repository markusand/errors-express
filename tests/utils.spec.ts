import type { Request } from 'express';
import { getPathMethods } from '../src/utils';
import { createReq } from './__mocks__';

describe('Utils', () => {
  it('should get all path methods', () => {
    const req = createReq('', '') as unknown as Request;
    // eslint-disable-next-line no-underscore-dangle
    const methods = getPathMethods('/resource1', req.app._router.stack);
    expect(methods).toEqual(['get', 'post']);
  });

  it('should get all nested path methods', () => {
    const req = createReq('', '') as unknown as Request;
    // eslint-disable-next-line no-underscore-dangle
    const methods = getPathMethods('/resource2', req.app._router.stack);
    expect(methods).toEqual(['get']);
  });

  it('should get no path methods', () => {
    const req = createReq('', '') as unknown as Request;
    // eslint-disable-next-line no-underscore-dangle
    const methods = getPathMethods('/resource', req.app._router.stack);
    expect(methods).toEqual([]);
  });
});
