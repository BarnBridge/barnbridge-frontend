import React from 'react';

function useMergeState<S>(initialState: S | (() => S), callback?: (state: S) => void)
  : [S, React.Dispatch<React.SetStateAction<Partial<S>>>] {
  const [state, set] = React.useState<S>(initialState);

  return [
    state,
    (updater: React.SetStateAction<Partial<S>>) => set(prev => {
      const next = {
        ...prev,
        ...(typeof updater === 'function' ? (updater as Function)(prev) : updater)
      };

      if (typeof callback === 'function') {
        callback(next);
      }

      return next;
    }),
  ];
}

export default useMergeState;
