import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem('getPrice', [], ['uint256']),
];

class ChainlinkOracleContract extends Web3Contract {
  price: BigNumber | undefined;

  constructor(address: string) {
    super(ABI, address, 'SA Chainlink Oracle');
  }

  async loadCommon() {
    const [price] = await this.batch([{ method: 'getPrice' }]);

    this.price = BigNumber.from(price);
    this.emit(Web3Contract.UPDATE_DATA);
  }
}

export default ChainlinkOracleContract;
