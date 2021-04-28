import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/contracts/web3Contract';

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
  constructor(yfAddress: string) {
    super(ABI, yfAddress, 'YIELD FARM');

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

    if (this.poolEndDate) {
      return BigNumber.ZERO;
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

    if (this.poolEndDate) {
      return BigNumber.ZERO;
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

    return this.batch([{ method: 'getCurrentEpoch' }]).then(([currentEpoch]) => {
      this.currentEpoch = Number(currentEpoch);

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
    });
  }

  claim(): Promise<BigNumber> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('massHarvest', [], {
      from: this.account,
    }).then(result => new BigNumber(result));
  }
}
