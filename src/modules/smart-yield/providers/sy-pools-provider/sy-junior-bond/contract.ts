import Web3Contract from 'web3/contract';
import ABI from './abi';

export default class SYJuniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);
  }

  async getJuniorTokens(): Promise<number[]> {
    let tokenIds: number[] = [];

    if (this.account) {
      try {
        const [balance] = await this.batch([
          {
            method: 'balanceOf',
            methodArgs: [this.account],
            transform: value => Number(value),
          },
        ]);

        if (balance > 0) {
          const methods = Array.from(Array(balance))
            .map((_, index) => ({
              method: 'tokenOfOwnerByIndex',
              methodArgs: [this.account, index],
              transform: (value: any) => Number(value),
            }));

          tokenIds = await this.batch(methods)
        }
      } catch (e) {
        console.error('SYJuniorBondContract', e);
      }
    }

    return tokenIds;
  }
}
