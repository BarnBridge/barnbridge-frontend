import React from 'react';

import useMergeState from 'hooks/useMergeState';
import { APIVoteEntity, useDaoAPI } from 'modules/governance/api';

import { useProposal } from '../ProposalProvider';

import { InvariantContext } from 'utils/context';

export type ProposalVotersProviderState = {
  votes: APIVoteEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  supportFilter?: boolean;
};

export type ProposalVotersContextType = ProposalVotersProviderState & {
  changeSupportFilter(supportFilter?: boolean): void;
  changePage(page: number): void;
};

const InitialState: ProposalVotersProviderState = {
  votes: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  supportFilter: undefined,
};

const Context = React.createContext<ProposalVotersContextType>(InvariantContext('ProposalVotersProvider'));

export function useProposalVoters(): ProposalVotersContextType {
  return React.useContext(Context);
}

const ProposalVotersProvider: React.FC = props => {
  const { children } = props;

  const daoAPI = useDaoAPI();
  const { proposal } = useProposal();
  const [state, setState] = useMergeState<ProposalVotersProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposal?.proposalId) {
      setState({
        votes: [],
        total: 0,
      });
      return;
    }

    setState({ loading: true });

    daoAPI
      .fetchProposalVoters(proposal.proposalId, state.page, state.pageSize, state.supportFilter)
      .then(data => {
        setState({
          loading: false,
          votes: data.data,
          total: data.meta.count,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          votes: [],
        });
      });
  }, [proposal, state.page, state.supportFilter]);

  function changeSupportFilter(supportFilter?: boolean) {
    setState({
      supportFilter,
      page: 1,
    });
  }

  function changePage(page: number) {
    setState({ page });
  }

  return (
    <Context.Provider
      value={{
        ...state,
        changeSupportFilter,
        changePage,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ProposalVotersProvider;
