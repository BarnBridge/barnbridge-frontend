import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';

import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();

export const DAITokenMeta: TokenMeta = {
  icon: <DAIIcon key="dai" />,
  name: 'DAI',
  address: CONTRACT_DAI_ADDR,
  decimals: 18,
};

type DAIContractData = {
  balance?: BigNumber;
  allowance?: BigNumber;
};

export type DAIContract = DAIContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(value: BigNumber): Promise<any>;
};

const InitialData: DAIContractData = {
  balance: undefined,
  allowance: undefined,
};

export function useDAIContract(): DAIContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/dai.json'),
      CONTRACT_DAI_ADDR,
      'DAI',
    );
  }, []);

  const [data, setData] = React.useState<DAIContractData>(InitialData);

  useAsyncEffect(async () => {
    let balance: BigNumber | undefined;
    let allowance: BigNumber | undefined;

    if (wallet.account) {
      [balance, allowance] = await contract.batch([
        {
          method: 'balanceOf',
          methodArgs: [wallet.account],
          transform: (value: string) => getHumanValue(new BigNumber(value), DAITokenMeta.decimals),
        },
        {
          method: 'allowance',
          methodArgs: [wallet.account, CONTRACT_STAKING_ADDR],
          transform: (value: string) => new BigNumber(value),
        },
      ]);
    }

    setData(prevState => ({
      ...prevState,
      balance,
      allowance,
    }));
  }, [reload, wallet.account]);

  const approveSend = React.useCallback((value: BigNumber): Promise<any> => {
    if (!wallet.account) {
      return Promise.reject();
    }

    return contract.send('approve', [
      CONTRACT_STAKING_ADDR,
      value,
    ], {
      from: wallet.account,
    }).then(reload);
  }, [reload, contract, wallet.account]);

  return React.useMemo<DAIContract>(() => ({
    ...data,
    contract,
    reload,
    approveSend,
  }), [
    data,
    contract,
    reload,
    approveSend,
  ]);
}
