import Web3Contract from 'web3/contract';
import { getGasValue } from 'web3/utils';

const ABI: any[] = [
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
    "name": "transferFrom",
    "type": "function",
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "outputs": [],
  }
];

class SeniorBondContract extends Web3Contract {
  constructor(address: string, name: string) {
    super(ABI, address, name);
  }

  async getSeniorTokens(): Promise<number[]> {
    let tokenIds: number[] = [];

    if (this.account) {
      try {
        const balance = await this.call('balanceOf', [this.account]).then(value => Number(value));

        if (balance > 0) {
          const methods = Array.from(Array(balance)).map((_, index) => ({
            method: 'tokenOfOwnerByIndex',
            methodArgs: [this.account, index],
            transform: (value: any) => Number(value),
          }));

          tokenIds = await this.batch(methods);
        }
      } catch (e) {
        console.error('SeniorBondContract:getSeniorTokens', e);
      }
    }

    return tokenIds;
  }

  transferFromSend(from: string, to: string, tokenId: number, gasPrice: number): Promise<void> {
    return this.send('transferFrom', [from, to, tokenId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SeniorBondContract:transferFrom', e));
  }
}

export default SeniorBondContract;
