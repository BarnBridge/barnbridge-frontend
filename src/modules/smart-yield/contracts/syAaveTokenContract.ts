import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const AaveIncentivesABI: AbiItem[] = [createAbiItem('getAssetData', ['address'], ['uint256', 'uint256', 'uint256'])];

class SYAaveIncentivesContract extends Web3Contract {
  constructor(address: string) {
    super(AaveIncentivesABI, address, '');
  }

  emissionPerSecond?: BigNumber;

  async loadAssetData(aTokenAddress: string): Promise<void> {
    const { 1: emissionPerSecond } = await this.call('getAssetData', [aTokenAddress]);
    this.emissionPerSecond = BigNumber.from(emissionPerSecond);
    this.emit(Web3Contract.UPDATE_DATA);
  }
}

const AaveTokenABI: AbiItem[] = [
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getIncentivesController', [], ['address']),
];

class SYAaveTokenContract extends Web3Contract {
  constructor(address: string) {
    super(AaveTokenABI, address, '');
  }

  totalSupply?: BigNumber;
  incentivesController?: SYAaveIncentivesContract;

  calculateIncentivesAPY(
    aTokenPriceInEth: BigNumber,
    uTokenPriceInEth: BigNumber,
    uTokenDecimals: number,
  ): BigNumber | undefined {
    if (!this.incentivesController) {
      return undefined;
    }

    const { emissionPerSecond } = this.incentivesController;

    const emissionPerYear = BigNumber.from(emissionPerSecond)
      ?.unscaleBy(18) // TODO: ETH decimals
      ?.multipliedBy(aTokenPriceInEth)
      .multipliedBy(365 * 24 * 60 * 60);

    if (!emissionPerYear) {
      return undefined;
    }

    const totalSupply = this.totalSupply?.unscaleBy(uTokenDecimals)?.multipliedBy(uTokenPriceInEth);

    if (!totalSupply) {
      return undefined;
    }

    return emissionPerYear.dividedBy(totalSupply);
  }

  async loadCommon(): Promise<void> {
    const [totalSupply, incentivesControllerAddress] = await this.batch([
      { method: 'totalSupply' },
      { method: 'getIncentivesController' },
    ]);

    this.totalSupply = BigNumber.from(totalSupply);

    if (incentivesControllerAddress) {
      this.incentivesController = new SYAaveIncentivesContract(incentivesControllerAddress);
      this.incentivesController.setCallProvider(this.callProvider);
      await this.incentivesController.loadAssetData(this.address);
    }

    this.emit(Web3Contract.UPDATE_DATA);
  }
}

export default SYAaveTokenContract;
