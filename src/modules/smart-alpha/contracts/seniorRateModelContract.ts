import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem('getRates', ['uint256', 'uint256'], ['uint256', 'uint256']),
];

class SeniorRateModelContract extends Web3Contract {
  price: BigNumber | undefined;

  constructor(address: string) {
    super(ABI, address, 'SA Chainlink Oracle');
  }

  getRates(
    juniorLiquidity: BigNumber,
    seniorLiquidity: BigNumber,
  ): Promise<[BigNumber | undefined, BigNumber | undefined]> {
    return this.call('getRates', [juniorLiquidity, seniorLiquidity], {}).then(result => [
      BigNumber.from(result[0]),
      BigNumber.from(result[1]),
    ]);
  }
}

export default SeniorRateModelContract;
