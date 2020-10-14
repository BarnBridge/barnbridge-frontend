import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';

const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

export type UniswapV2Contract = {
  symbol?: string;
  totalSupply?: BigNumber;
  decimals?: number;
  usdcReserve?: BigNumber;
  bondReserve?: BigNumber;
  balance?: BigNumber;
  lastBlockTime?: number;
  allowance?: BigNumber;
  approveSend: (value: BigNumber) => Promise<any>;
  reload: () => void;
};

const Contract = createContract(
  require('web3/abi/uniswap_v2.json'),
  String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR),
);

export function useUniswapV2Contract(account?: string): UniswapV2Contract {
  const [data, setData] = React.useState<UniswapV2Contract>({} as any);
  const [version, setVersion] = React.useState<number>(0);

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
        lastBlockTime: reserves ? Number(reserves[2]) * 1000 : 0,
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!assertValues(account, data.decimals)) {
      return;
    }

    (async () => {
      const [balance, allowance] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account] },
        { method: 'allowance', methodArgs: [account, process.env.REACT_APP_CONTRACT_STAKING_ADDR] },
      ]);

      setData(prevState => ({
        ...prevState,
        balance: getHumanValue(new BigNumber(balance), data.decimals),
        allowance: new BigNumber(allowance),
      }));
    })();
  }, [version, account, data.decimals]);

  const approveSend = React.useCallback((value: BigNumber): Promise<any> => {
    if (!assertValues(account)) {
      return Promise.reject();
    }

    return sendContract(Contract, 'approve', [
      process.env.REACT_APP_CONTRACT_STAKING_ADDR,
      value,
    ], {
      from: account,
    })
      .then(async () => {
        const [allowance] = await batchContract(Contract, [
          { method: 'allowance', methodArgs: [account, process.env.REACT_APP_CONTRACT_STAKING_ADDR] },
        ]);

        setData(prevState => ({
          ...prevState,
          allowance: new BigNumber(allowance),
        }));
      });
  }, [account]);

  const reload = React.useCallback(() => {
    setVersion(prevState => prevState + 1);
  }, []);

  return React.useMemo(() => ({
    ...data,
    approveSend,
    reload,
  }), [data, approveSend, reload]);
}
