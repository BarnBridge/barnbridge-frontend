import React from 'react';

export type ReloadHook = [() => void, number];

export function useReload(): ReloadHook {
  const [version, setVersion] = React.useState<number>(0);

  return React.useMemo(() => ([
    () => {
      setVersion(prevState => prevState + 1);
    },
    version,
  ]), [version]);
}
