import React from 'react';

export function useRefState<S>(initialState: S | (() => S))
  : [S, React.Dispatch<React.SetStateAction<S>>, React.MutableRefObject<S>] {
  const [state, setState] = React.useState<S>(initialState);
  const stateRef = React.useRef<S>(state);
  stateRef.current = state;

  return [state, setState, stateRef];
}
