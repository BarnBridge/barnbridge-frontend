import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/web3Contract';

const ABI: any[] = [
  {
    name: 'underlyingFees',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'transferFees',
    type: 'function',
    inputs: [],
    outputs: [],
  },
];

class SYProviderContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  underlyingFees?: BigNumber;

  async loadUnderlyingFees(): Promise<void> {
    return this.call('underlyingFees').then(value => {
      this.underlyingFees = new BigNumber(value);
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  transferFeesSend(): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('transferFees', [], {
      from: this.account,
    });
  }
}

export default SYProviderContract;
