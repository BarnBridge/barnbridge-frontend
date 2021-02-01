import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useReload } from 'hooks/useReload';
import useMergeState from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';
import { ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { GetReceiptCallResult } from 'web3/contracts/daoGovernance';
import { APIAbrogationEntity, fetchAbrogation } from 'modules/governance/api';
import { useProposal } from '../ProposalProvider';

export type AbrogationProviderState = {
  abrogation?: APIAbrogationEntity;
  forRate?: number;
  againstRate?: number;
  acceptanceThreshold?: number;
  approvalRate?: number;
  votingPower?: BigNumber;
  receipt?: GetReceiptCallResult;
};

export type AbrogationContextType = AbrogationProviderState & {
  reload(): void;
};

const InitialState: AbrogationProviderState = {
  acceptanceThreshold: 50,
};

const AbrogationContext = React.createContext<AbrogationContextType>({
  ...InitialState,
  reload: () => undefined,
});

export function useAbrogation(): AbrogationContextType {
  return React.useContext(AbrogationContext);
}

export type AbrogationProviderProps = {};

const AbrogationProvider: React.FunctionComponent<AbrogationProviderProps> = props => {
  const { children } = props;

  const history = useHistory();
  const [reload, version] = useReload();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();
  const proposal = useProposal();

  const [state, setState] = useMergeState<AbrogationProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposal.proposal) {
      return;
    }

    const { proposalId } = proposal.proposal;

    fetchAbrogation(proposalId)
      .then(abrogation => {
        setState({
          abrogation,
        });
      })
      .catch((status: number) => {
        if (status === 404) {
          Antd.notification.error({
            message: `Proposal with id=${proposalId} doesn't exist.`,
          });
        } else {
          Antd.notification.error({
            message: `Failed to fetch proposal abrogation with id=${proposalId}. (Status: ${status})`,
          });
        }

        history.push(`/governance/proposals/${proposalId}`);
      });
  }, [proposal.proposal, version]);

  useAsyncEffect(async () => {
    setState({
      forRate: undefined,
      againstRate: undefined,
    });

    if (!state.abrogation) {
      return;
    }

    const { forVotes, againstVotes } = state.abrogation;
    const total = forVotes.plus(againstVotes);

    let forRate = 0;
    let againstRate = 0;

    if (total.gt(ZERO_BIG_NUMBER)) {
      forRate = forVotes.multipliedBy(100).div(total).toNumber();
      againstRate = againstVotes.multipliedBy(100).div(total).toNumber();
    }

    setState({
      forRate,
      againstRate,
    });
  }, [state.abrogation]);

  React.useEffect(() => {
    setState({
      approvalRate: undefined,
    });

    if (!state.abrogation || !wallet.account) {
      return;
    }

    const { proposalId } = state.abrogation;

    web3c.daoBarn.actions.votingPowerAtTs(state.abrogation?.createTime! - 1)
      .then(votingPower => {
        setState({
          votingPower,
        });
      });

    web3c.daoBarn.actions.bondStakedAtTs(state.abrogation?.createTime! - 1)
      .then(bondStakedAt => {
        let approvalRate: number | undefined = undefined;
        const { forVotes } = state.abrogation!;

        if (bondStakedAt?.gt(ZERO_BIG_NUMBER)) {
          approvalRate = forVotes.multipliedBy(100).div(bondStakedAt!).toNumber();
        }

        setState({
          approvalRate,
        });
      });

    web3c.daoGovernance.actions.getAbrogationReceipt(proposalId)
      .then((result: GetReceiptCallResult) => {
        setState({
          receipt: result,
        });
      });
  }, [state.abrogation, wallet.account]);

  return (
    <AbrogationContext.Provider value={{
      ...state,
      reload,
    }}>{children}</AbrogationContext.Provider>
  );
};

export default AbrogationProvider;
