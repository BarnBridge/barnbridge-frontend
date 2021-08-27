import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem('epoch', [], ['uint256']),
  createAbiItem('getCurrentEpoch', [], ['uint256']),

  createAbiItem('epochSeniorLiquidity', [], ['uint256']),
  createAbiItem('epochJuniorLiquidity', [], ['uint256']),
  createAbiItem('epochDownsideProtectionRate', [], ['uint256']),
  createAbiItem('epochUpsideExposureRate', [], ['uint256']),
  createAbiItem('epochEntryPrice', [], ['uint256']),
  createAbiItem('getEpochSeniorTokenPrice', [], ['uint256']),
  createAbiItem('getEpochJuniorTokenPrice', [], ['uint256']),

  createAbiItem('estimateCurrentSeniorLiquidity', [], ['uint256']),
  createAbiItem('estimateCurrentSeniorTokenPrice', [], ['uint256']),
  createAbiItem('queuedSeniorsUnderlyingIn', [], ['uint256']),
  createAbiItem('queuedSeniorsUnderlyingOut', [], ['uint256']),
  createAbiItem('queuedSeniorTokensBurn', [], ['uint256']),

  createAbiItem('estimateCurrentJuniorLiquidity', [], ['uint256']),
  createAbiItem('estimateCurrentJuniorTokenPrice', [], ['uint256']),
  createAbiItem('queuedJuniorsUnderlyingIn', [], ['uint256']),
  createAbiItem('queuedJuniorsUnderlyingOut', [], ['uint256']),
  createAbiItem('queuedJuniorTokensBurn', [], ['uint256']),

  createAbiItem('seniorEntryQueue', ['address'], ['uint256', 'uint256']),
  createAbiItem('seniorExitQueue', ['address'], ['uint256', 'uint256']),

  createAbiItem('juniorEntryQueue', ['address'], ['uint256', 'uint256']),
  createAbiItem('juniorExitQueue', ['address'], ['uint256', 'uint256']),

  createAbiItem('history_epochSeniorTokenPrice', ['uint256'], ['uint256']),
  createAbiItem('history_epochJuniorTokenPrice', ['uint256'], ['uint256']),
  // send
  createAbiItem('depositJunior', ['uint256'], []),
  createAbiItem('exitJunior', ['uint256'], []),
  createAbiItem('redeemJuniorTokens', [], []),
  createAbiItem('redeemJuniorUnderlying', [], []),
  createAbiItem('depositSenior', ['uint256'], []),
  createAbiItem('exitSenior', ['uint256'], []),
  createAbiItem('redeemSeniorTokens', [], []),
  createAbiItem('redeemSeniorUnderlying', [], []),
];

class SmartAlphaContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, 'Smart Alpha');
  }

  // common
  epoch: number | undefined;
  currentEpoch: number | undefined;
  epochSeniorLiquidity: BigNumber | undefined;
  epochJuniorLiquidity: BigNumber | undefined;
  epochDownsideProtectionRate: BigNumber | undefined;
  epochUpsideExposureRate: BigNumber | undefined;
  epochEntryPrice: BigNumber | undefined;
  epochSeniorTokenPrice: BigNumber | undefined;
  epochJuniorTokenPrice: BigNumber | undefined;
  estimateCurrentSeniorLiquidity: BigNumber | undefined;
  estimateCurrentSeniorTokenPrice: BigNumber | undefined;
  queuedSeniorsUnderlyingIn: BigNumber | undefined;
  queuedSeniorsUnderlyingOut: BigNumber | undefined;
  queuedSeniorTokensBurn: BigNumber | undefined;
  estimateCurrentJuniorLiquidity: BigNumber | undefined;
  estimateCurrentJuniorTokenPrice: BigNumber | undefined;
  queuedJuniorsUnderlyingIn: BigNumber | undefined;
  queuedJuniorsUnderlyingOut: BigNumber | undefined;
  queuedJuniorTokensBurn: BigNumber | undefined;

  // computed
  get epochTotalLiquidityRate(): BigNumber | undefined {
    if (!this.epochSeniorLiquidity || !this.epochJuniorLiquidity) {
      return undefined;
    }

    return this.epochSeniorLiquidity.plus(this.epochJuniorLiquidity);
  }

  get epochSeniorLiquidityRate(): number | undefined {
    if (!this.epochSeniorLiquidity || !this.epochTotalLiquidityRate) {
      return undefined;
    }

    return this.epochSeniorLiquidity.div(this.epochTotalLiquidityRate).toNumber();
  }

  get epochJuniorLiquidityRate(): number | undefined {
    if (!this.epochJuniorLiquidity || !this.epochTotalLiquidityRate) {
      return undefined;
    }

    return this.epochJuniorLiquidity.div(this.epochTotalLiquidityRate).toNumber();
  }

  get nextEpochSeniorLiquidity(): BigNumber | undefined {
    if (
      !this.estimateCurrentSeniorLiquidity ||
      !this.queuedSeniorsUnderlyingIn ||
      !this.queuedSeniorsUnderlyingOut ||
      !this.queuedSeniorTokensBurn ||
      !this.estimateCurrentSeniorTokenPrice
    ) {
      return undefined;
    }

    return this.estimateCurrentSeniorLiquidity
      .plus(this.queuedSeniorsUnderlyingIn)
      .minus(this.queuedSeniorsUnderlyingOut)
      .minus(this.queuedSeniorTokensBurn.multipliedBy(this.estimateCurrentSeniorTokenPrice));
  }

  get nextEpochJuniorLiquidity(): BigNumber | undefined {
    if (
      !this.estimateCurrentJuniorLiquidity ||
      !this.queuedJuniorsUnderlyingIn ||
      !this.queuedJuniorsUnderlyingOut ||
      !this.queuedJuniorTokensBurn ||
      !this.estimateCurrentJuniorTokenPrice
    ) {
      return undefined;
    }

    return this.estimateCurrentJuniorLiquidity
      .plus(this.queuedJuniorsUnderlyingIn)
      .minus(this.queuedJuniorsUnderlyingOut)
      .minus(this.queuedJuniorTokensBurn.multipliedBy(this.estimateCurrentJuniorTokenPrice));
  }

  get nextEpochTotalLiquidityRate(): BigNumber | undefined {
    if (!this.nextEpochSeniorLiquidity || !this.nextEpochJuniorLiquidity) {
      return undefined;
    }

    return this.nextEpochSeniorLiquidity.plus(this.nextEpochJuniorLiquidity);
  }

  get nextEpochSeniorLiquidityRate(): number | undefined {
    if (!this.nextEpochSeniorLiquidity || !this.nextEpochTotalLiquidityRate) {
      return undefined;
    }

    return this.nextEpochSeniorLiquidity.div(this.nextEpochTotalLiquidityRate).toNumber();
  }

  get nextEpochJuniorLiquidityRate(): number | undefined {
    if (!this.nextEpochJuniorLiquidity || !this.nextEpochTotalLiquidityRate) {
      return undefined;
    }

    return this.nextEpochJuniorLiquidity.div(this.nextEpochTotalLiquidityRate).toNumber();
  }

  async loadCommon() {
    const [
      epoch,
      currentEpoch,
      epochSeniorLiquidity,
      epochJuniorLiquidity,
      epochDownsideProtectionRate,
      epochUpsideExposureRate,
      epochEntryPrice,
      epochSeniorTokenPrice,
      epochJuniorTokenPrice,
      estimateCurrentSeniorLiquidity,
      estimateCurrentSeniorTokenPrice,
      queuedSeniorsUnderlyingIn,
      queuedSeniorsUnderlyingOut,
      queuedSeniorTokensBurn,
      estimateCurrentJuniorLiquidity,
      estimateCurrentJuniorTokenPrice,
      queuedJuniorsUnderlyingIn,
      queuedJuniorsUnderlyingOut,
      queuedJuniorTokensBurn,
    ] = await this.batch([
      { method: 'epoch' },
      { method: 'getCurrentEpoch' },
      { method: 'epochSeniorLiquidity' },
      { method: 'epochJuniorLiquidity' },
      { method: 'epochDownsideProtectionRate' },
      { method: 'epochUpsideExposureRate' },
      { method: 'epochEntryPrice' },
      { method: 'getEpochSeniorTokenPrice' },
      { method: 'getEpochJuniorTokenPrice' },
      { method: 'estimateCurrentSeniorLiquidity' },
      { method: 'estimateCurrentSeniorTokenPrice' },
      { method: 'queuedSeniorsUnderlyingIn' },
      { method: 'queuedSeniorsUnderlyingOut' },
      { method: 'queuedSeniorTokensBurn' },
      { method: 'estimateCurrentJuniorLiquidity' },
      { method: 'estimateCurrentJuniorTokenPrice' },
      { method: 'queuedJuniorsUnderlyingIn' },
      { method: 'queuedJuniorsUnderlyingOut' },
      { method: 'queuedJuniorTokensBurn' },
    ]);

    this.epoch = Number(epoch);
    this.currentEpoch = Number(currentEpoch);
    this.epochSeniorLiquidity = BigNumber.from(epochSeniorLiquidity);
    this.epochJuniorLiquidity = BigNumber.from(epochJuniorLiquidity);
    this.epochDownsideProtectionRate = BigNumber.from(epochDownsideProtectionRate);
    this.epochUpsideExposureRate = BigNumber.from(epochUpsideExposureRate);
    this.epochEntryPrice = BigNumber.from(epochEntryPrice);
    this.epochSeniorTokenPrice = BigNumber.from(epochSeniorTokenPrice);
    this.epochJuniorTokenPrice = BigNumber.from(epochJuniorTokenPrice);
    this.estimateCurrentSeniorLiquidity = BigNumber.from(estimateCurrentSeniorLiquidity);
    this.estimateCurrentSeniorTokenPrice = BigNumber.from(estimateCurrentSeniorTokenPrice);
    this.queuedSeniorsUnderlyingIn = BigNumber.from(queuedSeniorsUnderlyingIn);
    this.queuedSeniorsUnderlyingOut = BigNumber.from(queuedSeniorsUnderlyingOut);
    this.queuedSeniorTokensBurn = BigNumber.from(queuedSeniorTokensBurn);
    this.estimateCurrentJuniorLiquidity = BigNumber.from(estimateCurrentJuniorLiquidity);
    this.estimateCurrentJuniorTokenPrice = BigNumber.from(estimateCurrentJuniorTokenPrice);
    this.queuedJuniorsUnderlyingIn = BigNumber.from(queuedJuniorsUnderlyingIn);
    this.queuedJuniorsUnderlyingOut = BigNumber.from(queuedJuniorsUnderlyingOut);
    this.queuedJuniorTokensBurn = BigNumber.from(queuedJuniorTokensBurn);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  seniorEntryQueue(address: string): Promise<[number, BigNumber | undefined]> {
    return this.call('seniorEntryQueue', [address], {}).then(result => [Number(result[0]), BigNumber.from(result[1])]);
  }

  seniorExitQueue(address: string): Promise<[number, BigNumber | undefined]> {
    return this.call('seniorExitQueue', [address], {}).then(result => [Number(result[0]), BigNumber.from(result[1])]);
  }

  juniorEntryQueue(address: string): Promise<[number, BigNumber | undefined]> {
    return this.call('juniorEntryQueue', [address], {}).then(result => [Number(result[0]), BigNumber.from(result[1])]);
  }

  juniorExitQueue(address: string): Promise<[number, BigNumber | undefined]> {
    return this.call('juniorExitQueue', [address], {}).then(result => [Number(result[0]), BigNumber.from(result[1])]);
  }

  historyEpochSeniorTokenPrice(epoch: number): Promise<BigNumber | undefined> {
    return this.call('history_epochSeniorTokenPrice', [epoch], {}).then(BigNumber.from);
  }

  historyEpochJuniorTokenPrice(epoch: number): Promise<BigNumber | undefined> {
    return this.call('history_epochJuniorTokenPrice', [epoch], {}).then(BigNumber.from);
  }

  async depositJunior(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('depositJunior', [amount], {}, gasPrice);
  }

  async withdrawJunior(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('exitJunior', [amount], {}, gasPrice);
  }

  async redeemJuniorTokens(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('redeemJuniorTokens', [], {}, gasPrice);
  }

  async redeemJuniorUnderlying(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('redeemJuniorUnderlying', [], {}, gasPrice);
  }

  async depositSenior(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('depositSenior', [amount], {}, gasPrice);
  }

  async withdrawSenior(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('exitSenior', [amount], {}, gasPrice);
  }

  async redeemSeniorTokens(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('redeemSeniorTokens', [], {}, gasPrice);
  }

  async redeemSeniorUnderlying(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('redeemSeniorUnderlying', [], {}, gasPrice);
  }
}

export default SmartAlphaContract;
