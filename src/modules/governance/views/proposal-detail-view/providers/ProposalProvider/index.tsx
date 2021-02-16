import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import useMergeState from 'hooks/useMergeState';
import { ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { ProposalReceipt } from 'web3/contracts/daoGovernance';
import { useWallet } from 'wallets/wallet';
import { APIProposalEntity, fetchProposal } from 'modules/governance/api';

export type ProposalProviderState = {
  proposal?: APIProposalEntity;
  forRate?: number;
  againstRate?: number;
  quorum?: number;
  minThreshold: number;
  thresholdRate?: number;
  votingPower?: BigNumber;
  receipt?: ProposalReceipt;
  isCanceled?: boolean;
};

const InitialState: ProposalProviderState = {
  minThreshold: 1,
};

export type ProposalContextType = ProposalProviderState & {
  reload(): void;
  cancelProposal(): Promise<void>;
  queueProposalForExecution(gasPrice: number): Promise<void>;
  executeProposal(): Promise<void>;
  proposalCastVote(support: boolean, gasPrice: number): Promise<void>;
  proposalCancelVote(gasPrice: number): Promise<void>;
  startAbrogationProposal(description: string, gasPrice: number): Promise<void>;
};

const ProposalContext = React.createContext<ProposalContextType>({
  ...InitialState,
  reload: () => undefined,
  cancelProposal: () => Promise.reject(),
  queueProposalForExecution: () => Promise.reject(),
  executeProposal: () => Promise.reject(),
  proposalCastVote: () => Promise.reject(),
  proposalCancelVote: () => Promise.reject(),
  startAbrogationProposal: () => Promise.reject(),
});

export function useProposal(): ProposalContextType {
  return React.useContext(ProposalContext);
}

export type ProposalProviderProps = {
  proposalId?: number;
};

const ProposalProvider: React.FC<ProposalProviderProps> = props => {
  const { proposalId, children } = props;

  const history = useHistory();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();
  const [reload, version] = useReload();

  const [state, setState] = useMergeState<ProposalProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposalId) {
      setState({ proposal: undefined });
      return;
    }

    fetchProposal(proposalId)
      .then(proposal => {
        setState({ proposal });
      })
      .catch((status: number) => {
        if (status === 404) {
          Antd.notification.error({
            message: `Proposal with id=${proposalId} doesn't exist.`,
          });
        } else {
          Antd.notification.error({
            message: `Failed to fetch proposal with id=${proposalId}. (Status: ${status})`,
          });
        }

        history.push('/governance/proposals');
      });
  }, [proposalId, version]);

  React.useEffect(() => {
    setState({
      forRate: undefined,
      againstRate: undefined,
      quorum: undefined,
      isCanceled: undefined,
    });

    if (!state.proposal) {
      return;
    }

    const {
      proposalId,
      forVotes,
      againstVotes,
      createTime,
      warmUpDuration,
    } = state.proposal;
    const total = forVotes.plus(againstVotes);

    let forRate: number = 0;
    let againstRate: number = 0;

    if (total.gt(ZERO_BIG_NUMBER)) {
      forRate = forVotes.multipliedBy(100).div(total).toNumber();
      againstRate = againstVotes.multipliedBy(100).div(total).toNumber();
    }

    setState({
      forRate,
      againstRate,
    });

    web3c.daoBarn.actions
      .bondStakedAtTs(createTime + warmUpDuration)
      .then(bondStakedAt => {
        let quorum: number | undefined;

        if (bondStakedAt?.gt(ZERO_BIG_NUMBER)) {
          quorum = total.multipliedBy(100).div(bondStakedAt).toNumber();
        }

        setState({ quorum });
      });

    web3c.daoGovernance.actions.abrogationProposal(proposalId).then(result => {
      if (result) {
        setState({ isCanceled: result.createTime > 0 });
      }
    });
  }, [state.proposal]);

  React.useEffect(() => {
    setState({
      thresholdRate: undefined,
    });

    const { bondStaked } = web3c.daoBarn;
    if (!state.proposal || !bondStaked || bondStaked.isEqualTo(ZERO_BIG_NUMBER)) {
      return;
    }

    const { proposer } = state.proposal;

    web3c.daoBarn.actions
      .votingPower(proposer)
      .then(votingPower => {
        if (votingPower) {
          setState({
            thresholdRate: votingPower.multipliedBy(100).div(bondStaked).toNumber(),
          });
        }
      });
  }, [state.proposal, web3c.daoBarn.bondStaked]);

  React.useEffect(() => {
    setState({
      receipt: undefined,
      votingPower: undefined,
    });

    if (!state.proposal || !wallet.isActive) {
      return;
    }

    const { proposalId, createTime, warmUpDuration } = state.proposal;

    web3c.daoGovernance.actions.getProposalReceipt(proposalId).then(receipt => {
      setState({ receipt });
    });

    web3c.daoBarn.actions
      .votingPowerAtTs(createTime + warmUpDuration)
      .then(votingPower => {
        setState({ votingPower });
      });
  }, [state.proposal, wallet.account]);

  function cancelProposal(): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.cancelProposal(proposalId)
      : Promise.reject();
  }

  function queueProposalForExecution(gasPrice: number): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.queueProposalForExecution(proposalId, gasPrice)
      : Promise.reject();
  }

  function executeProposal(): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.executeProposal(proposalId)
      : Promise.reject();
  }

  function proposalCastVote(support: boolean, gasPrice: number): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.proposalCastVote(
        proposalId,
        support,
        gasPrice,
      )
      : Promise.reject();
  }

  function proposalCancelVote(gasPrice: number): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.proposalCancelVote(proposalId, gasPrice)
      : Promise.reject();
  }

  function startAbrogationProposal(
    description: string,
    gasPrice: number,
  ): Promise<void> {
    return proposalId
      ? web3c.daoGovernance.actions.startAbrogationProposal(
        proposalId,
        description,
        gasPrice,
      )
      : Promise.reject();
  }

  return (
    <ProposalContext.Provider
      value={{
        ...state,
        reload,
        cancelProposal,
        queueProposalForExecution,
        executeProposal,
        proposalCastVote,
        proposalCancelVote,
        startAbrogationProposal,
      }}>
      {children}
    </ProposalContext.Provider>
  );
};

export default ProposalProvider;
