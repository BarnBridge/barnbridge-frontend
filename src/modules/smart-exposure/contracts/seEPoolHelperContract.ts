import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

type TokenATokenBForETokenResult = {
  amountA: BigNumber;
  amountB: BigNumber;
};

class SeEPoolHelperContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('tokenBForTokenA', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('tokenAForTokenB', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('eTokenForTokenATokenB', ['address', 'address', 'uint256', 'uint256'], ['uint256']),
        createAbiItem('tokenATokenBForEToken', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('tokenATokenBForTokenA', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('tokenATokenBForTokenB', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        // send
      ],
      address,
      'ETokenHelperFactory',
    );
  }

  getTokenBForTokenA(ePoolAddress: string, eTokenAddress: string, amountA: BigNumber): Promise<BigNumber> {
    return this.call('tokenBForTokenA', [ePoolAddress, eTokenAddress, amountA]).then(value => new BigNumber(value));
  }

  getTokenAForTokenB(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('tokenAForTokenB', [ePoolAddress, eTokenAddress, amountB]).then(value => new BigNumber(value));
  }

  getETokenForTokenATokenB(
    ePoolAddress: string,
    eTokenAddress: string,
    amountA: BigNumber,
    amountB: BigNumber,
  ): Promise<BigNumber> {
    return this.call('eTokenForTokenATokenB', [ePoolAddress, eTokenAddress, amountA, amountB]).then(
      value => new BigNumber(value),
    );
  }

  getTokenATokenBForEToken(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
  ): Promise<TokenATokenBForETokenResult> {
    return this.call('tokenATokenBForEToken', [ePoolAddress, eTokenAddress, amount]).then(value => ({
      amountA: new BigNumber(value[0]),
      amountB: new BigNumber(value[1]),
    }));
  }

  getTokenATokenBForTokenA(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
  ): Promise<TokenATokenBForETokenResult> {
    return this.call('tokenATokenBForTokenA', [ePoolAddress, eTokenAddress, amount]).then(value => ({
      amountA: new BigNumber(value[0]),
      amountB: new BigNumber(value[1]),
    }));
  }

  getTokenATokenBForTokenB(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
  ): Promise<TokenATokenBForETokenResult> {
    return this.call('tokenATokenBForTokenB', [ePoolAddress, eTokenAddress, amount]).then(value => ({
      amountA: new BigNumber(value[0]),
      amountB: new BigNumber(value[1]),
    }));
  }
}

export default SeEPoolHelperContract;
