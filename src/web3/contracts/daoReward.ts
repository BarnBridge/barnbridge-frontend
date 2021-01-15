import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { ZERO_BIG_NUMBER } from 'web3/utils';
import Web3Contract from 'web3/contract';

const CONTRACT_DAO_REWARD_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR).toLowerCase();

type DAORewardContractData = {
  claim?: BigNumber;
};

export type DAORewardContract = DAORewardContractData & {
  contract: Web3Contract;
  reload(): void;
  claimSend(): Promise<any>;
};

const InitialData: DAORewardContractData = {};

export function useDAORewardContract(): DAORewardContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/dao_reward.json'),
      CONTRACT_DAO_REWARD_ADDR,
      'DAO Reward',
    );
  }, []);

  const [data, setData] = React.useState<DAORewardContractData>(InitialData);

  useAsyncEffect(async () => {
    let claim: BigNumber | undefined;

    if (wallet.account) {
      [claim] = await contract.batch([
        {
          method: 'claim',
          transform: (value: string) => new BigNumber(value),
          onError: () => ZERO_BIG_NUMBER,
        },
      ]);
    }

    setData(prevState => ({
      ...prevState,
      claim,
    }));
  }, [reload, wallet.account]);

  const claimSend = React.useCallback((): Promise<any> => {
    if (!wallet.account) {
      return Promise.reject();
    }

    return contract.send('claim', [], {
      from: wallet.account,
    }).then(reload);
  }, [reload, contract, wallet.account]);

  return React.useMemo<DAORewardContract>(() => ({
    ...data,
    contract,
    reload,
    claimSend,
  }), [
    data,
    contract,
    reload,
    claimSend,
  ]);
}
