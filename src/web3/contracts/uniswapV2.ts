import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

export type UniswapV2Contract = {
  symbol?: string;
  name?: string;
  totalSupply?: BigNumber;
  decimals?: number;
  usdcReserve?: BigNumber;
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
  usdcReserve: undefined,
  balance: undefined,
};

export function useUniswapV2Contract(account?: string): UniswapV2Contract {
  const [data, setData] = React.useState<UniswapV2Contract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [symbol, name, totalSupply, decimals, reserves, token0, token1] = await batchCallContract(Contract, [
        'symbol', 'name', 'totalSupply', 'decimals', 'getReserves', 'token0', 'token1',
      ]);

      let usdcReserve: BigNumber | undefined = undefined;

      if (String(token0).toLowerCase() === CONTRACT_USDC_ADDR) {
        usdcReserve = new BigNumber(reserves[0]);
      } else if (String(token1).toLowerCase() === CONTRACT_USDC_ADDR) {
        usdcReserve = new BigNumber(reserves[1]);
      }

      setData(prevState => ({
        ...prevState,
        symbol,
        name,
        totalSupply: new BigNumber(totalSupply),
        decimals: Number(decimals),
        usdcReserve,
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account) {
      return;
    }

    (async () => {
      const balance = await callContract(Contract, 'balanceOf', [account]);

      setData(prevState => ({
        ...prevState!,
        balance: new BigNumber(balance),
      }));
    })();
  }, [account]);

  return data;
}
