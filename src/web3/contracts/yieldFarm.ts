import React from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { BONDTokenMeta } from 'web3/contracts/bond';
import Web3Contract, { createAbiItem } from 'web3/contracts/web3Contract';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_YIELD_FARM_ADDR = String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR);

const ABI: AbiItem[] = [
  createAbiItem('NR_OF_EPOCHS', [], ['uint256']),
  createAbiItem('TOTAL_DISTRIBUTED_AMOUNT', [], ['uint256']),
  createAbiItem('epochDuration', [], ['uint256']),
  createAbiItem('epochStart', [], ['uint256']),
  createAbiItem('getCurrentEpoch', [], ['uint256']),
  createAbiItem('getPoolSize', ['uint128'], ['uint256']),
  createAbiItem('getEpochStake', ['address', 'uint128'], ['uint256']),
  createAbiItem('massHarvest', [], ['uint256']),
];

export class YFContract extends Web3Contract {
  constructor() {
    super(ABI, CONTRACT_YIELD_FARM_ADDR, 'YIELD FARM');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      // reset user data
      this.currentEpochStake = undefined;
      this.nextEpochStake = undefined;
      this.toClaim = undefined;
    });
  }

  // common data
  totalEpochs?: number;
  totalForDistribution?: BigNumber;
  epochDuration?: number;
  epochStart?: number;
  currentEpoch?: number;
  currentPoolSize?: BigNumber;
  nextPoolSize?: BigNumber;

  // user data
  currentEpochStake?: BigNumber;
  nextEpochStake?: BigNumber;
  toClaim?: BigNumber;

  // computed data
  get lastActiveEpoch(): number | undefined {
    if (this.currentEpoch === undefined || this.totalEpochs === undefined) {
      return undefined;
    }

    return Math.min(this.currentEpoch, this.totalEpochs);
  }

  get isPoolEnded(): boolean | undefined {
    if (this.currentEpoch === undefined || this.totalEpochs === undefined) {
      return undefined;
    }

    return this.currentEpoch > this.totalEpochs;
  }

  get poolEndDate(): number | undefined {
    if (this.epochStart === undefined || this.totalEpochs === undefined || this.epochDuration === undefined) {
      return undefined;
    }

    return this.epochStart + this.totalEpochs * this.epochDuration;
  }

  get epochReward(): BigNumber | undefined {
    if (this.totalForDistribution === undefined || this.totalEpochs === undefined || this.totalEpochs === 0) {
      return undefined;
    }

    return this.totalForDistribution.dividedBy(this.totalEpochs);
  }

  get potentialReward(): BigNumber | undefined {
    const epochReward = this.epochReward;

    if (
      this.currentPoolSize === undefined ||
      this.currentPoolSize.isEqualTo(BigNumber.ZERO) ||
      this.currentEpochStake === undefined ||
      epochReward === undefined
    ) {
      return undefined;
    }

    return this.currentEpochStake.dividedBy(this.currentPoolSize).multipliedBy(epochReward);
  }

  get distributedReward(): BigNumber | undefined {
    const lastActiveEpoch = this.lastActiveEpoch;
    const epochReward = this.epochReward;

    if (lastActiveEpoch === undefined || epochReward === undefined) {
      return undefined;
    }

    return epochReward.multipliedBy(lastActiveEpoch === this.totalEpochs ? lastActiveEpoch : lastActiveEpoch - 1);
  }

  loadCommon(): Promise<void> {
    return this.batch([
      { method: 'NR_OF_EPOCHS' },
      { method: 'TOTAL_DISTRIBUTED_AMOUNT' },
      { method: 'epochDuration' },
      { method: 'epochStart' },
      { method: 'getCurrentEpoch' },
    ]).then(([totalEpochs, totalForDistribution, epochDuration, epochStart, currentEpoch]) => {
      this.totalEpochs = Number(totalEpochs);
      this.totalForDistribution = new BigNumber(totalForDistribution);
      this.epochDuration = Number(epochDuration);
      this.epochStart = Number(epochStart);
      this.currentEpoch = Number(currentEpoch);
      this.emit(Web3Contract.UPDATE_DATA);

      this.batch([
        { method: 'getPoolSize', methodArgs: [this.currentEpoch] },
        { method: 'getPoolSize', methodArgs: [this.currentEpoch + 1] },
      ]).then(([currentPoolSize, nextPoolSize]) => {
        this.currentPoolSize = new BigNumber(currentPoolSize);
        this.nextPoolSize = new BigNumber(nextPoolSize);
        this.emit(Web3Contract.UPDATE_DATA);
      });
    });
  }

  loadUserData(): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.batch([
      { method: 'getEpochStake', methodArgs: [this.account, this.currentEpoch] },
      { method: 'getEpochStake', methodArgs: [this.account, this.currentEpoch! + 1] },
      { method: 'massHarvest', callArgs: { from: this.account } },
    ]).then(([currentEpochStake, nextEpochStake, toClaim]) => {
      this.currentEpochStake = new BigNumber(currentEpochStake);
      this.nextEpochStake = new BigNumber(nextEpochStake);
      this.toClaim = new BigNumber(toClaim);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }
}

const yf = new YFContract();
yf.on(Web3Contract.UPDATE_DATA, () => {
  console.log('YF', yf);
});
yf.setAccount('');
yf.loadCommon().then(() => yf.loadUserData());

const Contract = new Web3Contract(ABI, CONTRACT_YIELD_FARM_ADDR, 'YIELD_FARM');

type YieldFarmContractData = {
  isEnded?: boolean;
  endDate?: number;
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

export type YieldFarmContract = YieldFarmContractData & {
  contract: Web3Contract;
  reload: () => void;
  massHarvestSend: () => void;
};

const InitialData: YieldFarmContractData = {
  isEnded: undefined,
  endDate: undefined,
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

export function useYieldFarmContract(): YieldFarmContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<YieldFarmContractData>(InitialData);

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

  return React.useMemo<YieldFarmContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      massHarvestSend,
    }),
    [data, Contract, reload, massHarvestSend],
  );
}
