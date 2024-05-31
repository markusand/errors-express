type Layer = {
  name: string;
  route: {
    path: string;
    stack: Layer[];
    methods: Record<string, boolean>;
  } | undefined;
  handle: { stack: Layer[] };
};

export const getPathMethods = (path: string, stack: Layer[] = []): string[] => (
  stack.reduce((acc, layer) => {
    const methods = layer.route?.path === path
      ? Object.keys(layer.route.methods)
      : getPathMethods(path, layer.handle.stack);
    acc.push(...methods);
    return acc;
  }, [] as string[])
);
