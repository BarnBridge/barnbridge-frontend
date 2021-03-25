import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';

const ABI: any[] = [
  {
    name: 'FEE_BUY_JUNIOR_TOKEN',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'FEE_REDEEM_SENIOR_BOND',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
];

class SYControllerContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  getJuniorBuyFee(): Promise<BigNumber> {
    return this.call('FEE_BUY_JUNIOR_TOKEN').then(value => new BigNumber(value));
  }

  getSeniorRedeemFee(): Promise<BigNumber> {
    return this.call('FEE_REDEEM_SENIOR_BOND').then(value => new BigNumber(value));
  }
}

export default SYControllerContract;
