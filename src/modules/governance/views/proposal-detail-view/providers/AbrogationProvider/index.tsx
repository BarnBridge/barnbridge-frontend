import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { APIAbrogationEntity, fetchAbrogation } from 'modules/governance/api';
import { useDAO } from 'modules/governance/components/dao-provider';
import { AbrogationProposalReceipt } from 'modules/governance/contracts/daoGovernance';
import { useWallet } from 'wallets/walletProvider';

import { useProposal } from '../ProposalProvider';

export type AbrogationProviderState = {
  abrogation?: APIAbrogationEntity;
  forRate?: number;
  againstRate?: number;
  acceptanceThreshold?: number;
  approvalRate?: number;
  votingPower?: BigNumber;
  receipt?: AbrogationProposalReceipt;
};

const InitialState: AbrogationProviderState = {
  acceptanceThreshold: 50,
};

export type AbrogationContextType = AbrogationProviderState & {
  reload(): void;
  abrogationProposalCastVote(support: boolean, gasPrice: number): Promise<void>;
  abrogationProposalCancelVote(gasPrice: number): Promise<void>;
};

const AbrogationContext = React.createContext<AbrogationContextType>({
  ...InitialState,
  reload: () => undefined,
  abrogationProposalCastVote: () => Promise.reject(),
  abrogationProposalCancelVote: () => Promise.reject(),
});

export function useAbrogation(): AbrogationContextType {
  return React.useContext(AbrogationContext);
}

const AbrogationProvider: React.FC = props => {
  const { children } = props;

  const history = useHistory();
  const [reload, version] = useReload();
  const wallet = useWallet();
  const daoCtx = useDAO();
  const { proposal } = useProposal();

  const [state, setState] = useMergeState<AbrogationProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposal) {
      setState({
        abrogation: undefined,
      });
      return;
    }

    fetchAbrogation(proposal.proposalId)
      .then(abrogation => {
        setState({
          abrogation,
        });
      })
      .catch((status: number) => {
        if (status === 404) {
          Antd.notification.error({
            message: `Proposal with id=${proposal.proposalId} doesn't exist.`,
          });
        } else {
          Antd.notification.error({
            message: `Failed to fetch proposal with id=${proposal.proposalId}. (Status: ${status})`,
          });
        }

        history.push(`/governance/proposals/${proposal.proposalId}`);
      });
  }, [proposal, version]);

  React.useEffect(() => {
    setState({
      forRate: undefined,
      againstRate: undefined,
    });

    if (!state.abrogation) {
      return;
    }

    const { forVotes, againstVotes, createTime } = state.abrogation;
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

    daoCtx.daoBarn.actions.bondStakedAtTs(createTime - 1).then(bondStakedAt => {
      let approvalRate: number | undefined;

      if (bondStakedAt?.gt(BigNumber.ZERO)) {
        approvalRate = forVotes.multipliedBy(100).div(bondStakedAt).toNumber();
        approvalRate = Math.min(approvalRate!, 100);
      }

      setState({
        approvalRate,
      });
    });
  }, [state.abrogation]);

  React.useEffect(() => {
    setState({
      approvalRate: undefined,
    });

    if (!state.abrogation || !wallet.account) {
      return;
    }

    const { proposalId, createTime } = state.abrogation;

    daoCtx.daoBarn.actions.votingPowerAtTs(createTime - 1).then(votingPower => {
      setState({
        votingPower,
      });
    });

    daoCtx.daoGovernance.actions.getAbrogationProposalReceipt(proposalId).then(receipt => {
      setState({
        receipt,
      });
    });
  }, [state.abrogation, wallet.account]);

  function abrogationProposalCastVote(support: boolean, gasPrice: number): Promise<void> {
    return proposal?.proposalId
      ? daoCtx.daoGovernance.actions
          .abrogationProposalCastVote(proposal?.proposalId, support, gasPrice)
          .then(() => reload())
      : Promise.reject();
  }

  function abrogationProposalCancelVote(gasPrice: number): Promise<void> {
    return proposal?.proposalId
      ? daoCtx.daoGovernance.actions.abrogationProposalCancelVote(proposal?.proposalId, gasPrice).then(() => reload())
      : Promise.reject();
  }

  return (
    <AbrogationContext.Provider
      value={{
        ...state,
        reload,
        abrogationProposalCastVote,
        abrogationProposalCancelVote,
      }}>
      {children}
    </AbrogationContext.Provider>
  );
};

export default AbrogationProvider;
