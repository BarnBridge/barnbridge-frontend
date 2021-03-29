import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract from 'web3/contract';
import { MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

const ABI: AbiItem[] = [
  {
    name: 'name',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'name', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'symbol', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
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
        name: 'amount',
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
        name: 'result',
        type: 'bool',
      },
    ],
  },
];

export default class Erc20Contract extends Web3Contract {
  symbol?: string;

  decimals?: number;

  totalSupply?: BigNumber;

  balance?: BigNumber;

  allowance?: BigNumber;

  constructor(abi: AbiItem[], address: string) {
    super([...ABI, ...abi], address, '');
  }

  get maxAllowed(): BigNumber {
    return BigNumber.min(this.allowance ?? ZERO_BIG_NUMBER, this.balance ?? ZERO_BIG_NUMBER);
  }

  get isAllowed(): boolean | undefined {
    return this.allowance?.gt(ZERO_BIG_NUMBER);
  }

  loadCommon(): Promise<void> {
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
      {
        method: 'totalSupply',
        transform: value => new BigNumber(value),
      },
    ]).then(([name, symbol, decimals, totalSupply]) => {
      this.name = name;
      this.symbol = symbol;
      this.decimals = decimals;
      this.totalSupply = totalSupply;
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  async loadBalance(): Promise<void> {
    this.balance = undefined;

    if (!this.account) {
      return;
    }

    return this.call('balanceOf', [this.account]).then(value => {
      this.balance = new BigNumber(value);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  async loadAllowance(spenderAddress: string): Promise<void> {
    this.allowance = undefined;

    if (!this.account) {
      return;
    }

    return this.call('allowance', [this.account, spenderAddress]).then(value => {
      this.allowance = new BigNumber(value);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  approve(enable: boolean, spenderAddress: string): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    const value = enable ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    return this.send('approve', [spenderAddress, value], {
      from: this.account,
    }).then(() => {
      this.loadAllowance(spenderAddress);
    });
  }
}
