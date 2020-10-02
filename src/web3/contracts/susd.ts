import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

export type SUSDContract = {
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  balance?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/susd.json'),
  String(process.env.REACT_APP_CONTRACT_SUSD_ADDR),
);

const InitialDataState: SUSDContract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  balance: undefined,
};

export function useSUSDContract(account?: string): SUSDContract {
  const [data, setData] = React.useState<SUSDContract>(InitialDataState);

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
