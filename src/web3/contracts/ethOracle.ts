import React from 'react';
import BigNumber from 'bignumber.js';

import { batchContract, createContract, getHumanValue, getRpcUrl } from 'web3/utils';

export type EthOracleContract = {
  name?: string;
  decimals?: number;
  value?: BigNumber;
};

const InitialDataState: EthOracleContract = {
  name: undefined,
  decimals: undefined,
  value: undefined,
};

const Contract = createContract(
  require('web3/abi/eth_oracle.json'),
  String(process.env.REACT_APP_CONTRACT_ETH_ORACLE_ADDR),
  getRpcUrl(1),
);

export function useETHOracleContract(): EthOracleContract {
  const [data, setData] = React.useState<EthOracleContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [name, decimals, value] = await batchContract(Contract, [
        'description',
        'decimals',
        'latestAnswer',
      ]);

      setData(prevState => ({
        ...prevState,
        name,
        decimals: Number(decimals),
        value: getHumanValue(new BigNumber(value), Number(decimals)),
      }));
    })();
  }, []);

  return data;
}
