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
                handle: { stack: []},
              },
            ],
          },
        },
      ],
    },
  },
});
