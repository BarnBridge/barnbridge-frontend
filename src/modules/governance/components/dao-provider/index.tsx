import React from 'react';
import BigNumber from 'bignumber.js';
import { useContract } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';

import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import useMergeState from 'hooks/useMergeState';
import { APIProposalStateId } from 'modules/governance/api';
import DaoBarnContract from 'modules/governance/contracts/daoBarn';
import DaoGovernanceContract from 'modules/governance/contracts/daoGovernance';
import DaoRewardContract from 'modules/governance/contracts/daoReward';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export type DAOProviderState = {
  minThreshold: number;
  isActive?: boolean;
  bondStaked?: BigNumber;
  activationRate?: number;
  thresholdRate?: number;
};

const InitialState: DAOProviderState = {
  minThreshold: 1,
  isActive: undefined,
  bondStaked: undefined,
  activationRate: undefined,
  thresholdRate: undefined,
};

type DAOContextType = DAOProviderState & {
  daoBarn: DaoBarnContract;
  daoGovernance: DaoGovernanceContract;
  daoReward: DaoRewardContract;
  actions: {
    activate: () => Promise<void>;
    hasActiveProposal: () => Promise<boolean>;
    hasThreshold(): boolean | undefined;
  };
};

const Context = React.createContext<DAOContextType>(InvariantContext('DAOProvider'));

export function useDAO(): DAOContextType {
  return React.useContext(Context);
}

const DAOProvider: React.FC = props => {
  const { children } = props;

  const config = useConfig();
  const walletCtx = useWallet();

  const daoBarn = useContract<DaoBarnContract>(config.contracts.dao?.barn!, () => {
    return new DaoBarnContract(config.contracts.dao?.barn!);
  });
  const daoGovernance = useContract<DaoGovernanceContract>(config.contracts.dao?.governance!, () => {
    return new DaoGovernanceContract(config.contracts.dao?.governance!);
  });
  const daoReward = useContract<DaoRewardContract>(config.contracts.dao?.reward!, () => {
    return new DaoRewardContract(config.contracts.dao?.reward!);
  });
  const { projectToken } = useKnownTokens();

  const [state, setState] = useMergeState<DAOProviderState>(InitialState);

  React.useEffect(() => {
    daoGovernance.loadCommonData();
    daoReward.loadCommonData();
    daoBarn.loadCommonData();
  }, []);

  React.useEffect(() => {
    const bondContract = projectToken.contract as Erc20Contract;

    bondContract.setAccount(walletCtx.account); // ?

    if (walletCtx.account) {
      daoGovernance.loadUserData();
      daoReward.loadUserData();
      daoBarn.loadUserData();
      bondContract.loadAllowance(config.contracts.dao?.barn!).catch(Error);
    }
  }, [walletCtx.account]);

  React.useEffect(() => {
    const { isActive } = daoGovernance;
    const { bondStaked, votingPower } = daoBarn;
    const activationThreshold = config.dao?.activationThreshold;

    let activationRate: number | undefined;

    if (bondStaked && activationThreshold && activationThreshold > 0) {
      activationRate = bondStaked.multipliedBy(100).div(activationThreshold).toNumber();
      activationRate = Math.min(activationRate!, 100);
    }

    let thresholdRate: number | undefined;

    if (votingPower && bondStaked?.gt(BigNumber.ZERO)) {
      thresholdRate = votingPower.multipliedBy(100).div(bondStaked).toNumber();
      thresholdRate = Math.min(thresholdRate!, 100);
    }

    setState({
      isActive,
      bondStaked,
      activationRate,
      thresholdRate,
    });
  }, [daoGovernance.isActive, daoBarn.bondStaked, daoBarn.votingPower]);

  function activate() {
    return daoGovernance.activate().then(() => {
      // daoGovernance.reload(); /// TODO: check
      // daoBarn.reload(); /// TODO: check
    });
  }

  function hasActiveProposal(): Promise<boolean> {
    if (!walletCtx.account) {
      return Promise.resolve(false);
    }

    return daoGovernance.getLatestProposalIds(walletCtx.account).then(proposalId => {
      if (!proposalId) {
        return Promise.resolve(false);
      }

      return daoGovernance.getState(proposalId).then(proposalState => {
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
    <Context.Provider
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
    </Context.Provider>
  );
};

export default DAOProvider;
