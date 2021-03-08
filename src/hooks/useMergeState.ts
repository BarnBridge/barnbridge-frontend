import React from 'react';

export type MergeStateUpdate<S> = Partial<S> | ((prevState: S) => Partial<S>);

export function mergeState<S>(state: Partial<S>): (prevState: S) => S {
  return (prevState: S): S => {
    return {
      ...prevState,
      ...state,
    };
  };
}

function useMergeState<S>(
  initialState: S | (() => S),
  callback?: (state: S) => void,
): [S, React.Dispatch<MergeStateUpdate<S>>] {
  const [state, set] = React.useState<S>(initialState);

  const setState = React.useCallback(
    (updater: MergeStateUpdate<S>) => {
      set(prev => {
        const next = {
          ...prev,
          ...(typeof updater === 'function' ? (updater as (value: S) => S)(prev) : updater),
        };

        if (typeof callback === 'function') {
          callback(next);
        }

        return next;
      });
    },
    [callback],
  );

  return [state, setState];
}

export default useMergeState;
