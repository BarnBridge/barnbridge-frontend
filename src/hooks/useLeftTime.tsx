import React from 'react';
import useInterval from '@rooks/use-interval';

import { useGeneral } from 'components/providers/generalProvider';

export type UseLeftTimeOptions = {
  end: number | Date;
  delay?: number;
  onStart?: (left: number) => void;
  onStop?: (left: number) => void;
  onTick?: (left: number) => void;
  onEnd?: () => void;
};

export type UseLeftTimeReturn = {
  isStarted: boolean;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
};

export function useLeftTime(options: UseLeftTimeOptions): UseLeftTimeReturn {
  const optsRef = React.useRef(options);
  optsRef.current = options;

  const [isStarted, setStarted] = React.useState(false);
  const [isRunning, setRunning] = React.useState(false);

  const getLeftTime = React.useCallback(() => {
    return Math.max(optsRef.current.end.valueOf() - Date.now(), 0);
  }, []);

  const [startInterval, stopInterval] = useInterval(
    () => {
      const leftTime = getLeftTime();

      optsRef.current.onTick?.(leftTime);

      if (leftTime === 0) {
        setStarted(false);
        stopInterval();
        optsRef.current.onEnd?.();
      }
    },
    options.delay ?? 1_000,
    false,
  );

  React.useEffect(() => {
    if (Date.now() < options.end) {
      setStarted(true);
      startInterval();
      optsRef.current.onStart?.(getLeftTime());
    }

    return () => {
      setStarted(false);
      stopInterval();
    };
  }, [options.end]);

  return React.useMemo(() => {
    return {
      isStarted,
      isRunning,
      start: () => {
        setStarted(true);
        setRunning(true);
        startInterval();
        optsRef.current.onStart?.(getLeftTime());
      },
      stop: () => {
        setRunning(false);
        setStarted(false);
        stopInterval();
        optsRef.current.onStop?.(getLeftTime());
      },
      pause: () => {
        setRunning(false);
        stopInterval();
      },
      resume: () => {
        setRunning(true);
        startInterval();
      },
    };
  }, [isRunning, stopInterval, startInterval]);
}

export type UseLeftTimeProps = UseLeftTimeOptions & {
  children: (leftTime: number) => React.ReactNode;
};

export const UseLeftTime: React.FC<UseLeftTimeProps> = props => {
  const { windowState } = useGeneral();
  const [leftTime, setLeftTime] = React.useState<number>(0);

  const { isStarted, isRunning, pause, resume } = useLeftTime({
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

  React.useEffect(() => {
    if (!isStarted) {
      return;
    }

    if (!isRunning && windowState.isVisible) {
      resume();
    }

    if (isRunning && !windowState.isVisible) {
      pause();
    }
  }, [windowState.isVisible, isStarted, isRunning]);

  return <>{props.children(leftTime)}</>;
};
