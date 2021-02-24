import BigNumber from 'bignumber.js';

import Web3Contract from 'web3/contract';
import { getHumanValue } from 'web3/utils';
import ABI from './abi';

export default class SYControllerContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);
  }

  feeBuyJuniorToken?: BigNumber;

  async init() {
    try {
      const [
        feeBuyJuniorToken,
      ] = await this.batch([
        {
          method: 'FEE_BUY_JUNIOR_TOKEN',
          transform: value => new BigNumber(value),
        },
      ]);

      this.feeBuyJuniorToken = getHumanValue(feeBuyJuniorToken, 18);

      this.emit('update');
    } catch (e) {
      console.error('SYControllerContract', e);
    }
  }
}
