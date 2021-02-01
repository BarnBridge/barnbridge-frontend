import React from 'react';

import { APIVoteEntity, fetchAbrogationVoters } from 'modules/governance/api';
import { useAbrogation } from '../AbrogationProvider';

type AbrogationVotersProviderState = {
  votes: APIVoteEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  supportFilter?: boolean;
};

export type AbrogationVotersContextType = AbrogationVotersProviderState & {
  changeSupportFilter(supportFilter?: boolean): void;
  changePage(page: number): void;
};

const InitialState: AbrogationVotersProviderState = {
  votes: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  supportFilter: undefined,
};

const AbrogationVotersContext = React.createContext<AbrogationVotersContextType>({
  ...InitialState,
  changeSupportFilter: () => undefined,
  changePage: () => undefined,
});

export function useAbrogationVoters(): AbrogationVotersContextType {
  return React.useContext(AbrogationVotersContext);
}

const AbrogationVotersProvider: React.FunctionComponent = props => {
  const { children } = props;

  const abrogationCtx = useAbrogation();
  const [state, setState] = React.useState<AbrogationVotersProviderState>(InitialState);

  React.useEffect(() => {
    if (!abrogationCtx.abrogation) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    const { proposalId } = abrogationCtx.abrogation;

    fetchAbrogationVoters(proposalId, state.page, state.pageSize, state.supportFilter)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          votes: data.data,
          total: data.meta.count,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          votes: [],
        }));
      });
  }, [abrogationCtx.abrogation, state.page, state.supportFilter]);

  function changeSupportFilter(supportFilter?: boolean) {
    setState(prevState => ({
      ...prevState,
      supportFilter,
      page: 1,
    }));
  }

  function changePage(page: number) {
    setState(prevState => ({
      ...prevState,
      page,
    }));
  }

  return (
    <AbrogationVotersContext.Provider value={{
      ...state,
      changeSupportFilter,
      changePage,
    }}>
      {children}
    </AbrogationVotersContext.Provider>
  );
};

export default AbrogationVotersProvider;
