import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';

export type USDCContract = {
  symbol?: string;
  decimals?: number;
  totalSupply?: BigNumber;
  balance?: BigNumber;
};

const InitialDataState: USDCContract = {
  symbol: undefined,
  decimals: undefined,
  totalSupply: undefined,
  balance: undefined,
};

const Contract = createContract(
  require('web3/abi/usdc.json'),
  String(process.env.REACT_APP_CONTRACT_USDC_ADDR),
);

export function useUSDCContract(account?: string): USDCContract {
  const [data, setData] = React.useState<USDCContract>(InitialDataState);

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
