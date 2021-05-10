import BigNumber from 'bignumber.js';
import { getGasValue } from 'web3/utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenMeta } from 'components/providers/known-tokens-provider';
import config from 'config';

export type YfStakedToken = {
  currentEpochPoolSize?: BigNumber;
  nextEpochPoolSize?: BigNumber;
  currentEpochUserBalance?: BigNumber;
  nextEpochUserBalance?: BigNumber;
};

export class YfStakingContract extends Web3Contract {
  constructor() {
    super(
      [
        createAbiItem('epoch1Start', [], ['uint256']),
        createAbiItem('epochDuration', [], ['uint256']),
        createAbiItem('getCurrentEpoch', [], ['uint128']),
        createAbiItem('getEpochPoolSize', ['address', 'uint128'], ['uint256']),
        createAbiItem('getEpochUserBalance', ['address', 'address', 'uint128'], ['uint256']),
        createAbiItem('balanceOf', ['address', 'address'], ['uint256']),
        createAbiItem('deposit', ['address', 'uint256'], []),
        createAbiItem('withdraw', ['address', 'uint256'], []),
      ],
      config.contracts.yfStaking,
      'STAKING',
    );

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

  loadCommonFor(token: TokenMeta): Promise<void> {
    return this.batch([{ method: 'getCurrentEpoch' }, { method: 'epoch1Start' }, { method: 'epochDuration' }]).then(
      ([currentEpoch, epochStart, epochDuration]) => {
        const cEpoch = (this.currentEpoch = Number(currentEpoch));

        this.epochStart = Number(epochStart);
        this.epochDuration = Number(epochDuration);

        return this.batch([
          { method: 'getEpochPoolSize', methodArgs: [token.address, cEpoch] },
          { method: 'getEpochPoolSize', methodArgs: [token.address, cEpoch + 1] },
        ]).then(([currentEpochPoolSize, nextEpochPoolSize]) => {
          const stakedToken = {
            ...this.stakedTokens.get(token.address),
            currentEpochPoolSize: new BigNumber(currentEpochPoolSize),
            nextEpochPoolSize: new BigNumber(nextEpochPoolSize),
          };

          this.stakedTokens.set(token.address, stakedToken);
          this.emit(Web3Contract.UPDATE_DATA);
        });
      },
    );
  }

  loadUserDataFor(token: TokenMeta): Promise<void> {
    const account = this.account;

    if (!account) {
      return Promise.reject();
    }

    return this.batch([{ method: 'getCurrentEpoch' }]).then(([currentEpoch]) => {
      const cEpoch = (this.currentEpoch = Number(currentEpoch));

      return this.batch([
        { method: 'balanceOf', methodArgs: [account, token.address] },
        { method: 'getEpochUserBalance', methodArgs: [account, token.address, cEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, token.address, cEpoch + 1] },
      ]).then(([userBalance, currentEpochUserBalance, nextEpochUserBalance]) => {
        const stakedToken = {
          ...this.stakedTokens.get(token.address),
          userBalance: new BigNumber(userBalance),
          currentEpochUserBalance: new BigNumber(currentEpochUserBalance),
          nextEpochUserBalance: new BigNumber(nextEpochUserBalance),
        };

        this.stakedTokens.set(token.address, stakedToken);
        this.emit(Web3Contract.UPDATE_DATA);
      });
    });
  }

  stake(tokenAddress: string, amount: BigNumber, gasPrice: number): Promise<BigNumber> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('deposit', [tokenAddress, amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(result => new BigNumber(result));
  }

  unstake(tokenAddress: string, amount: BigNumber, gasPrice: number): Promise<BigNumber> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdraw', [tokenAddress, amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(result => new BigNumber(result));
  }
}
