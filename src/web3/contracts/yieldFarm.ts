import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';

export type YieldFarmContract = {
  totalEpochs?: number;
  totalRewards?: BigNumber;
  epochReward?: BigNumber;
  currentEpoch?: number;
  poolSize?: BigNumber;
  epochStake?: BigNumber;
  currentReward?: BigNumber;
  potentialReward?: BigNumber;
  bondReward?: BigNumber;
  massHarvestSend: () => void;
};

const Contract = createContract(
  require('web3/abi/yield_farm.json'),
  String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR),
);

export function useYieldFarmContract(account?: string): YieldFarmContract {
  const [data, setData] = React.useState<YieldFarmContract>({} as any);

  function massHarvestSend() {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'massHarvest', [], {
      from: account,
    });
  }

  React.useEffect(() => {
    (async () => {
      const [totalEpochs, totalRewards, currentEpoch] = await batchContract(Contract, [
        'NR_OF_EPOCHS',
        'TOTAL_DISTRIBUTED_AMOUNT',
        'getCurrentEpoch',
      ]);
      const [poolSize] = await batchContract(Contract, [
        { method: 'getPoolSize', methodArgs: [currentEpoch] },
      ]);

      setData(prevState => ({
        ...prevState,
        totalEpochs: Number(totalEpochs),
        totalRewards: new BigNumber(totalRewards),
        epochReward: (new BigNumber(totalRewards)).div(totalEpochs),
        currentEpoch: Number(currentEpoch),
        poolSize: getHumanValue(new BigNumber(poolSize), 18), // TODO: get decimals from ? contract
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!assertValues(account, data.currentEpoch)) {
      return;
    }

    (async () => {
      const [epochStake, massHarvest] = await batchContract(Contract, [
        { method: 'getEpochStake', methodArgs: [account, data.currentEpoch] },
        { method: 'massHarvest', callArgs: { from: account } },
      ]);

      setData(prevState => ({
        ...prevState,
        epochStake: getHumanValue(new BigNumber(epochStake), 18), // TODO: get decimals from ? contract
        currentReward: getHumanValue(new BigNumber(massHarvest), 18), // TODO: get decimals from ? contract
      }));
    })();
  }, [account, data.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!assertValues(data.epochStake, data.poolSize, data.epochReward)) {
      return;
    }

    const potentialReward = data.epochStake!
      .div(data.poolSize!)
      .multipliedBy(data.epochReward!);

    setData(prevState => ({
      ...prevState,
      potentialReward,
    }));
  }, [data.epochStake, data.poolSize, data.epochReward]);

  React.useEffect(() => {
    if (!assertValues(data.epochReward, data.currentEpoch)) {
      return;
    }

    setData(prevState => ({
      ...prevState,
      bondReward: data.epochReward!.multipliedBy(data.currentEpoch! - 1),
    }));
  }, [data.epochReward, data.currentEpoch]);

  return {
    ...data,
    massHarvestSend,
  };
}
