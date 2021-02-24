import Web3Contract from 'web3/contract';

import ABI from './abi';

export default class SYPoolCTokenContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  decimals?: number;
  symbol?: string;

  async init() {
    try {
      const [name, decimals, symbol] = await this.batch([
        { method: 'name' },
        { method: 'decimals', transform: value => Number(value) },
        { method: 'symbol' },
      ]);

      this.name = name;
      this.decimals = decimals;
      this.symbol = symbol;

      this.emit('update');
    } catch (e) {
      console.error('SYPoolCTokenContract', e);
    }
  }
}
