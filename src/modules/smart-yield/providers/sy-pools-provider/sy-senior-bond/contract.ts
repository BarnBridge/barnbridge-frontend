import Web3Contract from 'web3/contract';

import ABI from './abi';
import { getGasValue } from 'web3/utils';

export default class SYSeniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);
  }

  async getSeniorTokens(): Promise<number[]> {
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
          const methods = Array.from(Array(balance)).map((_, index) => ({
            method: 'tokenOfOwnerByIndex',
            methodArgs: [this.account, index],
            transform: (value: any) => Number(value),
          }));

          tokenIds = await this.batch(methods);
        }
      } catch (e) {
        console.error('SYSeniorBondContract', e);
      }
    }

    return tokenIds;
  }

  transferFromSend(from: string, to: string, tokenId: number, gasPrice: number): Promise<void> {
    return this.send('transferFrom', [from, to, tokenId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.log(e));
  }
}
