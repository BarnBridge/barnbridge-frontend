import React from 'react';
import BigNumber from 'bignumber.js';

import { batchCallContract, callContract, createContract } from 'web3/utils';

export type YieldFarmLPContract = {
  totalEpochs?: number;
  bondRewards?: BigNumber;
  epochReward?: BigNumber;
  currentEpoch?: number;
  poolSize?: BigNumber;
  epochStake?: BigNumber;
  currentReward?: BigNumber;
};

const Contract = createContract(
  require('web3/abi/yield_farm_lp.json'),
  String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR),
);

const InitialDataState: YieldFarmLPContract = {
  totalEpochs: undefined,
  bondRewards: undefined,
  epochReward: undefined,
  currentEpoch: undefined,
  poolSize: undefined,
  epochStake: undefined,
  currentReward: undefined,
};

export function useYieldFarmLPContract(account?: string): YieldFarmLPContract {
  const [data, setData] = React.useState<YieldFarmLPContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [totalEpochs, bondRewards, currentEpoch, massHarvest] = await batchCallContract(Contract, [
        'NR_OF_EPOCHS', 'TOTAL_DISTRIBUTED_AMOUNT', 'getCurrentEpoch', 'massHarvest',
      ]);
      const poolSize = await callContract(Contract, 'getPoolSize', currentEpoch);

      setData(prevState => ({
        ...prevState,
        totalEpochs,
        bondRewards: new BigNumber(bondRewards),
        epochReward: (new BigNumber(bondRewards)).div(totalEpochs),
        currentEpoch: Number(currentEpoch),
        poolSize: new BigNumber(poolSize),
        currentReward: new BigNumber(massHarvest),
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account || !data?.currentEpoch) {
      return;
    }

    (async () => {
      const epochStake = await callContract(Contract, 'getEpochStake', account, data.currentEpoch);

      setData(prevState => ({
        ...prevState,
        epochStake: new BigNumber(epochStake),
      }));
    })();
  }, [account, data?.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
}
