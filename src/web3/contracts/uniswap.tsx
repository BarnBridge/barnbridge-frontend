import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';
import { useWallet } from 'web3/wallet';
import Web3Contract from 'web3/contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { BONDTokenMeta } from 'web3/contracts/bond';

import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

export const CONTRACT_UNISWAP_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

export const UNISWAPTokenMeta: TokenMeta = {
  icon: <UNISWAPIcon key="uniswap" />,
  name: 'USDC_BOND_UNI_LP',
  address: CONTRACT_UNISWAP_ADDR,
  decimals: 18,
};

type UNISWAPContractData = {
  totalSupply?: BigNumber;
  usdcReserve?: BigNumber;
  bondReserve?: BigNumber;
  balance?: BigNumber;
  allowance?: BigNumber;
};

export type UNISWAPContract = UNISWAPContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(value: BigNumber): Promise<any>;
};

const InitialData: UNISWAPContractData = {
  totalSupply: undefined,
  usdcReserve: undefined,
  bondReserve: undefined,
  balance: undefined,
  allowance: undefined,
};

export function useUNISWAPContract(): UNISWAPContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/uniswap_v2.json'),
      CONTRACT_UNISWAP_ADDR,
      'UNISWAP',
    );
  }, []);

  const [data, setData] = React.useState<UNISWAPContractData>(InitialData);

  useAsyncEffect(async () => {
    const [totalSupply, reserves, token0, token1] = await contract.batch([
      {
        method: 'totalSupply',
        transform: (value: string) => getHumanValue(new BigNumber(value), UNISWAPTokenMeta.decimals),
      },
      {
        method: 'getReserves',
        transform: (value: string[]) => [
          new BigNumber(value[0]),
          new BigNumber(value[1]),
        ],
      },
      {
        method: 'token0',
        transform: (value: string) => value.toLowerCase(),
      },
      {
        method: 'token1',
        transform: (value: string) => value.toLowerCase(),
      },
    ]);

    let usdcReserve: BigNumber | undefined;
    let bondReserve: BigNumber | undefined;

    if (token0 === USDCTokenMeta.address) {
      usdcReserve = getHumanValue(reserves[0], USDCTokenMeta.decimals);
      bondReserve = getHumanValue(reserves[1], BONDTokenMeta.decimals);
    } else if (token1 === USDCTokenMeta.address) {
      usdcReserve = getHumanValue(reserves[1], USDCTokenMeta.decimals);
      bondReserve = getHumanValue(reserves[0], BONDTokenMeta.decimals);
    }

    setData(prevState => ({
      ...prevState,
      totalSupply,
      usdcReserve,
      bondReserve,
    }));
  }, []);

  useAsyncEffect(async () => {
    let balance: BigNumber | undefined;
    let allowance: BigNumber | undefined;

    if (wallet.account) {
      [balance, allowance] = await contract.batch([
        {
          method: 'balanceOf',
          methodArgs: [wallet.account],
          transform: (value: string) => getHumanValue(new BigNumber(value), UNISWAPTokenMeta.decimals),
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

  return React.useMemo<UNISWAPContract>(() => ({
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
