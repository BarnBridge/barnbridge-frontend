import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useRouteQuery() {
  const location = useLocation();
  const urlQuery = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const get = useCallback(
    (paramName: string): string | undefined => {
      const value = urlQuery.get(paramName) ?? undefined;

      return value ? decodeURIComponent(value) : undefined;
    },
    [location.search],
  );

  return {
    urlQuery,
    get,
  };
}

export default useRouteQuery;
