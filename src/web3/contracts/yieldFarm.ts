import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract, ZERO_BIG_NUMBER } from 'web3/utils';

export type YieldFarmContract = {
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
  reload: () => void;
};

const Contract = createContract(
  require('web3/abi/yield_farm.json'),
  String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR),
);

export function useYieldFarmContract(account?: string): YieldFarmContract {
  const [data, setData] = React.useState<YieldFarmContract>({} as any);
  const [version, setVersion] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      let [totalEpochs, totalRewards, currentEpoch] = await batchContract(Contract, [
        'NR_OF_EPOCHS',
        'TOTAL_DISTRIBUTED_AMOUNT',
        'getCurrentEpoch',
      ]);

      if (Number(currentEpoch) > Number(totalEpochs)) {
        currentEpoch = totalEpochs;
      }

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
  }, [version, account, data.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!assertValues(data.epochStake, data.poolSize, data.epochReward)) {
      return;
    }

    if (data.poolSize?.isEqualTo(ZERO_BIG_NUMBER)) {
      return setData(prevState => ({
        ...prevState,
        potentialReward: ZERO_BIG_NUMBER,
      }));
    }

    const potentialReward = data.epochStake!
      .div(data.poolSize!)
      .multipliedBy(data.epochReward!);

    setData(prevState => ({
      ...prevState,
      potentialReward,
    }));
  }, [version, data.epochStake, data.poolSize, data.epochReward]);

  React.useEffect(() => {
    if (!assertValues(data.epochReward, data.currentEpoch)) {
      return;
    }

    let bondReward = ZERO_BIG_NUMBER;

    if (data.currentEpoch! > 0) {
      const bondEpoch = data.currentEpoch === data.totalEpochs ? data.currentEpoch : data.currentEpoch! - 1;
      bondReward = data.epochReward!.multipliedBy(bondEpoch!);
    }

    setData(prevState => ({
      ...prevState,
      bondReward,
    }));
  }, [version, data.epochReward, data.currentEpoch, data.totalEpochs]);

  const reload = React.useCallback(() => {
    setVersion(prevState => prevState + 1);
  }, []);

  function massHarvestSend() {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'massHarvest', [], {
      from: account,
    })
      .then(async () => {
        reload();
      });
  }

  return {
    ...data,
    massHarvestSend,
    reload,
  };
}
