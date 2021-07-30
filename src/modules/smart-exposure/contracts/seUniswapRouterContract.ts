import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

class SeUniswapRouterContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('getAmountsOut', ['uint256', 'address[]'], ['uint256[]']),
        // createAbiItem('getAmountsIn', ['uint256', new AbiTuple(['address', 'address'])], ['uint256[]']),
        {
          inputs: [
            { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
            { internalType: 'address[]', name: 'path', type: 'address[]' },
          ],
          name: 'getAmountsIn',
          outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
          stateMutability: 'view',
          type: 'function',
        },

        // send
        {
          inputs: [
            { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
            { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
            { internalType: 'address[]', name: 'path', type: 'address[]' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          ],
          name: 'swapTokensForExactTokens',
          outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      address,
      'UniswapRouter',
    );
  }

  getAmountsOut(amount: BigNumber, paths: [string, string]): Promise<BigNumber[]> {
    return this.call('getAmountsOut', [amount, paths]).then((vals: number[]) =>
      vals.map(val => BigNumber.from(val) ?? BigNumber.ZERO),
    );
  }

  getAmountsIn(amount: BigNumber, paths: [string, string]): Promise<BigNumber[]> {
    return this.call('getAmountsIn', [amount, paths]).then((vals: number[]) =>
      vals.map(val => BigNumber.from(val) ?? BigNumber.ZERO),
    );
  }

  swapTokensForExactTokens(
    amountOut: BigNumber,
    amountInMax: BigNumber,
    paths: [string, string],
    to: string,
    deadline: number,
  ): Promise<void> {
    return this.send('swapTokensForExactTokens', [amountOut, amountInMax, paths, to, deadline]);
  }
}

export default SeUniswapRouterContract;
