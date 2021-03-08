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
  function getLeftTime() {
    return Math.max(options.end.valueOf() - Date.now(), 0);
  }

  const [start, stop] = useInterval(
    () => {
      const leftTime = getLeftTime();

      options.onTick?.(leftTime);

      if (leftTime === 0) {
        stop();
        options.onEnd?.();
      }
    },
    options.delay ?? 1_000,
    false,
  );

  function startFn() {
    start();
    options.onStart?.(getLeftTime());
  }

  function stopFn() {
    stop();
    options.onStop?.(getLeftTime());
  }

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  React.useEffect(() => {
    stopFn();

    if (Date.now() < options.end) {
      startFn();
    }
  }, [options.end]);

  return [startFn, stopFn];
}

export type UseLeftTimeProps = UseLeftTimeOptions & {
  children: (leftTime: number) => React.ReactNode;
};

export const UseLeftTime: React.FC<UseLeftTimeProps> = props => {
  const { children } = props;

  const [leftTime, setLeftTime] = React.useState<number>(0);

  useLeftTime({
    end: props.end,
    delay: props.delay,
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
    onEnd: props.onEnd,
  });

  return <>{children(leftTime)}</>;
};
