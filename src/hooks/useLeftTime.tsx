import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useInterval from '@rooks/use-interval';

import { useGeneral } from 'components/providers/generalProvider';
import { useReload } from 'hooks/useReload';

export type UseLeftTimeOptions = {
  end?: number | Date;
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
  const optsRef = useRef(options);
  optsRef.current = options;

  const [isStarted, setStarted] = useState(false);
  const [isRunning, setRunning] = useState(false);

  const getLeftTime = useCallback(() => {
    if (!optsRef.current.end) {
      return undefined;
    }

    return Math.max(optsRef.current.end.valueOf() - Date.now(), 0);
  }, []);

  const [startInterval, stopInterval] = useInterval(
    () => {
      const leftTime = getLeftTime();
      optsRef.current.onTick?.(leftTime ?? 0);

      if (leftTime === 0) {
        setStarted(false);
        stopInterval();
        optsRef.current.onEnd?.();
      }
    },
    options.delay ?? 1_000,
    false,
  );

  useEffect(() => {
    if (!options.end || Date.now() < options.end) {
      setStarted(true);
      startInterval();
      optsRef.current.onStart?.(getLeftTime() ?? 0);
    }

    return () => {
      setStarted(false);
      stopInterval();
    };
  }, [options.end]);

  return useMemo(() => {
    return {
      isStarted,
      isRunning,
      start: () => {
        setStarted(true);
        setRunning(true);
        startInterval();
        optsRef.current.onStart?.(getLeftTime() ?? 0);
      },
      stop: () => {
        setRunning(false);
        setStarted(false);
        stopInterval();
        optsRef.current.onStop?.(getLeftTime() ?? 0);
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
  children: (leftTime: number) => ReactNode;
};

export const UseLeftTime: FC<UseLeftTimeProps> = props => {
  const { windowState } = useGeneral();
  const [reload] = useReload();
  const leftTimeRef = useRef<number | undefined>();

  const { isStarted, isRunning, pause, resume } = useLeftTime({
    ...props,
    onStart: value => {
      leftTimeRef.current = value;
      reload();
      props.onStart?.(value);
    },
    onStop: value => {
      leftTimeRef.current = value;
      reload();
      props.onStop?.(value);
    },
    onTick: value => {
      leftTimeRef.current = value;
      reload();
      props.onTick?.(value);
    },
  });

  useEffect(() => {
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

  return <>{props.children(leftTimeRef.current ?? 0)}</>;
};
