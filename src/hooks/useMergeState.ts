import React from 'react';

function useMergeState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<Partial<S>>>] {
  const [state, set] = React.useState<S>(initialState);

  return [
    state,
    (updater: React.SetStateAction<Partial<S>>) => set(prev => ({
      ...prev,
      ...(typeof updater === 'function' ? (updater as Function)(prev) : updater)
    })),
  ];
}

export default useMergeState;
