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

  get apr(): BigNumber | undefined {
    if (!this.poolSize || !this.dailyReward) {
      return undefined;
    }

    const bondPrice = 195;
    const jTokenPrice = 1;

    const yearlyReward = this.dailyReward!.multipliedBy(bondPrice).multipliedBy(365);
    const poolBalance = this.poolSize.multipliedBy(jTokenPrice).multipliedBy(1);

    return yearlyReward.dividedBy(poolBalance);
  }

  toClaim?: BigNumber;

  balance?: BigNumber;

  get myDailyReward(): BigNumber | undefined {
    if (!this.dailyReward || !this.balance || !this.poolSize) {
      return undefined;
    }

    return this.dailyReward.multipliedBy(this.balance.dividedBy(this.poolSize));
  }

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
    });
  }

  loadClaim(): Promise<void> {
    this.toClaim = undefined;

    if (!this.account) {
      return Promise.reject();
    }

    return this.call('claim', [], { from: this.account }).then(value => {
      this.toClaim = new BigNumber(value);
    });
  }

  loadBalance(): Promise<void> {
    this.balance = undefined;

    if (!this.account) {
      return Promise.reject();
    }

    return this.call('balances', [this.account]).then(value => {
      this.balance = new BigNumber(value);
    });
  }

  sentClaim(gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('claim', [], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sendDeposit(amount: BigNumber, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('deposit', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sendWithdraw(amount: BigNumber, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdraw', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sendWithdrawAndClaim(amount: BigNumber, gasPrice: number): Promise<void> {
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
