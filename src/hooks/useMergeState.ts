import React from 'react';

export type MergeStateUpdate<S> = Partial<S> | ((prevState: S) => Partial<S>);

function useMergeState<S>(
  initialState: S | (() => S),
  callback?: (state: S) => void,
): [S, React.Dispatch<MergeStateUpdate<S>>] {
  const [state, set] = React.useState<S>(initialState);

  return [
    state,
    (updater: MergeStateUpdate<S>) =>
      set(prev => {
        const next = {
          ...prev,
          ...(typeof updater === 'function'
            ? (updater as Function)(prev)
            : updater),
        };

        if (typeof callback === 'function') {
          callback(next);
        }

        return next;
      }),
  ];
}

export default useMergeState;
