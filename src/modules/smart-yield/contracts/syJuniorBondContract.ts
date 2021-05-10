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
];

class SYJuniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  async getJuniorBondIds(): Promise<number[]> {
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
}

export default SYJuniorBondContract;
