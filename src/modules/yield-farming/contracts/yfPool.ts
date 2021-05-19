import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  createAbiItem('NR_OF_EPOCHS', [], ['uint256']),
  createAbiItem('TOTAL_DISTRIBUTED_AMOUNT', [], ['uint256']),
  createAbiItem('epochStart', [], ['uint256']),
  createAbiItem('epochDuration', [], ['uint256']),
  createAbiItem('getCurrentEpoch', [], ['uint256']),
  createAbiItem('getPoolSize', ['uint128'], ['uint256']),
  createAbiItem('getEpochStake', ['address', 'uint128'], ['uint256']),
  createAbiItem('massHarvest', [], ['uint256']),
];

export class YfPoolContract extends Web3Contract {
  constructor(yfAddress: string) {
    super(ABI, yfAddress, 'YIELD FARM');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      // reset user data
      this.userStaked = undefined;
      this.toClaim = undefined;
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  // common data
  totalEpochs?: number;
  totalSupply?: number;
  epochDuration?: number;
  epoch1Start?: number;
  currentEpoch?: number;
  poolSize?: BigNumber;

  // user data
  userStaked?: BigNumber;
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
    if (this.epoch1Start === undefined || this.totalEpochs === undefined || this.epochDuration === undefined) {
      return undefined;
    }

    return this.epoch1Start + this.totalEpochs * this.epochDuration;
  }

  get epochReward(): number | undefined {
    if (this.totalSupply === undefined || this.totalEpochs === undefined || this.totalEpochs === 0) {
      return undefined;
    }

    return this.totalSupply / this.totalEpochs;
  }

  get potentialReward(): BigNumber | undefined {
    if (this.isPoolEnded) {
      return BigNumber.ZERO;
    }

    const epochReward = this.epochReward;

    if (
      this.poolSize === undefined ||
      this.poolSize.isEqualTo(BigNumber.ZERO) ||
      this.userStaked === undefined ||
      epochReward === undefined
    ) {
      return undefined;
    }

    return this.userStaked.dividedBy(this.poolSize).multipliedBy(epochReward);
  }

  get distributedReward(): number | undefined {
    const lastActiveEpoch = this.lastActiveEpoch;
    const epochReward = this.epochReward;

    if (lastActiveEpoch === undefined || epochReward === undefined) {
      return undefined;
    }

    return epochReward * (lastActiveEpoch === this.totalEpochs ? lastActiveEpoch : lastActiveEpoch - 1);
  }

  async loadCommon(): Promise<void> {
    const [totalEpochs, totalForDistribution, epochDuration, epochStart, currentEpoch] = await this.batch([
      { method: 'NR_OF_EPOCHS' },
      { method: 'TOTAL_DISTRIBUTED_AMOUNT' },
      { method: 'epochDuration' },
      { method: 'epochStart' },
      { method: 'getCurrentEpoch' },
    ]);

    this.totalEpochs = Number(totalEpochs);
    this.totalSupply = Number(totalForDistribution);
    this.epochDuration = Number(epochDuration);
    this.epoch1Start = Number(epochStart);
    this.currentEpoch = Number(currentEpoch);
    this.emit(Web3Contract.UPDATE_DATA);

    const [currentPoolSize] = await this.batch([{ method: 'getPoolSize', methodArgs: [this.currentEpoch] }]);
    this.poolSize = BigNumber.from(currentPoolSize);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadUserData(): Promise<void> {
    const account = this.account;

    this.assertAccount();

    const currentEpoch = await this.batch([{ method: 'getCurrentEpoch' }]);
    this.currentEpoch = Number(currentEpoch);

    const [currentEpochStake, toClaim] = await this.batch([
      { method: 'getEpochStake', methodArgs: [account, this.currentEpoch] },
      { method: 'massHarvest', callArgs: { from: account } },
    ]);

    this.userStaked = BigNumber.from(currentEpochStake);
    this.toClaim = BigNumber.from(toClaim);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async claim(gasPrice?: number): Promise<BigNumber | undefined> {
    const result = await this.send('massHarvest', [], {}, gasPrice);
    return BigNumber.from(result);
  }
}
