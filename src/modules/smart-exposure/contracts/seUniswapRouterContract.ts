import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

class SeUniswapRouterContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('getAmountsOut', ['uint256', 'address[]'], ['uint256[]']),
      ],
      address,
      'UniswapRouter',
    );
  }

  getAmountsOut(amount: BigNumber, paths: [string, string]): Promise<BigNumber[]> {
    console.log({ paths });
    return this.call('getAmountsOut', [amount, paths]).then((vals: number[]) =>
      vals.map(val => BigNumber.from(val) ?? BigNumber.ZERO),
    );
  }
}

export default SeUniswapRouterContract;
