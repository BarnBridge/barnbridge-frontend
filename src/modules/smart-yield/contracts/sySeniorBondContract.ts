import { getGasValue } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

const ABI: any[] = [
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
    name: 'tokenOfOwnerByIndex',
    type: 'function',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'index',
        type: 'uint256',
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
    name: 'transferFrom',
    type: 'function',
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
];

class SYSeniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  async getSeniorBondIds(): Promise<number[]> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.call('balanceOf', [this.account])
      .then(value => Number(value))
      .then(balance => {
        if (balance > 0) {
          const methods = Array.from(Array(balance)).map((_, index) => ({
            method: 'tokenOfOwnerByIndex',
            methodArgs: [this.account, index],
            transform: (value: any) => Number(value),
          }));

          return this.batch(methods);
        }

        return [];
      });
  }

  transferFromSend(from: string, to: string, tokenId: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('transferFrom', [from, to, tokenId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }
}

export default SYSeniorBondContract;
