import React from 'react';
import BigNumber from 'bignumber.js';

import Icons from 'components/custom/icon';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';

const CONTRACT_USDC_ADDR = String(
  process.env.REACT_APP_CONTRACT_USDC_ADDR,
).toLowerCase();

export const USDCTokenMeta: TokenMeta = {
  icon: <Icons key="usdc" name="usdc-token" />,
  name: 'USDC',
  address: CONTRACT_USDC_ADDR,
  decimals: 6,
};

type USDCContractData = {
  balance?: BigNumber;
  allowance?: BigNumber;
};

export type USDCContract = USDCContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(value: BigNumber): Promise<any>;
};

const InitialData: USDCContractData = {
  balance: undefined,
  allowance: undefined,
};

export function useUSDCContract(): USDCContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/usdc.json'),
      CONTRACT_USDC_ADDR,
      'USDC',
    );
  }, []);

  const [data, setData] = React.useState<USDCContractData>(InitialData);

  useAsyncEffect(async () => {
    let balance: BigNumber | undefined;
    let allowance: BigNumber | undefined;

    if (wallet.account) {
      [balance, allowance] = await contract.batch([
        {
          method: 'balanceOf',
          methodArgs: [wallet.account],
          transform: (value: string) =>
            getHumanValue(new BigNumber(value), USDCTokenMeta.decimals),
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

  const approveSend = React.useCallback(
    (value: BigNumber): Promise<any> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return contract
        .send('approve', [CONTRACT_STAKING_ADDR, value], {
          from: wallet.account,
        })
        .then(reload);
    },
    [reload, contract, wallet.account],
  );

  return React.useMemo<USDCContract>(
    () => ({
      ...data,
      contract,
      reload,
      approveSend,
    }),
    [data, contract, reload, approveSend],
  );
}
