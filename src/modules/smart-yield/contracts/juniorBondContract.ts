import Web3Contract from 'web3/contract';

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
];

class JuniorBondContract extends Web3Contract {
  constructor(address: string, name: string) {
    super(ABI, address, name);
  }

  async getJuniorBondIds(): Promise<number[]> {
    let jBondIds: number[] = [];

    if (this.account) {
      try {
        const balance = await this.call('balanceOf', [this.account]).then(value => Number(value));

        if (balance > 0) {
          const methods = Array.from(Array(balance)).map((_, index) => ({
            method: 'tokenOfOwnerByIndex',
            methodArgs: [this.account, index],
            transform: (value: any) => Number(value),
          }));

          jBondIds = await this.batch(methods);
        }
      } catch (e) {
        console.error('JuniorBondContract:getJuniorBondIds', e);
      }
    }

    return jBondIds;
  }
}

export default JuniorBondContract;
