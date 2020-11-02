import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { useVersion } from 'hooks/useVersion';

export const CONTRACT_YIELD_FARM_LP_ADDR = String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR);

const Contract = createContract(
  require('web3/abi/yield_farm_lp.json'),
  CONTRACT_YIELD_FARM_LP_ADDR,
);

export type YieldFarmLPContractType = {
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

export function useYieldFarmLPContract(): YieldFarmLPContractType {
  const { account } = useWeb3();
  const { version, incVersion } = useVersion();

  const [data, setData] = React.useState<YieldFarmLPContractType>({} as any);

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
        poolSize: getHumanValue(new BigNumber(poolSize), BONDTokenMeta.decimals),
        nextPoolSize: getHumanValue(new BigNumber(nextPoolSize), BONDTokenMeta.decimals),
      }));
    })();
  }, [version]);

  React.useEffect(() => {
    if (!assertValues(account, data.currentEpoch)) {
      setData(prevState => ({
        ...prevState,
        epochStake: undefined,
        nextEpochStake: undefined,
        currentReward: undefined,
      }));

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
        epochStake: getHumanValue(new BigNumber(epochStake), BONDTokenMeta.decimals),
        nextEpochStake: getHumanValue(new BigNumber(nextEpochStake), BONDTokenMeta.decimals),
        currentReward: getHumanValue(new BigNumber(massHarvest), BONDTokenMeta.decimals),
      }));
    })();
  }, [version, account, data.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!assertValues(data.epochStake, data.poolSize, data.epochReward)) {
      setData(prevState => ({
        ...prevState,
        potentialReward: undefined,
      }));
      return;
    }

    if (data.poolSize?.isEqualTo(ZERO_BIG_NUMBER)) {
      setData(prevState => ({
        ...prevState,
        potentialReward: ZERO_BIG_NUMBER,
      }));
      return;
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
      setData(prevState => ({
        ...prevState,
        bondReward: undefined,
      }));
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

  const massHarvestSend = React.useCallback(() => {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'massHarvest', [], {
      from: account,
    })
      .then(async () => {
        incVersion();
      });
  }, [account, incVersion]);

  return React.useMemo(() => ({
    ...data,
    massHarvestSend,
    reload: incVersion,
  }), [data, massHarvestSend, incVersion]);
}
