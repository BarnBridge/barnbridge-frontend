import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ABI: AbiItem[] = [
  // call
  createAbiItem('epochSeniorLiquidity', [], ['uint256']),
  createAbiItem('epochJuniorLiquidity', [], ['uint256']),
  createAbiItem('epochDownsideProtectionRate', [], ['uint256']),
  createAbiItem('epochUpsideExposureRate', [], ['uint256']),
  createAbiItem('epochEntryPrice', [], ['uint256']),

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

  epochSeniorLiquidity: BigNumber | undefined;
  epochJuniorLiquidity: BigNumber | undefined;
  epochDownsideProtectionRate: BigNumber | undefined;
  epochUpsideExposureRate: BigNumber | undefined;
  epochEntryPrice: BigNumber | undefined;
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

  async loadCommon() {
    const [
      epochSeniorLiquidity,
      epochJuniorLiquidity,
      epochDownsideProtectionRate,
      epochUpsideExposureRate,
      epochEntryPrice,
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
      { method: 'epochSeniorLiquidity' },
      { method: 'epochJuniorLiquidity' },
      { method: 'epochDownsideProtectionRate' },
      { method: 'epochUpsideExposureRate' },
      { method: 'epochEntryPrice' },
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

    this.epochSeniorLiquidity = BigNumber.from(epochSeniorLiquidity);
    this.epochJuniorLiquidity = BigNumber.from(epochJuniorLiquidity);
    this.epochDownsideProtectionRate = BigNumber.from(epochDownsideProtectionRate);
    this.epochUpsideExposureRate = BigNumber.from(epochUpsideExposureRate);
    this.epochEntryPrice = BigNumber.from(epochEntryPrice);
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

  seniorEntryQueue(address: string): Promise<[BigNumber | undefined, BigNumber | undefined]> {
    return this.call('seniorEntryQueue', [address], {}).then(result => [
      BigNumber.from(result[0]),
      BigNumber.from(result[1]),
    ]);
  }

  seniorExitQueue(address: string): Promise<[BigNumber | undefined, BigNumber | undefined]> {
    return this.call('seniorExitQueue', [address], {}).then(result => [
      BigNumber.from(result[0]),
      BigNumber.from(result[1]),
    ]);
  }

  juniorEntryQueue(address: string): Promise<[BigNumber | undefined, BigNumber | undefined]> {
    return this.call('juniorEntryQueue', [address], {}).then(result => [
      BigNumber.from(result[0]),
      BigNumber.from(result[1]),
    ]);
  }

  juniorExitQueue(address: string): Promise<[BigNumber | undefined, BigNumber | undefined]> {
    return this.call('juniorExitQueue', [address], {}).then(result => [
      BigNumber.from(result[0]),
      BigNumber.from(result[1]),
    ]);
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
