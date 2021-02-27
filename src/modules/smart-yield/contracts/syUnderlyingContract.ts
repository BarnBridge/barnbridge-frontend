import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

const ABI: any[] = [
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

  async getBalance(): Promise<BigNumber> {
    return this.call('balanceOf', [this.account]).then(value => new BigNumber(value));
  }

  async getAllowance(spenderAddress: string): Promise<BigNumber> {
    return this.call('allowance', [this.account, spenderAddress]).then(value => new BigNumber(value));
  }

  approve(enable: boolean, spenderAddress: string): Promise<void> {
    const value = enable ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    return this.send('approve', [spenderAddress, value], {
      from: this.account,
    });
  }
}

export default SYUnderlyingContract;
