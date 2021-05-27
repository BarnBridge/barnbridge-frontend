import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

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
        createAbiItem('getTranches', [], [['address', 'uint256', 'uint256', 'uint256', 'uint256']]),
        createAbiItem('getTranche', ['address'], ['address', 'uint256', 'uint256', 'uint256', 'uint256']),
        // send
        createAbiItem('issueExact', ['address', 'uint256'], ['uint256', 'uint256']),
        createAbiItem('redeemExact', ['address', 'uint256'], ['uint256', 'uint256']),
      ],
      address,
      'ETokenFactory',
    );
  }

  feeRate?: Number;
  rebalanceMinDeltaA?: Number;
  rebalanceInterval?: Number;
  lastRebalance?: Number;
  rate?: BigNumber;
  tranches?: any;
  tranche?: any;

  async loadCommon() {
    try {
      const [feeRate, rebalanceMinDeltaA, rebalanceInterval, lastRebalance, rate, tranches, tranche] = await this.batch(
        [
          { method: 'feeRate', transform: value => Number(value) },
          { method: 'rebalanceMinDeltaA', transform: value => Number(value) },
          { method: 'rebalanceInterval', transform: value => Number(value) },
          { method: 'lastRebalance', transform: value => Number(value) },
          { method: 'getRate', transform: value => new BigNumber(value) },
          {
            method: 'getTranches',
            transform: value =>
              value.map(([eToken, sFactorE, reserveA, reserveB, targetRatio]: any) => ({
                eToken,
                sFactorE: new BigNumber(sFactorE),
                reserveA: new BigNumber(reserveA),
                reserveB: new BigNumber(reserveB),
                targetRatio: new BigNumber(targetRatio),
              })),
          },
        ],
      );

      this.feeRate = feeRate;
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
      sFactorE: new BigNumber(value[1]),
      reserveA: new BigNumber(value[2]),
      reserveB: new BigNumber(value[3]),
      targetRatio: new BigNumber(value[4]),
    }));
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
}

export default SeEPoolContract;
