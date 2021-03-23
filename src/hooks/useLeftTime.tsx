import React from 'react';
import useInterval from '@rooks/use-interval';

export type UseLeftTimeOptions = {
  end: number | Date;
  delay?: number;
  onStart?: (left: number) => void;
  onStop?: (left: number) => void;
  onTick?: (left: number) => void;
  onEnd?: () => void;
};

export function useLeftTime(options: UseLeftTimeOptions): [() => void, () => void] {
  const optsRef = React.useRef(options);
  optsRef.current = options;

  const getLeftTime = React.useCallback(() => {
    return Math.max(optsRef.current.end.valueOf() - Date.now(), 0);
  }, []);

  const [start, stop] = useInterval(
    () => {
      const leftTime = getLeftTime();

      optsRef.current.onTick?.(leftTime);

      if (leftTime === 0) {
        stop();
        optsRef.current.onEnd?.();
      }
    },
    options.delay ?? 1_000,
    false,
  );

  const startFn = React.useCallback(() => {
    start();
    optsRef.current.onStart?.(getLeftTime());
  }, [start]);

  const stopFn = React.useCallback(() => {
    stop();
    optsRef.current.onStop?.(getLeftTime());
  }, [stop]);

  React.useEffect(() => {
    stopFn();

    if (Date.now() < options.end) {
      startFn();
    }
  }, [options.end]);

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return React.useMemo(() => [startFn, stopFn], [startFn, stopFn]);
}

export type UseLeftTimeProps = UseLeftTimeOptions & {
  children: React.ReactNode | ((leftTime: number) => React.ReactNode);
};

export const UseLeftTime: React.FC<UseLeftTimeProps> = props => {
  const { children } = props;

  const [leftTime, setLeftTime] = React.useState<number>(0);

  useLeftTime({
    ...props,
    onStart: value => {
      setLeftTime(value);
      props.onStart?.(value);
    },
    onStop: value => {
      setLeftTime(value);
      props.onStop?.(value);
    },
    onTick: value => {
      setLeftTime(value);
      props.onTick?.(value);
    },
  });

  return <>{typeof children === 'function' ? (children as Function)(leftTime) : children}</>;
};
