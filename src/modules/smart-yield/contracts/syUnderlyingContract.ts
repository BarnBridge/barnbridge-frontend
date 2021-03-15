import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

const ABI: any[] = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
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
        name: 'owner',
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

class SYUnderlyingContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  symbol?: string;

  decimals?: number;

  allowance?: BigNumber;

  balance?: BigNumber;

  get maxAllowed(): BigNumber {
    return BigNumber.min(this.allowance ?? ZERO_BIG_NUMBER, this.balance ?? ZERO_BIG_NUMBER);
  }

  get isAllowed(): boolean | undefined {
    return this.allowance?.gt(ZERO_BIG_NUMBER);
  }

  async loadCommon(): Promise<void> {
    return this.batch([
      {
        method: 'name',
      },
      {
        method: 'symbol',
      },
      {
        method: 'decimals',
        transform: value => Number(value),
      },
    ]).then(([name, symbol, decimals]) => {
      this.name = name;
      this.symbol = symbol;
      this.decimals = decimals;
    });
  }

  async loadBalance(): Promise<void> {
    if (!this.account) {
      this.balance = undefined;
      return;
    }

    return this.call('balanceOf', [this.account]).then(value => {
      this.balance = new BigNumber(value);
    });
  }

  async loadAllowance(spenderAddress: string): Promise<void> {
    if (!this.account) {
      this.allowance = undefined;
      return;
    }

    return this.call('allowance', [this.account, spenderAddress]).then(value => {
      this.allowance = new BigNumber(value);
    });
  }

  async getAllowance(spenderAddress: string): Promise<BigNumber> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.call('allowance', [this.account, spenderAddress]).then(value => new BigNumber(value));
  }

  approve(enable: boolean, spenderAddress: string): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    const value = enable ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    return this.send('approve', [spenderAddress, value], {
      from: this.account,
    });
  }
}

export default SYUnderlyingContract;
