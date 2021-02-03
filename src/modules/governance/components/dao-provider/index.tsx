import React from 'react';
import BigNumber from 'bignumber.js';

import useMergeState from 'hooks/useMergeState';
import { ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { APIProposalStateId } from '../../api';

export type DAOProviderState = {
  minThreshold: number;
  isActive?: boolean;
  bondStaked?: BigNumber;
  activationThreshold?: BigNumber;
  activationRate?: number;
  thresholdRate?: number;
};

const InitialState: DAOProviderState = {
  minThreshold: 1,
  isActive: undefined,
  bondStaked: undefined,
  activationThreshold: undefined,
  activationRate: undefined,
  thresholdRate: undefined,
};

type DAOContextType = DAOProviderState & {
  actions: {
    activate: () => Promise<void>;
    hasActiveProposal: () => Promise<boolean>;
  };
};

const DAOContext = React.createContext<DAOContextType>({
  ...InitialState,
  actions: {
    activate: Promise.reject,
    hasActiveProposal: Promise.reject,
  },
});

export function useDAO(): DAOContextType {
  return React.useContext(DAOContext);
}

const DAOProvider: React.FunctionComponent = props => {
  const { children } = props;

  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<DAOProviderState>(InitialState);

  React.useEffect(() => {
    const { isActive } = web3c.daoGovernance;
    const { bondStaked, activationThreshold, votingPower } = web3c.daoBarn;

    let activationRate: number | undefined;

    if (bondStaked && activationThreshold?.gt(ZERO_BIG_NUMBER)) {
      activationRate = bondStaked
        .multipliedBy(100)
        .div(activationThreshold)
        .toNumber();
      activationRate = Math.min(activationRate, 100);
    }

    let thresholdRate: number | undefined;

    if (votingPower && bondStaked?.gt(ZERO_BIG_NUMBER)) {
      thresholdRate = votingPower.multipliedBy(100).div(bondStaked).toNumber();
      thresholdRate = Math.min(thresholdRate, 100);
    }

    setState({
      isActive,
      bondStaked,
      activationThreshold,
      activationRate,
      thresholdRate,
    });
  }, [
    web3c.daoGovernance.isActive,
    web3c.daoBarn.bondStaked,
    web3c.daoBarn.activationThreshold,
    web3c.daoBarn.votingPower,
  ]);

  function activate() {
    return web3c.daoGovernance.actions.activate().then(() => {
      web3c.daoGovernance.reload();
      web3c.daoBarn.reload();
    });
  }

  function hasActiveProposal(): Promise<boolean> {
    return web3c.daoGovernance.actions
      .getLatestProposalId()
      .then(proposalId => {
        if (!proposalId) {
          return Promise.resolve(false);
        }

        return web3c.daoGovernance.actions
          .getProposalState(proposalId)
          .then(proposalState => {
            return ![
              APIProposalStateId.CANCELED,
              APIProposalStateId.EXECUTED,
              APIProposalStateId.FAILED,
              APIProposalStateId.EXPIRED,
            ].includes(proposalState as any);
          });
      });
  }

  return (
    <DAOContext.Provider
      value={{
        ...state,
        actions: {
          activate,
          hasActiveProposal,
        },
      }}>
      {children}
    </DAOContext.Provider>
  );
};

export default DAOProvider;
