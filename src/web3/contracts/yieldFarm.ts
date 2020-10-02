import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

export type YieldFarmContract = {
  totalEpochs?: number;
  bondRewards?: BigNumber;
  epochReward?: BigNumber;
  currentEpoch?: number;
  poolSize?: BigNumber;
  epochStake?: BigNumber;
  currentReward?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/yield_farm.json'),
  String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR),
);

const InitialDataState: YieldFarmContract = {
  totalEpochs: undefined,
  bondRewards: undefined,
  epochReward: undefined,
  currentEpoch: undefined,
  poolSize: undefined,
  epochStake: undefined,
  currentReward: undefined,
};

export function useYieldFarmContract(account?: string): YieldFarmContract {
  const [data, setData] = React.useState<YieldFarmContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [totalEpochs, bondRewards, currentEpoch] = await batchCallContract(Contract, [
        'NR_OF_EPOCHS', 'TOTAL_DISTRIBUTED_AMOUNT', 'getCurrentEpoch',
      ]);
      const poolSize = await callContract(Contract, 'getPoolSize', [currentEpoch]);

      setData(prevState => ({
        ...prevState,
        totalEpochs,
        bondRewards: new BigNumber(bondRewards),
        epochReward: (new BigNumber(bondRewards)).div(totalEpochs),
        currentEpoch: Number(currentEpoch),
        poolSize: new BigNumber(poolSize),
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account || !data?.currentEpoch) {
      return;
    }

    (async () => {
      const epochStake = await callContract(Contract, 'getEpochStake', [account, data.currentEpoch]);
      const massHarvest = await callContract(Contract, 'massHarvest', [], { from: account });

      setData(prevState => ({
        ...prevState,
        epochStake: new BigNumber(epochStake),
        currentReward: new BigNumber(massHarvest),
      }));
    })();
  }, [account, data?.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
}
