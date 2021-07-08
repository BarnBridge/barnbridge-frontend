import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { APIProposalEntity, useDaoAPI } from 'modules/governance/api';
import { useDAO } from 'modules/governance/components/dao-provider';
import { ProposalReceipt } from 'modules/governance/contracts/daoGovernance';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

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

const Context = React.createContext<ProposalContextType>(InvariantContext('ProposalProvider'));

export function useProposal(): ProposalContextType {
  return React.useContext(Context);
}

export type ProposalProviderProps = {
  proposalId?: number;
};

const ProposalProvider: React.FC<ProposalProviderProps> = props => {
  const { proposalId, children } = props;

  const history = useHistory();
  const wallet = useWallet();
  const daoAPI = useDaoAPI();
  const daoCtx = useDAO();
  const [reload, version] = useReload();

  const [state, setState] = useMergeState<ProposalProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposalId) {
      setState({ proposal: undefined });
      return;
    }

    daoAPI
      .fetchProposal(proposalId)
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

    const { forVotes, againstVotes, createTime, warmUpDuration } = state.proposal;
    const total = forVotes.plus(againstVotes);

    let forRate = 0;
    let againstRate = 0;

    if (total.gt(BigNumber.ZERO)) {
      forRate = forVotes.multipliedBy(100).div(total).toNumber();
      againstRate = againstVotes.multipliedBy(100).div(total).toNumber();
    }

    setState({
      forRate,
      againstRate,
    });

    daoCtx.daoBarn.getBondStakedAtTs(createTime + warmUpDuration).then(bondStakedAt => {
      let quorum: number | undefined;

      if (bondStakedAt?.gt(BigNumber.ZERO)) {
        quorum = total.multipliedBy(100).div(bondStakedAt).toNumber();
      }

      setState({ quorum });
    });

    daoCtx.daoGovernance.getAbrogationProposals(state.proposal.proposalId).then(result => {
      if (result) {
        setState({ isCanceled: result.createTime > 0 });
      }
    });
  }, [state.proposal]);

  React.useEffect(() => {
    setState({
      thresholdRate: undefined,
    });

    const { bondStaked } = daoCtx.daoBarn;

    if (!state.proposal || !bondStaked || bondStaked.isEqualTo(BigNumber.ZERO)) {
      return;
    }

    const { proposer } = state.proposal;

    daoCtx.daoBarn.getVotingPower(proposer).then(votingPower => {
      if (votingPower) {
        setState({
          thresholdRate: votingPower.div(bondStaked).multipliedBy(100).toNumber(),
        });
      }
    });
  }, [state.proposal, daoCtx.daoBarn.bondStaked]);

  React.useEffect(() => {
    setState({
      receipt: undefined,
      votingPower: undefined,
    });

    if (!state.proposal || !wallet.isActive) {
      return;
    }

    const { createTime, warmUpDuration } = state.proposal;

    daoCtx.daoGovernance.getReceipt(state.proposal.proposalId, wallet.account!).then(receipt => {
      setState({ receipt });
    });

    daoCtx.daoBarn.getVotingPowerAtTs(wallet.account!, createTime + warmUpDuration).then(votingPower => {
      setState({ votingPower });
    });
  }, [state.proposal, wallet.account]);

  function cancelProposal(): Promise<void> {
    return proposalId ? daoCtx.daoGovernance.cancelProposal(proposalId).then(() => reload()) : Promise.reject();
  }

  function queueProposalForExecution(gasPrice: number): Promise<void> {
    return proposalId ? daoCtx.daoGovernance.queue(proposalId, gasPrice).then(() => reload()) : Promise.reject();
  }

  function executeProposal(): Promise<void> {
    return proposalId ? daoCtx.daoGovernance.execute(proposalId).then(() => reload()) : Promise.reject();
  }

  function proposalCastVote(support: boolean, gasPrice: number): Promise<void> {
    return proposalId
      ? daoCtx.daoGovernance.castVote(proposalId, support, gasPrice).then(() => reload())
      : Promise.reject();
  }

  function proposalCancelVote(gasPrice: number): Promise<void> {
    return proposalId ? daoCtx.daoGovernance.cancelVote(proposalId, gasPrice).then(() => reload()) : Promise.reject();
  }

  function startAbrogationProposal(description: string, gasPrice: number): Promise<void> {
    return proposalId
      ? daoCtx.daoGovernance.startAbrogationProposal(proposalId, description, gasPrice).then(() => reload())
      : Promise.reject();
  }

  return (
    <Context.Provider
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
    </Context.Provider>
  );
};

export default ProposalProvider;
