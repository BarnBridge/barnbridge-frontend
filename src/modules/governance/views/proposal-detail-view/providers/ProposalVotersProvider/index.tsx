import React from 'react';

import useMergeState from 'hooks/useMergeState';
import { APIVoteEntity, fetchProposalVoters } from 'modules/governance/api';
import { useProposal } from '../ProposalProvider';

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

const ProposalVotersContext = React.createContext<ProposalVotersContextType>({
  ...InitialState,
  changeSupportFilter: () => undefined,
  changePage: () => undefined,
});

export function useProposalVoters(): ProposalVotersContextType {
  return React.useContext(ProposalVotersContext);
}

const ProposalVotersProvider: React.FunctionComponent = props => {
  const { children } = props;

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

    fetchProposalVoters(proposal.proposalId, state.page, state.pageSize, state.supportFilter)
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
    <ProposalVotersContext.Provider value={{
      ...state,
      changeSupportFilter,
      changePage,
    }}>
      {children}
    </ProposalVotersContext.Provider>
  );
};

export default ProposalVotersProvider;
