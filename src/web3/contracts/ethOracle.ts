import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, createContract, getHumanValue, getRpcUrl } from 'web3/utils';

export type EthOracleContract = {
  name?: string;
  decimals?: number;
  latestAnswer?: BigNumber;
  value?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/eth_oracle.json'),
  String(process.env.REACT_APP_CONTRACT_ETH_ORACLE_ADDR),
  getRpcUrl(1),
);

const InitialDataState: EthOracleContract = {
  name: undefined,
  decimals: undefined,
  latestAnswer: undefined,
  value: undefined,
};

export function useETHOracleContract(): EthOracleContract {
  const [data, setData] = React.useState<EthOracleContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [description, decimals, latestAnswer] = await batchCallContract(Contract, [
        'description', 'decimals', 'latestAnswer',
      ]);

      setData(prevState => ({
        ...prevState,
        name: description,
        decimals: Number(decimals),
        latestAnswer: new BigNumber(latestAnswer),
        value: getHumanValue(new BigNumber(latestAnswer), Number(decimals)),
      }));
    })();
  }, []);

  return data;
}
