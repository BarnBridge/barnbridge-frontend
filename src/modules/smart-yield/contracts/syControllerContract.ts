import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/web3Contract';

const ABI: any[] = [
  {
    name: 'BOND_LIFE_MAX',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'FEE_BUY_JUNIOR_TOKEN',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'FEE_REDEEM_SENIOR_BOND',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'harvest',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [
      { name: 'rewardAmountGot', type: 'uint256' },
      { name: 'underlyingHarvestReward', type: 'uint256' },
    ],
  },

  // {
  //   inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   name: 'harvest',
  //   outputs: [
  //     { internalType: 'uint256', name: 'rewardAmountGot', type: 'uint256' },
  //     { internalType: 'uint256', name: 'underlyingHarvestReward', type: 'uint256' },
  //   ],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
];

class SYControllerContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, '');
  }

  getBondLifeMax(): Promise<number> {
    return this.call('BOND_LIFE_MAX').then(value => Number(value));
  }

  getJuniorBuyFee(): Promise<BigNumber> {
    return this.call('FEE_BUY_JUNIOR_TOKEN').then(value => new BigNumber(value));
  }

  getSeniorRedeemFee(): Promise<BigNumber> {
    return this.call('FEE_REDEEM_SENIOR_BOND').then(value => new BigNumber(value));
  }

  getHarvestAmount(): Promise<BigNumber> {
    return this.call('harvest').then(value => new BigNumber(value));
  }

  harvest(gasPrice: number): Promise<void> {
    return this.send('harvest', [0], {}, gasPrice);
  }
}

export default SYControllerContract;
