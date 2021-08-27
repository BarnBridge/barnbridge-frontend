import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

type DeltaResult = {
  deltaA: BigNumber;
  deltaB: BigNumber;
  rChange: BigNumber;
};

class SeEPoolPeripheryContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('currentRatio', ['address', 'address'], ['uint256']),
        createAbiItem('delta', ['address'], ['uint256', 'uint256', 'uint256']),
        createAbiItem('router', [], ['address']),
        createAbiItem('minInputAmountAForEToken', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('minInputAmountBForEToken', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('maxOutputAmountAForEToken', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('maxOutputAmountBForEToken', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('eTokenForMinInputAmountA_Unsafe', ['address', 'address', 'uint256'], ['uint256']),
        createAbiItem('eTokenForMinInputAmountB_Unsafe', ['address', 'address', 'uint256'], ['uint256']),
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

  getRouter(): Promise<string> {
    return this.call('router');
  }

  getDelta(ePoolAddress: string): Promise<DeltaResult> {
    return this.call('delta', [ePoolAddress]).then(value => ({
      deltaA: new BigNumber(value[0]),
      deltaB: new BigNumber(value[1]),
      rChange: new BigNumber(value[2]),
    }));
  }

  getMinInputAmountAForEToken(ePoolAddress: string, eTokenAddress: string, amountA: BigNumber): Promise<BigNumber> {
    return this.call('minInputAmountAForEToken', [ePoolAddress, eTokenAddress, amountA]).then(
      value => new BigNumber(value),
    );
  }

  getMinInputAmountBForEToken(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('minInputAmountBForEToken', [ePoolAddress, eTokenAddress, amountB]).then(
      value => new BigNumber(value),
    );
  }

  getMaxOutputAmountAForEToken(ePoolAddress: string, eTokenAddress: string, amountA: BigNumber): Promise<BigNumber> {
    return this.call('maxOutputAmountAForEToken', [ePoolAddress, eTokenAddress, amountA]).then(
      value => new BigNumber(value),
    );
  }

  getMaxOutputAmountBForEToken(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('maxOutputAmountBForEToken', [ePoolAddress, eTokenAddress, amountB]).then(
      value => new BigNumber(value),
    );
  }

  getETokenForMinInputAmountA(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('eTokenForMinInputAmountA_Unsafe', [ePoolAddress, eTokenAddress, amountB]).then(
      value => new BigNumber(value),
    );
  }

  getETokenForMinInputAmountB(ePoolAddress: string, eTokenAddress: string, amountB: BigNumber): Promise<BigNumber> {
    return this.call('eTokenForMinInputAmountB_Unsafe', [ePoolAddress, eTokenAddress, amountB]).then(
      value => new BigNumber(value),
    );
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
