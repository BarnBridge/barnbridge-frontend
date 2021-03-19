import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract from 'web3/contract';
import { getGasValue } from 'web3/utils';

import { DAY_IN_SECONDS } from 'utils/date';

const ABI: AbiItem[] = [
  {
    name: 'poolSize',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardRatePerSecond',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'claim',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardLeft',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'balances',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'deposit',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawAndClaim',
    type: 'function',
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

  rewardLeft?: BigNumber;

  dailyReward?: BigNumber;

  apr?: BigNumber;

  toClaim?: BigNumber;

  balance?: BigNumber;

  loadCommon(): Promise<void> {
    this.poolSize = undefined;
    this.rewardRatePerSecond = undefined;
    this.rewardLeft = undefined;
    this.dailyReward = undefined;

    return this.batch([
      {
        method: 'poolSize',
        transform: value => new BigNumber(value),
      },
      {
        method: 'rewardRatePerSecond',
        transform: value => new BigNumber(value),
      },
      {
        method: 'rewardLeft',
        transform: value => new BigNumber(value),
      },
    ]).then(([poolSize, rewardRatePerSecond, rewardLeft]) => {
      this.poolSize = poolSize;
      this.rewardRatePerSecond = rewardRatePerSecond;
      this.rewardLeft = rewardLeft;
      this.dailyReward = rewardRatePerSecond.multipliedBy(DAY_IN_SECONDS);

      const bondPrice = 1;
      const jTokenPrice = 1;
      this.apr = this.dailyReward!.multipliedBy(bondPrice).dividedBy(poolSize.multipliedBy(jTokenPrice));
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

  loadBalance(): Promise<void> {
    this.balance = undefined;

    if (!this.address) {
      return Promise.reject();
    }

    return this.call('balances', [this.address]).then(value => {
      this.balance = new BigNumber(value);
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
