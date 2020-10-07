import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';

export type DAIContract = {
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  balance?: BigNumber;
};

const InitialDataState: DAIContract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  balance: undefined,
};

const Contract = createContract(
  require('web3/abi/dai.json'),
  String(process.env.REACT_APP_CONTRACT_DAI_ADDR),
);

export function useDAIContract(account?: string): DAIContract {
  const [data, setData] = React.useState<DAIContract>(InitialDataState);

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
