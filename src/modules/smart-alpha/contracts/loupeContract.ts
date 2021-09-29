import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { AbiTuple, createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem(
    'estimateNextEpoch',
    ['address'],
    [new AbiTuple(['uint256', 'uint256', 'uint256', 'uint256', 'uint256'])],
  ),
  createAbiItem('userRedeemableSeniorTokens', ['address', 'address'], ['uint256']),
  createAbiItem('userRedeemableJuniorTokens', ['address', 'address'], ['uint256']),
  createAbiItem('userRedeemableSeniorUnderlying', ['address', 'address'], ['uint256']),
  createAbiItem('userRedeemableJuniorUnderlying', ['address', 'address'], ['uint256']),
];

class LoupeContract extends Web3Contract {
  price: BigNumber | undefined;

  constructor(address: string) {
    super(ABI, address, 'SA Loupe');
  }

  getEstimateNextEpoch(smartAlphaAddress: string): Promise<(BigNumber | undefined)[]> {
    return this.call('estimateNextEpoch', [smartAlphaAddress], {}).then(result => [
      BigNumber.from(result[0]), // juniorLiquidity
      BigNumber.from(result[1]), // seniorLiquidity
      BigNumber.from(result[2]), // upsideRate
      BigNumber.from(result[3]), // downsideRate
      BigNumber.from(result[4]), // startPrice
    ]);
  }

  getUserRedeemableSeniorTokens(smartAlphaAddress: string, userAddress: string): Promise<BigNumber | undefined> {
    return this.call('userRedeemableSeniorTokens', [smartAlphaAddress, userAddress], {}).then(BigNumber.from);
  }

  getUserRedeemableJuniorTokens(smartAlphaAddress: string, userAddress: string): Promise<BigNumber | undefined> {
    return this.call('userRedeemableJuniorTokens', [smartAlphaAddress, userAddress], {}).then(BigNumber.from);
  }

  getUserRedeemableSeniorUnderlying(smartAlphaAddress: string, userAddress: string): Promise<BigNumber | undefined> {
    return this.call('userRedeemableSeniorUnderlying', [smartAlphaAddress, userAddress], {}).then(BigNumber.from);
  }

  getUserRedeemableJuniorUnderlying(smartAlphaAddress: string, userAddress: string): Promise<BigNumber | undefined> {
    return this.call('userRedeemableJuniorUnderlying', [smartAlphaAddress, userAddress], {}).then(BigNumber.from);
  }
}

export default LoupeContract;
