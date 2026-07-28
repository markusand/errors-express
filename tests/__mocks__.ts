import type { Request, Response, NextFunction } from 'express';

export const call = () => {
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const req = {} as unknown as Request;
  const res = { status, send } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;
  return { send, status, req, res, next };
};

export const createReq = (path: string, method: string) => ({
  path,
  method,
  app: {
    _router: {
      stack: [
        {
          route: {
            path: '/resource1',
            methods: { get: true },
          },
          handle: { stack: [] },
        },
        {
          route: {
            path: '/resource1',
            methods: { post: true },
          },
          handle: { stack: [] },
        },
        {
          route: undefined,
          handle: {
            stack: [
              {
                route: {
                  path: '/resource2',
                  methods: { get: true },
                },
                handle: { stack: [] },
              },
            ],
          },
        },
      ],
    },
  },
});
