import React from 'react';
import BigNumber from 'bignumber.js';

import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';
import { getHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { BONDTokenMeta } from './bond';

const CONTRACT_DAO_REWARD_ADDR = String(
  process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR,
).toLowerCase();

const Contract = new Web3Contract(
  require('web3/abi/dao_reward.json'),
  CONTRACT_DAO_REWARD_ADDR,
  'DAO Reward',
);

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
      transform: (value: string) =>
        getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
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
};

const InitialState: DAORewardContractData = {
  contract: Contract,
  claimValue: undefined,
};

export type DAORewardContract = DAORewardContractData & {
  reload(): void;
  actions: {
    claim(): Promise<any>;
  };
};

export function useDAORewardContract(): DAORewardContract {
  const wallet = useWallet();

  const [state, setState] = useMergeState<DAORewardContractData>(InitialState);
  const [reload, version] = useReload();

  React.useEffect(() => {
    setState({ claimValue: undefined });

    loadUserData(wallet.account).then(setState).catch(Error);
  }, [wallet.account, version]);

  return {
    ...state,
    reload,
    actions: {
      claim(): Promise<void> {
        return wallet.isActive ? claimSend(wallet.account!) : Promise.reject();
      },
    },
  };
}
