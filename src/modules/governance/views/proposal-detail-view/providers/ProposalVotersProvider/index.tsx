import React from 'react';

import { APIVoteEntity, fetchProposalVoters } from 'modules/governance/api';
import { useProposal } from '../ProposalProvider';

type ProposalVotersProviderState = {
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
  const {children} = props;

  const proposalCtx = useProposal();
  const [state, setState] = React.useState<ProposalVotersProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposalCtx.proposal?.proposalId) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    fetchProposalVoters(proposalCtx.proposal?.proposalId, state.page, state.pageSize, state.supportFilter)
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
  }, [proposalCtx.proposal?.proposalId, state.page, state.supportFilter]);

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
