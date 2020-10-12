import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';

export type YieldFarmLPContract = {
  totalEpochs?: number;
  totalRewards?: BigNumber;
  epochReward?: BigNumber;
  currentEpoch?: number;
  poolSize?: BigNumber;
  nextPoolSize?: BigNumber;
  epochStake?: BigNumber;
  nextEpochStake?: BigNumber;
  currentReward?: BigNumber;
  potentialReward?: BigNumber;
  bondReward?: BigNumber;
  massHarvestSend: () => void;
};

const Contract = createContract(
  require('web3/abi/yield_farm_lp.json'),
  String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR),
);

export function useYieldFarmLPContract(account?: string): YieldFarmLPContract {
  const [data, setData] = React.useState<YieldFarmLPContract>({} as any);
  const [version, setVersion] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      const [totalEpochs, totalRewards, currentEpoch] = await batchContract(Contract, [
        'NR_OF_EPOCHS',
        'TOTAL_DISTRIBUTED_AMOUNT',
        'getCurrentEpoch',
      ]);
      const [poolSize, nextPoolSize] = await batchContract(Contract, [
        { method: 'getPoolSize', methodArgs: [currentEpoch] },
        { method: 'getPoolSize', methodArgs: [currentEpoch + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        totalEpochs: Number(totalEpochs),
        totalRewards: new BigNumber(totalRewards),
        epochReward: (new BigNumber(totalRewards)).div(totalEpochs),
        currentEpoch: Number(currentEpoch),
        poolSize: getHumanValue(new BigNumber(poolSize), 18), // TODO: get decimals from ? contract
        nextPoolSize: getHumanValue(new BigNumber(nextPoolSize), 18), // TODO: get decimals from ? contract
      }));
    })();
  }, [version]);

  React.useEffect(() => {
    if (!assertValues(account, data.currentEpoch)) {
      return;
    }

    (async () => {
      const [epochStake, nextEpochStake, massHarvest] = await batchContract(Contract, [
        { method: 'getEpochStake', methodArgs: [account, data.currentEpoch] },
        { method: 'getEpochStake', methodArgs: [account, data.currentEpoch! + 1] },
        { method: 'massHarvest', callArgs: { from: account } },
      ]);

      setData(prevState => ({
        ...prevState,
        epochStake: getHumanValue(new BigNumber(epochStake), 18), // TODO: get decimals from ? contract
        nextEpochStake: getHumanValue(new BigNumber(nextEpochStake), 18), // TODO: get decimals from ? contract
        currentReward: getHumanValue(new BigNumber(massHarvest), 18), // TODO: get decimals from ? contract
      }));
    })();
  }, [account, data.currentEpoch, version]); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [data.epochStake, data.poolSize, data.epochReward, version]);

  React.useEffect(() => {
    if (!assertValues(data.epochReward, data.currentEpoch)) {
      return;
    }

    setData(prevState => ({
      ...prevState,
      bondReward: data.epochReward!.multipliedBy(data.currentEpoch! - 1),
    }));
  }, [data.epochReward, data.currentEpoch, version]);

  function massHarvestSend() {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'massHarvest', [], {
      from: account,
    })
      .then(async () => {
        setVersion(prevState => prevState + 1);
      });
  }

  return {
    ...data,
    massHarvestSend,
  };
}
