import React from 'react';
import BigNumber from 'bignumber.js';
import UNISWAP_ABI from 'web3/abi/uniswap_v2.json';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contracts/web3Contract';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_UNISWAP_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

const Contract = new Web3Contract(UNISWAP_ABI as Web3ContractAbiItem[], CONTRACT_UNISWAP_ADDR, 'UNISWAP');

export const UNISWAPTokenMeta: TokenMeta = {
  icon: <Icon key="uniswap" name="token-uniswap" />,
  name: 'USDC_BOND_UNI_LP',
  address: CONTRACT_UNISWAP_ADDR,
  decimals: 18,
};

type UNISWAPContractData = {
  totalSupply?: BigNumber;
  usdcReserve?: BigNumber;
  bondReserve?: BigNumber;
  stablePrice: BigNumber;
  unilpPrice?: BigNumber;
  bondPrice?: BigNumber;
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
  stablePrice: new BigNumber(1),
  unilpPrice: undefined,
  bondPrice: undefined,
  balance: undefined,
  allowance: undefined,
};

export function useUNISWAPContract(): UNISWAPContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<UNISWAPContractData>(InitialData);

  React.useEffect(() => {
    (async () => {
      const [totalSupply, reserves, token0, token1] = await Contract.batch([
        {
          method: 'totalSupply',
          transform: (value: string) => getHumanValue(new BigNumber(value), UNISWAPTokenMeta.decimals),
        },
        {
          method: 'getReserves',
          transform: (value: string[]) => [new BigNumber(value[0]), new BigNumber(value[1])],
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

      const lpPrice = usdcReserve?.div(totalSupply ?? 1).multipliedBy(2);

      const bondPrice = usdcReserve?.div(bondReserve ?? 1);

      setData(prevState => ({
        ...prevState,
        totalSupply,
        usdcReserve,
        unilpPrice: lpPrice,
        bondReserve,
        bondPrice,
      }));
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      let balance: BigNumber | undefined;
      let allowance: BigNumber | undefined;

      if (wallet.account) {
        [balance, allowance] = await Contract.batch([
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
    })();
  }, [reload, wallet.account]);

  const approveSend = React.useCallback(
    (value: BigNumber): Promise<any> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return Contract.send('approve', [CONTRACT_STAKING_ADDR, value], {
        from: wallet.account,
      }).then(reload);
    },
    [reload, Contract, wallet.account],
  );

  return React.useMemo<UNISWAPContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      approveSend,
    }),
    [data, Contract, reload, approveSend],
  );
}
