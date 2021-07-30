import { MutableRefObject, useEffect, useRef } from 'react';

export function useIsUnmount(): MutableRefObject<boolean> {
  const isUnmountRef = useRef(false);

  useEffect(() => {
    return () => {
      isUnmountRef.current = true;
    };
  }, []);

  return isUnmountRef;
}
