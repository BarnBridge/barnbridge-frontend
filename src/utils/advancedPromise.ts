export type AdvancedPromise<T> = Promise<T> & {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function createPromise<T = any>(): AdvancedPromise<T> {
  let resolveFn: (value?: T | PromiseLike<T>) => void = () => undefined;
  let rejectFn: (reason?: any) => void = () => undefined;

  const promise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  }) as AdvancedPromise<T>;

  promise.resolve = resolveFn;
  promise.reject = rejectFn;

  return promise;
}
