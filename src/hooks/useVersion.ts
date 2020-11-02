import React from 'react';

export type VersionType = {
  version: number;
  incVersion: () => void;
};

export function useVersion(): VersionType {
  const [version, setVersion] = React.useState<number>(0);

  const incVersion = React.useCallback(() => {
    setVersion(prevState => prevState + 1);
  }, []);

  return {
    version,
    incVersion,
  };
}
