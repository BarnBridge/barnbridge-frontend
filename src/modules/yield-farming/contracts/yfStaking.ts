import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  createAbiItem('epoch1Start', [], ['uint256']),
  createAbiItem('epochDuration', [], ['uint256']),
  createAbiItem('getCurrentEpoch', [], ['uint128']),
  createAbiItem('getEpochPoolSize', ['address', 'uint128'], ['uint256']),
  createAbiItem('getEpochUserBalance', ['address', 'address', 'uint128'], ['uint256']),
  createAbiItem('balanceOf', ['address', 'address'], ['uint256']),
  createAbiItem('deposit', ['address', 'uint256'], []),
  createAbiItem('withdraw', ['address', 'uint256'], []),
];

export type YfStakedToken = {
  currentEpochPoolSize?: BigNumber;
  nextEpochPoolSize?: BigNumber;
  currentEpochUserBalance?: BigNumber;
  nextEpochUserBalance?: BigNumber;
};

export class YfStakingContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, 'YF STAKING');

    this.stakedTokens = new Map();

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      // reset user data
      this.stakedTokens.forEach(stakedToken => {
        stakedToken.currentEpochUserBalance = undefined;
        stakedToken.nextEpochUserBalance = undefined;
      });
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  // common data
  currentEpoch?: number;
  epochStart?: number;
  epochDuration?: number;
  stakedTokens: Map<string, YfStakedToken>;

  // computed data
  get epochDates(): [number, number, number] | undefined {
    if (!this.epochStart || !this.currentEpoch || !this.epochDuration) {
      return undefined;
    }

    const startDate = (this.epochStart + (this.currentEpoch - 1) * this.epochDuration) * 1_000;
    const endDate = (this.epochStart + this.currentEpoch * this.epochDuration) * 1_000;
    const progress = ((Date.now() - startDate) / (this.epochDuration * 1_000)) * 100;

    return [startDate, endDate, progress];
  }

  async loadCommonFor(tokenAddress: string): Promise<void> {
    const [currentEpoch, epochStart, epochDuration] = await this.batch([
      { method: 'getCurrentEpoch' },
      { method: 'epoch1Start' },
      { method: 'epochDuration' },
    ]);

    const cEpoch = (this.currentEpoch = Number(currentEpoch));

    this.epochStart = Number(epochStart);
    this.epochDuration = Number(epochDuration);

    const [currentEpochPoolSize, nextEpochPoolSize] = await this.batch([
      { method: 'getEpochPoolSize', methodArgs: [tokenAddress, cEpoch] },
      { method: 'getEpochPoolSize', methodArgs: [tokenAddress, cEpoch + 1] },
    ]);

    const stakedToken = {
      ...this.stakedTokens.get(tokenAddress),
      currentEpochPoolSize: BigNumber.from(currentEpochPoolSize),
      nextEpochPoolSize: BigNumber.from(nextEpochPoolSize),
    };

    this.stakedTokens.set(tokenAddress, stakedToken);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadUserDataFor(tokenAddress: string): Promise<void> {
    const account = this.account;

    this.assertAccount();

    const [currentEpoch] = await this.batch([{ method: 'getCurrentEpoch' }]);
    const cEpoch = (this.currentEpoch = Number(currentEpoch));

    const [userBalance, currentEpochUserBalance, nextEpochUserBalance] = await this.batch([
      { method: 'balanceOf', methodArgs: [account, tokenAddress] },
      { method: 'getEpochUserBalance', methodArgs: [account, tokenAddress, cEpoch] },
      { method: 'getEpochUserBalance', methodArgs: [account, tokenAddress, cEpoch + 1] },
    ]);

    const stakedToken = {
      ...this.stakedTokens.get(tokenAddress),
      userBalance: BigNumber.from(userBalance),
      currentEpochUserBalance: BigNumber.from(currentEpochUserBalance),
      nextEpochUserBalance: BigNumber.from(nextEpochUserBalance),
    };

    this.stakedTokens.set(tokenAddress, stakedToken);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async stake(tokenAddress: string, amount: BigNumber, gasPrice: number): Promise<BigNumber | undefined> {
    const result = await this.send('deposit', [tokenAddress, amount], {}, gasPrice);
    return BigNumber.from(result);
  }

  async unstake(tokenAddress: string, amount: BigNumber, gasPrice: number): Promise<BigNumber | undefined> {
    const result = await this.send('withdraw', [tokenAddress, amount], {}, gasPrice);
    return BigNumber.from(result);
  }
}
