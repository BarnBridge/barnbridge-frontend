import BigNumber from 'bignumber.js';

import Web3Contract from 'web3/contract';
import ABI from './abi';
import { ZERO_BIG_NUMBER } from 'web3/utils';

export default class SYJuniorBondContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);

    this.on('changeAccount', () => {
      this.loadAccountData()
        .catch(Error);
    });
  }

  // account data
  balance?: BigNumber;
  ownedTokenIds?: number[];

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

        this.loadTokensIds()
          .catch(Error);
      } catch (e) {
        console.error('SYJuniorBondContract', e);
      }
    }

    this.emit('update');
  }

  async loadTokensIds() {
    this.ownedTokenIds = undefined;

    if (this.account && this.balance?.isGreaterThan(ZERO_BIG_NUMBER)) {
      try {
        const methods = Array.from(Array(this.balance?.toNumber() ?? 0))
          .map((_, index) => ({
            method: 'tokenOfOwnerByIndex',
            methodArgs: [this.account, index],
            transform: (value: any) => Number(value),
          }));

        this.ownedTokenIds = await this.batch(methods);
      } catch (e) {
        console.error('SYJuniorBondContract', e);
      }
    }

    this.emit('update');
  }
}
