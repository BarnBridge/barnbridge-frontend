import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { ZERO_BIG_NUMBER, getGasValue } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

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

  toClaim?: BigNumber;

  balance?: BigNumber;

  get myDailyReward(): BigNumber | undefined {
    if (!this.dailyReward || !this.balance || !this.poolSize || this.poolSize.eq(ZERO_BIG_NUMBER)) {
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

      if (rewardLeft?.gt(ZERO_BIG_NUMBER)) {
        this.dailyReward = rewardRatePerSecond.multipliedBy(DAY_IN_SECONDS);
      } else {
        this.dailyReward = ZERO_BIG_NUMBER;
      }

      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  loadClaim(): Promise<void> {
    this.toClaim = undefined;

    if (!this.account) {
      return Promise.reject();
    }

    return this.call('claim', [], { from: this.account }).then(value => {
      this.toClaim = new BigNumber(value);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  loadBalance(): Promise<void> {
    this.balance = undefined;

    if (!this.account) {
      return Promise.reject();
    }

    return this.call('balances', [this.account]).then(value => {
      this.balance = new BigNumber(value);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  sendClaim(gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('claim', [], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.loadClaim();
    });
  }

  sendDeposit(amount: BigNumber, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('deposit', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.loadCommon();
      this.loadBalance();
    });
  }

  sendWithdraw(amount: BigNumber, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdraw', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.loadCommon();
      this.loadBalance();
    });
  }

  sendWithdrawAndClaim(amount: BigNumber, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('withdrawAndClaim', [amount], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.loadCommon();
      this.loadBalance();
      this.loadClaim();
    });
  }
}

export default SYRewardPoolContract;
