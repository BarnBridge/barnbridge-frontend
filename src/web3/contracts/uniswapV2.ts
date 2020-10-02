import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

export type UniswapV2Contract = {
  symbol?: string;
  name?: string;
  totalSupply?: BigNumber;
  decimals?: number;
  reserves?: BigNumber[];
  balance?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/uniswap_v2.json'),
  String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR),
);

const InitialDataState: UniswapV2Contract = {
  symbol: undefined,
  name: undefined,
  totalSupply: undefined,
  decimals: undefined,
  reserves: undefined,
  balance: undefined,
};

export function useUniswapV2Contract(account?: string): UniswapV2Contract {
  const [data, setData] = React.useState<UniswapV2Contract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [symbol, name, totalSupply, decimals, reserves] = await batchCallContract(Contract, [
        'symbol', 'name', 'totalSupply', 'decimals', 'getReserves',
      ]);

      setData(prevState => ({
        ...prevState,
        symbol,
        name,
        totalSupply: new BigNumber(totalSupply),
        decimals: Number(decimals),
        reserves: reserves ? [new BigNumber(reserves[0]), new BigNumber(reserves[1])] : undefined,
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account) {
      return;
    }

    (async () => {
      const balance = await callContract(Contract, 'balanceOf', account);

      setData(prevState => ({
        ...prevState!,
        balance: new BigNumber(balance),
      }));
    })();
  }, [account]);

  return data;
}
