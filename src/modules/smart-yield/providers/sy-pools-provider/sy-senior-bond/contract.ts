import BigNumber from 'bignumber.js';

import Web3Contract from 'web3/contract';
import ABI from './abi';

export default class SYSeniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);

    this.on('changeAccount', () => {
      this.loadAccountData()
        .catch(Error);
    });
  }

  // account data
  balance?: BigNumber;

  async loadAccountData() {
    this.balance = undefined;

    if (this.account) {
      try {
        const [
          balance,
        ] = await this.batch([
          {
            method: 'balanceOf',
            methodArgs: [this.account],
            transform: value => new BigNumber(value),
          },
        ]);

        this.balance = balance;
      } catch (e) {
        console.error('SYSeniorBondContract', e);
      }
    }

    this.emit('update');
  }
}
