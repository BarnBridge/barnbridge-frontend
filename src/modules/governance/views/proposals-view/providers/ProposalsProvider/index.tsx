import React from 'react';

import useMergeState from 'hooks/useMergeState';
import { APILiteProposalEntity, useDaoAPI } from 'modules/governance/api';

import { InvariantContext } from 'utils/context';

export type LiteProposalEntity = APILiteProposalEntity & {
  stateTimeLeftTs: number;
};

export type ProposalsProviderState = {
  proposals: LiteProposalEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  stateFilter?: string;
  searchFilter?: string;
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

export type ProposalsContextType = ProposalsProviderState & {
  changeStateFilter(stateFilter: string): void;
  changeSearchFilter(searchFilter: string): void;
  changePage(page: number): void;
};

const Context = React.createContext<ProposalsContextType>(InvariantContext('ProposalsProvider'));

export function useProposals(): ProposalsContextType {
  return React.useContext(Context);
}

export type ProposalsProviderProps = {
  stateFilter?: string;
  searchFilter?: string;
};

const ProposalsProvider: React.FC<ProposalsProviderProps> = props => {
  const { stateFilter, searchFilter, children } = props;

  const daoAPI = useDaoAPI();
  const [state, setState] = useMergeState<ProposalsProviderState>(InitialState);

  React.useEffect(() => {
    setState({
      stateFilter,
      searchFilter,
      page: 1,
    });
  }, [stateFilter, searchFilter]);

  React.useEffect(() => {
    setState({
      loading: true,
    });

    daoAPI
      .fetchProposals(state.page, state.pageSize, state.stateFilter, state.searchFilter)
      .then(data => {
        setState({
          loading: false,
          proposals: data.data.map(item => ({
            ...item,
            stateTimeLeftTs: Date.now() + (item.stateTimeLeft ?? 0) * 1_000,
          })),
          total: data.meta.count,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          proposals: [],
        });
      });
  }, [state.page, state.stateFilter, state.searchFilter]);

  function changeStateFilter(value: string) {
    setState({ stateFilter: value });
  }

  function changeSearchFilter(value: string) {
    setState({ searchFilter: value });
  }

  function changePage(page: number) {
    setState({ page });
  }

  return (
    <Context.Provider
      value={{
        ...state,
        changeStateFilter,
        changeSearchFilter,
        changePage,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ProposalsProvider;
