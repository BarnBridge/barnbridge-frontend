import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';

const ABI: any[] = [
  {
    name: 'FEE_BUY_JUNIOR_TOKEN',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
];

class SYControllerContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  getJuniorBuyFee(): Promise<BigNumber> {
    return this.call('FEE_BUY_JUNIOR_TOKEN').then(value => new BigNumber(value));
  }
}

export default SYControllerContract;
