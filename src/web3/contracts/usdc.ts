import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

export type USDCContract = {
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  balance?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/usdc.json'),
  String(process.env.REACT_APP_CONTRACT_USDC_ADDR),
);

const InitialDataState: USDCContract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  balance: undefined,
};

export function useUSDCContract(account?: string): USDCContract {
  const [data, setData] = React.useState<USDCContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [symbol, decimals, totalSupply] = await batchCallContract(Contract, [
        'symbol', 'decimals', 'totalSupply',
      ]);

      setData(prevState => ({
        ...prevState,
        symbol,
        decimals: Number(decimals),
        totalSupply: new BigNumber(totalSupply),
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
        ...prevState,
        balance: new BigNumber(balance),
      }));
    })();
  }, [account]);

  return data;
}
