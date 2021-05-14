import React from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import { BondToken } from 'components/providers/known-tokens-provider';
import config from 'config';
import useMergeState from 'hooks/useMergeState';
import { DAOBarnContract, useDAOBarnContract } from 'modules/governance/contracts/daoBarn';
import { DAOGovernanceContract, useDAOGovernanceContract } from 'modules/governance/contracts/daoGovernance';
import { DAORewardContract, useDAORewardContract } from 'modules/governance/contracts/daoReward';
import { useWallet } from 'wallets/wallet';

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
  daoBarn: DAOBarnContract;
  daoReward: DAORewardContract;
  daoGovernance: DAOGovernanceContract;
  actions: {
    activate: () => Promise<void>;
    hasActiveProposal: () => Promise<boolean>;
    hasThreshold(): boolean | undefined;
  };
};

const DAOContext = React.createContext<DAOContextType>({
  ...InitialState,
  daoBarn: undefined as any,
  daoReward: undefined as any,
  daoGovernance: undefined as any,
  actions: {
    activate: Promise.reject,
    hasActiveProposal: Promise.reject,
    hasThreshold: () => undefined,
  },
});

export function useDAO(): DAOContextType {
  return React.useContext(DAOContext);
}

const DAOProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();

  const daoBarn = useDAOBarnContract();
  const daoReward = useDAORewardContract();
  const daoGovernance = useDAOGovernanceContract();

  const [state, setState] = useMergeState<DAOProviderState>(InitialState);

  React.useEffect(() => {
    daoBarn.contract.setProvider(walletCtx.provider);
    daoReward.contract.setProvider(walletCtx.provider);
    daoGovernance.contract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  React.useEffect(() => {
    const bondContract = BondToken.contract as Erc20Contract;

    (async () => {
      if (walletCtx.isActive) {
        bondContract.setAccount(walletCtx.account);
        bondContract.loadAllowance(config.contracts.dao.barn).catch(Error);
      }
    })();
  }, [walletCtx.account]);

  React.useEffect(() => {
    const { isActive } = daoGovernance;
    const { bondStaked, activationThreshold, votingPower } = daoBarn;

    let activationRate: number | undefined;

    if (bondStaked && activationThreshold?.gt(ZERO_BIG_NUMBER)) {
      activationRate = bondStaked.multipliedBy(100).div(activationThreshold).toNumber();
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
  }, [daoGovernance.isActive, daoBarn.bondStaked, daoBarn.activationThreshold, daoBarn.votingPower]);

  function activate() {
    return daoGovernance.actions.activate().then(() => {
      daoGovernance.reload();
      daoBarn.reload();
    });
  }

  function hasActiveProposal(): Promise<boolean> {
    return daoGovernance.actions.getLatestProposalId().then(proposalId => {
      if (!proposalId) {
        return Promise.resolve(false);
      }

      return daoGovernance.actions.getProposalState(proposalId).then(proposalState => {
        return ![
          APIProposalStateId.CANCELED,
          APIProposalStateId.EXECUTED,
          APIProposalStateId.FAILED,
          APIProposalStateId.EXPIRED,
          APIProposalStateId.ABROGATED,
        ].includes(proposalState as any);
      });
    });
  }

  function hasThreshold(): boolean | undefined {
    if (state.thresholdRate === undefined) {
      return undefined;
    }

    return state.thresholdRate >= state.minThreshold;
  }

  return (
    <DAOContext.Provider
      value={{
        ...state,
        daoBarn,
        daoReward,
        daoGovernance,
        actions: {
          activate,
          hasThreshold,
          hasActiveProposal,
        },
      }}>
      {children}
      <ContractListener contract={daoBarn.contract} />
      <ContractListener contract={daoReward.contract} />
      <ContractListener contract={daoGovernance.contract} />
    </DAOContext.Provider>
  );
};

export default DAOProvider;
