import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

type DeltaResult = {
  deltaA: BigNumber;
  deltaB: BigNumber;
  rChange: BigNumber;
};

type TokenATokenBForETokenResult = {
  amountA: BigNumber;
  amountB: BigNumber;
};

class SeEPoolPeripheryContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('currentRatio', ['address', 'address'], ['uint256']),
        createAbiItem('delta', ['address'], ['uint256', 'uint256', 'uint256']),
        createAbiItem('eTokenForTokenATokenB', ['address', 'address', 'uint256', 'uint256'], ['uint256']),
        createAbiItem('tokenATokenBForEToken', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('tokenATokenBForTokenA', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('tokenATokenBForTokenB', ['address', 'address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('amountBForAmountA', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('amountAForAmountB', ['address', 'address', 'uint256'], ['uint256']),
        // send
        createAbiItem('issueForMaxTokenA', ['address', 'address', 'uint256', 'uint256', 'uint256'], ['bool']),
        createAbiItem('issueForMaxTokenB', ['address', 'address', 'uint256', 'uint256', 'uint256'], ['bool']),
        createAbiItem('redeemForMinTokenA', ['address', 'address', 'uint256', 'uint256', 'uint256'], ['bool']),
        createAbiItem('redeemForMinTokenB', ['address', 'address', 'uint256', 'uint256', 'uint256'], ['bool']),
      ],
      address,
      'ETokenFactory',
    );
  }

  getCurrentRatio(ePoolAddress: string, eTokenAddress: string): Promise<BigNumber> {
    return this.call('currentRatio', [ePoolAddress, eTokenAddress]).then(value => new BigNumber(value));
  }

  getDelta(ePoolAddress: string): Promise<DeltaResult> {
    return this.call('delta', [ePoolAddress]).then(value => ({
      deltaA: new BigNumber(value[0]),
      deltaB: new BigNumber(value[1]),
      rChange: new BigNumber(value[2]),
    }));
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
    totalA: BigNumber,
  ): Promise<TokenATokenBForETokenResult> {
    return this.call('tokenATokenBForTokenA', [ePoolAddress, eTokenAddress, totalA]).then(value => ({
      amountA: new BigNumber(value[0]),
      amountB: new BigNumber(value[1]),
    }));
  }

  getTokenATokenBForTokenB(
    ePoolAddress: string,
    eTokenAddress: string,
    totalB: BigNumber,
  ): Promise<TokenATokenBForETokenResult> {
    return this.call('tokenATokenBForTokenB', [ePoolAddress, eTokenAddress, totalB]).then(value => ({
      amountA: new BigNumber(value[0]),
      amountB: new BigNumber(value[1]),
    }));
  }

  getAmountBForAmountA(ePoolAddress: string, eTokenAddress: string, amountA: BigNumber): Promise<BigNumber> {
    return this.call('amountBForAmountA', [ePoolAddress, eTokenAddress, amountA]).then(value => new BigNumber(value));
  }

  getAmountAForAmountB(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('amountBForAmountA', [ePoolAddress, eTokenAddress, amountB]).then(value => new BigNumber(value));
  }

  depositForMaxTokenA(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
    maxAmountA: BigNumber,
    deadline: number,
  ): Promise<boolean> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('issueForMaxTokenA', [ePoolAddress, eTokenAddress, amount, maxAmountA, deadline], {
      from: this.account,
    });
  }

  depositForMaxTokenB(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
    maxAmountB: BigNumber,
    deadline: number,
  ): Promise<boolean> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('issueForMaxTokenB', [ePoolAddress, eTokenAddress, amount, maxAmountB, deadline], {
      from: this.account,
    });
  }

  redeemForMinTokenA(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
    minAmountA: BigNumber,
    deadline: number,
  ): Promise<boolean> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('redeemForMinTokenA', [ePoolAddress, eTokenAddress, amount, minAmountA, deadline], {
      from: this.account,
    });
  }

  redeemForMinTokenB(
    ePoolAddress: string,
    eTokenAddress: string,
    amount: BigNumber,
    minAmountB: BigNumber,
    deadline: number,
  ): Promise<boolean> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('redeemForMinTokenB', [ePoolAddress, eTokenAddress, amount, minAmountB, deadline], {
      from: this.account,
    });
  }
}

export default SeEPoolPeripheryContract;
