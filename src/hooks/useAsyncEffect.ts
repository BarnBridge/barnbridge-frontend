import React from 'react';

export function useAsyncEffect(effect: () => Promise<Function | void>, deps?: React.DependencyList): void {
  React.useEffect(() => {
    let destroyHandler: Function | void;

    (async () => {
      destroyHandler = await effect();
    })();

    return () => {
      if (destroyHandler instanceof Function) {
        destroyHandler();
      }
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
