import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem('calcJuniorProfits', ['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], ['uint256']),
  createAbiItem('calcSeniorProfits', ['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], ['uint256']),
];

class AccountingModelContract extends Web3Contract {
  price: BigNumber | undefined;

  constructor(address: string) {
    super(ABI, address, 'SA Chainlink Oracle');
  }

  calcJuniorProfits(
    entryPrice: BigNumber,
    currentPrice: BigNumber,
    upsideExposureRate: BigNumber,
    totalSeniors: BigNumber,
  ): Promise<BigNumber | undefined> {
    return this.call(
      'calcJuniorProfits',
      [entryPrice, currentPrice, upsideExposureRate, totalSeniors, BigNumber.ZERO],
      {},
    ).then(BigNumber.from);
  }

  calcSeniorProfits(
    entryPrice: BigNumber,
    currentPrice: BigNumber,
    downsideProtectionRate: BigNumber,
    totalSeniors: BigNumber,
  ): Promise<BigNumber | undefined> {
    return this.call(
      'calcSeniorProfits',
      [entryPrice, currentPrice, downsideProtectionRate, totalSeniors, BigNumber.ZERO],
      {},
    ).then(BigNumber.from);
  }
}

export default AccountingModelContract;
