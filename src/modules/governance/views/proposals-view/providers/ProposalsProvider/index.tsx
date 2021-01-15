import React from 'react';

import { APILiteProposalEntity, fetchProposals } from 'modules/governance/api';

type ProposalsProviderState = {
  proposals: APILiteProposalEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  stateFilter?: string;
  searchFilter?: string;
};

export type ProposalsContextType = ProposalsProviderState & {
  changeStateFilter(stateFilter: string): void;
  changeSearchFilter(searchFilter: string): void;
  changePage(page: number): void;
};

const InitialState: ProposalsProviderState = {
  proposals: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  stateFilter: undefined,
  searchFilter: undefined,
};

const ProposalsContext = React.createContext<ProposalsContextType>({
  ...InitialState,
  changeStateFilter: () => undefined,
  changeSearchFilter: () => undefined,
  changePage: () => undefined,
});

export function useProposals(): ProposalsContextType {
  return React.useContext(ProposalsContext);
}

export type ProposalsProviderProps = {
  stateFilter?: string;
  searchFilter?: string;
};

const ProposalsProvider: React.FunctionComponent<ProposalsProviderProps> = props => {
  const { stateFilter, searchFilter, children } = props;

  const [state, setState] = React.useState<ProposalsProviderState>(InitialState);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      stateFilter,
      searchFilter,
      page: 1,
    }));
  }, [stateFilter, searchFilter]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    fetchProposals(state.page, state.pageSize, state.stateFilter, state.searchFilter)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          proposals: data.data,
          total: data.meta.count,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          proposals: [],
        }));
      });
  }, [state.page, state.stateFilter, state.searchFilter]);

  function changeStateFilter(stateFilter: string) {
    setState(prevState => ({
      ...prevState,
      stateFilter,
    }));
  }

  function changeSearchFilter(searchFilter: string) {
    setState(prevState => ({
      ...prevState,
      searchFilter,
    }));
  }

  function changePage(page: number) {
    setState(prevState => ({
      ...prevState,
      page,
    }));
  }

  return (
    <ProposalsContext.Provider value={{
      ...state,
      changeStateFilter,
      changeSearchFilter,
      changePage,
    }}>
      {children}
    </ProposalsContext.Provider>
  );
};

export default ProposalsProvider;
