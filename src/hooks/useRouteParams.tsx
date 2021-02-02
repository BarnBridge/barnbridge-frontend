import React from 'react';
import { useHistory, useLocation } from 'react-router';

export type UseRouteParamKey = string;
export type UseRouteParamValue = string | undefined;
export type UseRouteParams = Record<UseRouteParamKey, UseRouteParamValue>;
export type UseRouteParamsReturn = [
  UseRouteParams,
  (key: UseRouteParamKey, value: UseRouteParamValue) => void,
  (key: UseRouteParamKey) => void,
];

const RouteParamsContext = React.createContext<UseRouteParamsReturn>([
  {},
  () => undefined,
  () => undefined,
]);

const RouteParamsProvider: React.FunctionComponent = props => {
  const history = useHistory();
  const location = useLocation();

  const paramsRef = React.useRef<UseRouteParams>({});
  paramsRef.current = React.useMemo<UseRouteParams>(
    () => ({
      ...Object.fromEntries(new URLSearchParams(location.search)),
    }),
    [location.search],
  );

  const setParam = React.useCallback(
    (key: UseRouteParamKey, value: UseRouteParamValue) => {
      const newParams = {
        ...paramsRef.current,
        [key]: value,
      };

      const searchQuery = Object.keys(newParams)
        .filter(key => newParams[key] !== undefined)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(newParams[key]!)}`,
        )
        .join('&');

      if (location.search !== `?${searchQuery}`) {
        history.replace({
          ...history.location,
          search: searchQuery,
        });
      }
    },
    [],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const clearParam = React.useCallback(
    (key: UseRouteParamKey) => {
      setParam(key, undefined);
    },
    [setParam],
  );

  return (
    <RouteParamsContext.Provider
      value={[paramsRef.current, setParam, clearParam]}>
      {props.children}
    </RouteParamsContext.Provider>
  );
};

export function useRouteParams(): UseRouteParamsReturn {
  return React.useContext(RouteParamsContext);
}

export default RouteParamsProvider;
