import React from 'react';
import BigNumber from 'bignumber.js';
import YF_LP_ABI from 'web3/abi/yield_farm_lp.json';
import { BONDTokenMeta } from 'web3/contracts/bond';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contracts/web3Contract';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_YIELD_FARM_LP_ADDR = String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR);

const Contract = new Web3Contract(YF_LP_ABI as Web3ContractAbiItem[], CONTRACT_YIELD_FARM_LP_ADDR, 'YIELD_FARM_LP');

type YieldFarmLPContractData = {
  isEnded?: boolean;
  endDate?: number;
  delayedEpochs?: number;
  totalEpochs?: number;
  totalReward?: BigNumber;
  epochReward?: BigNumber;
  nextCurrentEpoch?: number;
  currentEpoch?: number;
  bondReward?: BigNumber;
  poolSize?: BigNumber;
  nextPoolSize?: BigNumber;
  epochStake?: BigNumber;
  nextEpochStake?: BigNumber;
  currentReward?: BigNumber;
  potentialReward?: BigNumber;
};

export type YieldFarmLPContract = YieldFarmLPContractData & {
  contract: Web3Contract;
  massHarvestSend: () => void;
  reload: () => void;
};

const InitialData: YieldFarmLPContractData = {
  isEnded: undefined,
  endDate: undefined,
  delayedEpochs: undefined,
  totalEpochs: undefined,
  totalReward: undefined,
  epochReward: undefined,
  nextCurrentEpoch: undefined,
  currentEpoch: undefined,
  bondReward: undefined,
  poolSize: undefined,
  nextPoolSize: undefined,
  epochStake: undefined,
  nextEpochStake: undefined,
  currentReward: undefined,
  potentialReward: undefined,
};

export function useYieldFarmLPContract(): YieldFarmLPContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<YieldFarmLPContractData>(InitialData);

  React.useEffect(() => {
    (async () => {
      let [totalEpochs, totalReward, epochStart, epochDuration, currentEpoch] = await Contract.batch([
        {
          method: 'NR_OF_EPOCHS',
          transform: (value: string) => Number(value),
        },
        {
          method: 'TOTAL_DISTRIBUTED_AMOUNT',
          transform: (value: string) => new BigNumber(value),
        },
        {
          method: 'epochStart',
          transform: (value: string) => Number(value),
        },
        {
          method: 'epochDuration',
          transform: (value: string) => Number(value),
        },
        {
          method: 'getCurrentEpoch',
          transform: (value: string) => Number(value),
        },
      ]);

      const nextCurrentEpoch = currentEpoch;
      const isEnded = currentEpoch > totalEpochs;
      const endDate = (epochStart + totalEpochs * epochDuration) * 1_000;

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
        endDate,
        delayedEpochs: 1,
        totalEpochs,
        totalReward,
        epochReward,
        nextCurrentEpoch,
        currentEpoch,
        bondReward,
      }));

      const [poolSize, nextPoolSize] = await Contract.batch([
        {
          method: 'getPoolSize',
          methodArgs: [nextCurrentEpoch],
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
        {
          method: 'getPoolSize',
          methodArgs: [nextCurrentEpoch + 1],
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
      ]);

      setData(prevState => ({
        ...prevState,
        poolSize,
        nextPoolSize,
      }));
    })();
  }, [reload]);

  React.useEffect(() => {
    (async () => {
      const { nextCurrentEpoch } = data;

      let epochStake: BigNumber | undefined;
      let nextEpochStake: BigNumber | undefined;
      let currentReward: BigNumber | undefined;

      if (wallet.account && nextCurrentEpoch !== undefined) {
        [epochStake, nextEpochStake, currentReward] = await Contract.batch([
          {
            method: 'getEpochStake',
            methodArgs: [wallet.account, nextCurrentEpoch],
            transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
          },
          {
            method: 'getEpochStake',
            methodArgs: [wallet.account, nextCurrentEpoch + 1],
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
    })();
  }, [reload, wallet.account, data.nextCurrentEpoch]);

  React.useEffect(() => {
    (async () => {
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
    })();
  }, [reload, data.epochStake, data.poolSize, data.epochReward]);

  const massHarvestSend = React.useCallback(() => {
    if (!wallet.account) {
      return Promise.reject();
    }

    return Contract.send('massHarvest', [], {
      from: wallet.account,
    }).then(reload);
  }, [reload, Contract, wallet.account]);

  return React.useMemo<YieldFarmLPContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      massHarvestSend,
    }),
    [data, Contract, reload, massHarvestSend],
  );
}
