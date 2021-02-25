import React from 'react';
import useInterval from '@rooks/use-interval';

export type useWhileOptions = {
  delay?: number;
  callback?: (...args: any[]) => Promise<any>;
};

export type useWhileReturn = {
  start: (...args: any[]) => void;
  stop: () => void;
  promise: Promise<any>;
};

export function useWhile(options: useWhileOptions): useWhileReturn {
  const resolveRef = React.useRef<(value: any) => void>(Boolean);
  const argsRef = React.useRef<any[]>([]);

  const [start, stop] = useInterval(
    () => {
      options.callback?.(...argsRef.current).then(result => {
        resolveRef.current?.(result);
        stop();
      });
    },
    options.delay ?? 1_000,
    false,
  );

  const startFn = (...args: any[]) => {
    argsRef.current = args;
    start();
  };

  const promise = React.useMemo(
    () =>
      new Promise<any>(resolve => {
        resolveRef.current = resolve;
      }),
    [],
  );

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start: startFn,
    stop,
    promise,
  };
}
