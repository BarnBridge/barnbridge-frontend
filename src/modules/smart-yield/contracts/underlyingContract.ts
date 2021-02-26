import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { getHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

const ABI: any[] = [
  {
    name: 'name',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    name: 'decimals',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    name: 'allowance',
    type: 'function',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'approve',
    type: 'function',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
];

class UnderlyingContract extends Web3Contract {
  constructor(address: string, name: string) {
    super(ABI, address, name);
  }

  decimals?: number;
  allowance?: BigNumber;
  isAllowed?: boolean;
  balance?: BigNumber;

  get maxAllowed(): BigNumber {
    return BigNumber.min(this.allowance ?? ZERO_BIG_NUMBER, this.balance ?? ZERO_BIG_NUMBER);
  }

  loadMeta() {
    return this.batch([
      {
        method: 'name',
      },
      {
        method: 'decimals',
      },
    ]).then(([name, decimals]) => {
      this.name = name;
      this.decimals = Number(decimals);
    });
  }

  loadAllowance(spenderAddress: string) {
    if (!this.account) {
      return Promise.reject();
    }

    return this.batch([
      {
        method: 'allowance',
        methodArgs: [this.account, spenderAddress],
        transform: value => new BigNumber(value),
      },
    ]).then(([allowance]) => {
      this.allowance = allowance; /// ? IS SCALABLE
      this.isAllowed = this.allowance?.gt(ZERO_BIG_NUMBER) ?? false;
    });
  }

  loadBalance() {
    if (!this.account) {
      return Promise.reject();
    }

    return this.batch([
      {
        method: 'decimals',
      },
      {
        method: 'balanceOf',
        methodArgs: [this.account],
        transform: value => new BigNumber(value),
      },
    ]).then(([decimals, balance]) => {
      this.decimals = decimals;
      this.balance = getHumanValue(balance, this.decimals);
    });
  }

  approve(enable: boolean, spenderAddress: string): Promise<void> {
    const value = enable ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    return this.send('approve', [spenderAddress, value], {
      from: this.account,
    }).then(() => this.loadAllowance(spenderAddress));
  }
}

export default UnderlyingContract;
