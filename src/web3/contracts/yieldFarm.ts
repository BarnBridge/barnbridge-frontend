import React from 'react';
import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_YIELD_FARM_ADDR = String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR);

type YieldFarmContractData = {
  isEnded?: boolean;
  totalEpochs?: number;
  totalReward?: BigNumber;
  epochReward?: BigNumber;
  currentEpoch?: number;
  bondReward?: BigNumber;
  poolSize?: BigNumber;
  nextPoolSize?: BigNumber;
  epochStake?: BigNumber;
  nextEpochStake?: BigNumber;
  currentReward?: BigNumber;
  potentialReward?: BigNumber;
};

export type YieldFarmContract = YieldFarmContractData & {
  contract: Web3Contract;
  reload: () => void;
  massHarvestSend: () => void;
};

const InitialData: YieldFarmContractData = {
  isEnded: undefined,
  totalEpochs: undefined,
  totalReward: undefined,
  epochReward: undefined,
  currentEpoch: undefined,
  bondReward: undefined,
  poolSize: undefined,
  nextPoolSize: undefined,
  epochStake: undefined,
  nextEpochStake: undefined,
  currentReward: undefined,
  potentialReward: undefined,
};

export function useYieldFarmContract(): YieldFarmContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(require('web3/abi/yield_farm.json'), CONTRACT_YIELD_FARM_ADDR, 'YIELD_FARM');
  }, []);

  const [data, setData] = React.useState<YieldFarmContractData>(InitialData);

  useAsyncEffect(async () => {
    let [totalEpochs, totalReward, currentEpoch] = await contract.batch([
      {
        method: 'NR_OF_EPOCHS',
        transform: (value: string) => Number(value),
      },
      {
        method: 'TOTAL_DISTRIBUTED_AMOUNT',
        transform: (value: string) => new BigNumber(value),
      },
      {
        method: 'getCurrentEpoch',
        transform: (value: string) => Number(value),
      },
    ]);

    const isEnded = currentEpoch > totalEpochs;

    currentEpoch = Math.min(currentEpoch, totalEpochs);

    const epochReward = totalEpochs !== 0 ? totalReward?.div(totalEpochs) : ZERO_BIG_NUMBER;

    let bondReward = ZERO_BIG_NUMBER;

    if (currentEpoch > 0) {
      const bondEpoch = currentEpoch === totalEpochs ? currentEpoch : currentEpoch - 1;
      bondReward = epochReward.multipliedBy(bondEpoch);
    }

    setData(prevState => ({
      ...prevState,
      isEnded,
      totalEpochs,
      totalReward,
      epochReward,
      currentEpoch,
      bondReward,
    }));

    const [poolSize, nextPoolSize] = await contract.batch([
      {
        method: 'getPoolSize',
        methodArgs: [currentEpoch],
        transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
      },
      {
        method: 'getPoolSize',
        methodArgs: [currentEpoch + 1],
        transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
      },
    ]);

    setData(prevState => ({
      ...prevState,
      poolSize,
      nextPoolSize,
    }));
  }, [reload]);

  useAsyncEffect(async () => {
    const { currentEpoch } = data;

    let epochStake: BigNumber | undefined;
    let nextEpochStake: BigNumber | undefined;
    let currentReward: BigNumber | undefined;

    if (wallet.account && currentEpoch !== undefined) {
      [epochStake, nextEpochStake, currentReward] = await contract.batch([
        {
          method: 'getEpochStake',
          methodArgs: [wallet.account, currentEpoch],
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
        {
          method: 'getEpochStake',
          methodArgs: [wallet.account, currentEpoch + 1],
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
        {
          method: 'massHarvest',
          callArgs: { from: wallet.account },
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
      ]);
    }

    setData(prevState => ({
      ...prevState,
      epochStake,
      nextEpochStake,
      currentReward,
    }));
  }, [reload, wallet.account, data.currentEpoch]);

  useAsyncEffect(async () => {
    const { epochStake, poolSize, epochReward } = data;

    let potentialReward: BigNumber | undefined;

    if (epochStake !== undefined && poolSize !== undefined && epochReward !== undefined) {
      if (poolSize.isEqualTo(ZERO_BIG_NUMBER)) {
        potentialReward = ZERO_BIG_NUMBER;
      } else {
        potentialReward = epochStake.div(poolSize).multipliedBy(epochReward);
      }
    }
    setData(prevState => ({
      ...prevState,
      potentialReward,
    }));
  }, [reload, data.epochStake, data.poolSize, data.epochReward]);

  const massHarvestSend = React.useCallback(() => {
    if (!wallet.account) {
      return Promise.reject();
    }

    return contract
      .send('massHarvest', [], {
        from: wallet.account,
      })
      .then(reload);
  }, [reload, contract, wallet.account]);

  return React.useMemo<YieldFarmContract>(
    () => ({
      ...data,
      contract,
      reload,
      massHarvestSend,
    }),
    [data, contract, reload, massHarvestSend],
  );
}
