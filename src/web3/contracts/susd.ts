import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';

export type SUSDContract = {
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  balance?: BigNumber;
};

const InitialDataState: SUSDContract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  balance: undefined,
};

const Contract = createContract(
  require('web3/abi/susd.json'),
  String(process.env.REACT_APP_CONTRACT_SUSD_ADDR),
);

export function useSUSDContract(account?: string): SUSDContract {
  const [data, setData] = React.useState<SUSDContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [symbol, decimals, totalSupply] = await batchContract(Contract, [
        'symbol',
        'decimals',
        'totalSupply',
      ]);

      setData(prevState => ({
        ...prevState,
        symbol,
        decimals: Number(decimals),
        totalSupply: getHumanValue(new BigNumber(totalSupply), Number(decimals)),
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
