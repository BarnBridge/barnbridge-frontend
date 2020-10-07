import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';

const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

export type UniswapV2Contract = {
  symbol?: string;
  totalSupply?: BigNumber;
  decimals?: number;
  usdcReserve?: BigNumber;
  bondReserve?: BigNumber;
  balance?: BigNumber;
  lastBlockTime?: number;
};

const InitialDataState: UniswapV2Contract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  usdcReserve: undefined,
  bondReserve: undefined,
  balance: undefined,
  lastBlockTime: undefined,
};

const Contract = createContract(
  require('web3/abi/uniswap_v2.json'),
  String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR),
);

export function useUniswapV2Contract(account?: string): UniswapV2Contract {
  const [data, setData] = React.useState<UniswapV2Contract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [symbol, decimals, totalSupply, reserves, token0, token1] = await batchContract(Contract, [
        'symbol',
        'decimals',
        'totalSupply',
        'getReserves',
        'token0',
        'token1',
      ]);

      let usdcReserve: BigNumber;
      let bondReserve: BigNumber;

      if (String(token0).toLowerCase() === CONTRACT_USDC_ADDR) {
        usdcReserve = new BigNumber(reserves[0]);
        bondReserve = new BigNumber(reserves[1]);
      } else if (String(token1).toLowerCase() === CONTRACT_USDC_ADDR) {
        usdcReserve = new BigNumber(reserves[1]);
        bondReserve = new BigNumber(reserves[0]);
      }

      setData(prevState => ({
        ...prevState,
        symbol,
        decimals: Number(decimals),
        totalSupply: getHumanValue(new BigNumber(totalSupply), Number(decimals)),
        usdcReserve: getHumanValue(usdcReserve, 6), // TODO: get decimals from USDC contract
        bondReserve: getHumanValue(bondReserve, 18), // TODO: get decimals from BOND contract
        lastBlockTime: Number(reserves[2]) * 1000,
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!assertValues(account, data.decimals)) {
      return;
    }

    (async () => {
      const [balance] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account] },
      ]);

      setData(prevState => ({
        ...prevState,
        balance: getHumanValue(new BigNumber(balance), data.decimals),
      }));
    })();
  }, [account, data.decimals]);

  return data;
}
