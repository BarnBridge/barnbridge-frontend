import React from 'react';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import { BondToken } from 'components/providers/known-tokens-provider';
import config from 'config';
import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import DAO_REWARD_ABI from './daoReward.json';

const Contract = new Web3Contract(DAO_REWARD_ABI as Web3ContractAbiItem[], config.contracts.dao.reward, 'DAO Reward');

export type DaoRewardPullFeature = {
  source: string;
  startTs: number;
  endTs: number;
  totalDuration: number;
  totalAmount: BigNumber;
};

function loadCommonData(): Promise<any> {
  return Contract.batch([
    {
      method: 'pullFeature',
      transform: (value: DaoRewardPullFeature) => ({
        ...value,
        totalAmount: getHumanValue(new BigNumber(value.totalAmount), BondToken.decimals),
      }),
    },
  ]).then(([poolFeature]) => {
    return {
      poolFeature,
    };
  });
}

function loadUserData(userAddress?: string): Promise<any> {
  if (!userAddress) {
    return Promise.reject();
  }

  return Contract.batch([
    {
      method: 'claim',
      callArgs: {
        from: userAddress,
      },
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals),
      onError: () => ZERO_BIG_NUMBER,
    },
  ]).then(([claimValue]) => {
    return {
      claimValue,
    };
  });
}

function claimSend(from: string): Promise<void> {
  return Contract.send('claim', [], {
    from,
  });
}

export type DAORewardContractData = {
  contract: Web3Contract;
  claimValue?: BigNumber;
  poolFeature?: DaoRewardPullFeature;
};

const InitialState: DAORewardContractData = {
  contract: Contract,
  claimValue: undefined,
  poolFeature: undefined,
};

export type DAORewardContract = DAORewardContractData & {
  reload(): void;
  actions: {
    claim(): Promise<any>;
    getBondRewards(): BigNumber | undefined;
  };
};

export function useDAORewardContract(): DAORewardContract {
  const wallet = useWallet();

  const [state, setState] = useMergeState<DAORewardContractData>(InitialState);
  const [reload, version] = useReload();

  React.useEffect(() => {
    setState({ poolFeature: undefined });

    loadCommonData().then(setState).catch(Error);
  }, [version, setState]);

  React.useEffect(() => {
    setState({ claimValue: undefined });

    loadUserData(wallet.account).then(setState).catch(Error);
  }, [wallet.account, version, setState]);

  function getBondRewards(): BigNumber | undefined {
    if (!state.poolFeature) {
      return undefined;
    }

    const { startTs, endTs, totalDuration, totalAmount } = state.poolFeature;
    const now = Date.now() / 1_000;

    if (startTs > now) {
      return ZERO_BIG_NUMBER;
    }

    if (endTs <= now) {
      return totalAmount;
    }

    return totalAmount.multipliedBy(now - startTs).div(totalDuration);
  }

  return {
    ...state,
    reload,
    actions: {
      claim(): Promise<void> {
        return wallet.isActive ? claimSend(wallet.account!) : Promise.reject();
      },
      getBondRewards,
    },
  };
}
