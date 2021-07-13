export function InvariantContext<T>(contextName: string): T {
  return new Proxy(
    {},
    {
      get: function (target, name: string) {
        // throw new Error(`${contextName}.${name} is not implemented yet.`); /// TODO
        return undefined;
      },
    },
  ) as T;
}
