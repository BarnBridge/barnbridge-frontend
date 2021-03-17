import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract from 'web3/contract';
import { getGasValue } from 'web3/utils';

import { DAY_IN_SECONDS } from 'utils/date';

const ABI: AbiItem[] = [
  {
    name: 'poolSize',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'rewardRatePerSecond',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawAndClaim',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
];

class SYRewardPoolContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  poolSize?: BigNumber;

  rewardRatePerSecond?: BigNumber;

  dailyReward?: BigNumber;

  toClaim?: BigNumber;

  loadCommon(): Promise<void> {
    this.poolSize = undefined;
    this.rewardRatePerSecond = undefined;
    this.dailyReward = undefined;

    return this.batch([
      {
        method: 'poolSize',
        transform: value => new BigNumber(value).div(1e6), /// ???
      },
      {
        method: 'rewardRatePerSecond',
        transform: value => new BigNumber(value).div(1e18), /// ???
      },
    ]).then(([poolSize, rewardRatePerSecond]) => {
      this.poolSize = poolSize;
      this.rewardRatePerSecond = rewardRatePerSecond;
      this.dailyReward = rewardRatePerSecond.multipliedBy(DAY_IN_SECONDS);
    });
  }

  loadClaim(): Promise<void> {
    this.toClaim = undefined;

    if (!this.address) {
      return Promise.reject();
    }

    return this.call('claim', [], { from: this.address }).then(value => {
      this.toClaim = new BigNumber(value);
    });
  }

  sendDeposit(amount: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('deposit', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sendWithdraw(amount: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdraw', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sentWithdrawAndClaim(amount: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdrawAndClaim', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }
}

export default SYRewardPoolContract;
