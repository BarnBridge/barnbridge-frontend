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

class ControllerContract extends Web3Contract {
  constructor(address: string, name: string) {
    super(ABI, address, name);
  }

  getJuniorBuyFee(): Promise<BigNumber> {
    return this.batch([
      {
        method: 'FEE_BUY_JUNIOR_TOKEN',
        transform: value => new BigNumber(value),
      },
    ]).then(([FEE_BUY_JUNIOR_TOKEN]) => FEE_BUY_JUNIOR_TOKEN);
  }
}

export default ControllerContract;
