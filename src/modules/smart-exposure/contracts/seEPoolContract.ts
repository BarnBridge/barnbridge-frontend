import BigNumber from 'bignumber.js';
import Web3Contract, { AbiTupleArray, createAbiItem } from 'web3/web3Contract';

class SeEPoolContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // call
        createAbiItem('feeRate', [], ['uint256']),
        createAbiItem('rebalanceMinDeltaA', [], ['uint256']),
        createAbiItem('rebalanceInterval', [], ['uint256']),
        createAbiItem('lastRebalance', [], ['uint256']),
        createAbiItem('getRate', [], ['uint256']),
        createAbiItem('cumulativeFeeA', [], ['uint256']),
        createAbiItem('cumulativeFeeB', [], ['uint256']),
        createAbiItem('getTranches', [], [new AbiTupleArray(['address', 'uint256', 'uint256', 'uint256', 'uint256'])]),
        createAbiItem('getTranche', ['address'], ['address', 'uint256', 'uint256', 'uint256', 'uint256']),
        // send
        createAbiItem('issueExact', ['address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('redeemExact', ['address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('transferFees', [], ['boolean']),
      ],
      address,
      'ETokenFactory',
    );
  }

  feeRate?: number;
  rebalanceMinDeltaA?: number;
  rebalanceInterval?: number;
  lastRebalance?: number;
  rate?: BigNumber;
  tranches?: any;
  tranche?: any;

  cumulativeFeeA?: BigNumber;
  cumulativeFeeB?: BigNumber;

  async loadCommon() {
    try {
      const [feeRate, rebalanceMinDeltaA, rebalanceInterval, lastRebalance, rate, tranches, tranche] = await this.batch(
        [
          { method: 'feeRate', transform: value => Number(value) },
          { method: 'rebalanceMinDeltaA', transform: value => Number(value) },
          { method: 'rebalanceInterval', transform: value => Number(value) },
          { method: 'lastRebalance', transform: value => Number(value) },
          { method: 'getRate', transform: value => BigNumber.from(value) },
          {
            method: 'getTranches',
            transform: value =>
              value.map(([eToken, sFactorE, reserveA, reserveB, targetRatio]: any) => ({
                eToken,
                sFactorE: BigNumber.from(sFactorE),
                reserveA: BigNumber.from(reserveA),
                reserveB: BigNumber.from(reserveB),
                targetRatio: BigNumber.from(targetRatio),
              })),
          },
        ],
      );

      this.feeRate = feeRate; // 0.05 * 10 ** 18;
      this.rebalanceMinDeltaA = rebalanceMinDeltaA;
      this.rebalanceInterval = rebalanceInterval;
      this.lastRebalance = lastRebalance;
      this.rate = rate;
      this.tranches = tranches;
      this.tranche = tranche;
      this.emit(Web3Contract.UPDATE_DATA);
    } catch {}
  }

  getTranche(eTokenAddress: string): Promise<any> {
    return this.call('getTranche', [eTokenAddress]).then(value => ({
      eToken: value[0],
      sFactorE: BigNumber.from(value[1]),
      reserveA: BigNumber.from(value[2]),
      reserveB: BigNumber.from(value[3]),
      targetRatio: BigNumber.from(value[4]),
    }));
  }

  getCumulativeFeeA(): Promise<BigNumber | undefined> {
    return this.call('cumulativeFeeA', []).then(value => {
      this.cumulativeFeeA = BigNumber.from(value);
      this.emit(Web3Contract.UPDATE_DATA);
      return this.cumulativeFeeA;
    });
  }

  getCumulativeFeeB(): Promise<BigNumber | undefined> {
    return this.call('cumulativeFeeB', []).then(value => {
      this.cumulativeFeeB = BigNumber.from(value);
      this.emit(Web3Contract.UPDATE_DATA);
      return this.cumulativeFeeB;
    });
  }

  deposit(eTokenAddress: string, amount: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('issueExact', [eTokenAddress, amount], {
      from: this.account,
    });
  }

  redeem(eTokenAddress: string, amount: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('redeemExact', [eTokenAddress, amount], {
      from: this.account,
    });
  }

  transferFees(gasPrice?: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send(
      'transferFees',
      [],
      {
        from: this.account,
      },
      gasPrice,
    );
  }
}

export default SeEPoolContract;
