import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract from 'web3/web3Contract';

const ABI: AbiItem[] = [
  {
    name: 'poolSize',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardLeft',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'claim',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'balances',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardRatePerSecond',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'deposit',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawAndClaim',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
];

const MULTI_ABI: AbiItem[] = [
  {
    name: 'poolSize',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'numRewardTokens',
    type: 'function',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'rewardLeft',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardTokens',
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    name: 'claim',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'balances',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'rewardRatesPerSecond',
    type: 'function',
    inputs: [{ name: 'address', type: 'address' }],
    outputs: [{ name: 'amount', type: 'uint256' }],
  },
  {
    name: 'deposit',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawAndClaim',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'claim_allTokens',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
  },
];

class SYRewardPoolContract extends Web3Contract {
  private readonly _isMulti: boolean;

  constructor(address: string, isMulti: boolean = false) {
    super(isMulti ? MULTI_ABI : ABI, address, '');

    this._isMulti = isMulti;
    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.balances.clear();
      this.claims.clear();
    });
  }

  // common data
  poolSize?: BigNumber;
  rewardTokensCount?: number;
  rewardLeft: Map<string, BigNumber> = new Map();
  rewardRates: Map<string, BigNumber> = new Map();

  // user data
  balances: Map<string, BigNumber> = new Map();
  claims: Map<string, BigNumber> = new Map();

  async loadCommon(): Promise<void> {
    this.poolSize = undefined;

    const [poolSize, numRewardTokens] = await this.batch([{ method: 'poolSize' }, { method: 'numRewardTokens' }]);

    this.poolSize = BigNumber.from(poolSize);
    this.rewardTokensCount = Number(numRewardTokens) || 1;
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadRewardLeftFor(rewardTokenAddress: string): Promise<void> {
    const rewardLeft = await this.call('rewardLeft', this._isMulti ? [rewardTokenAddress] : []);

    this.rewardLeft.set(rewardTokenAddress, new BigNumber(rewardLeft));
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadRewardRateFor(rewardTokenAddress: string): Promise<void> {
    let rewardRatePerSecond;

    if (this._isMulti) {
      rewardRatePerSecond = await this.call('rewardRatesPerSecond', [rewardTokenAddress]);
    } else {
      rewardRatePerSecond = await this.call('rewardRatePerSecond', []);
    }

    this.rewardRates.set(rewardTokenAddress, new BigNumber(rewardRatePerSecond));
    this.emit(Web3Contract.UPDATE_DATA);
  }

  getRewardLeftFor(rewardTokenAddress: string): BigNumber | undefined {
    return this.rewardLeft.get(rewardTokenAddress);
  }

  getRewardRateFor(rewardTokenAddress: string): BigNumber | undefined {
    return this.rewardRates.get(rewardTokenAddress);
  }

  getDailyRewardFor(rewardTokenAddress: string): BigNumber | undefined {
    return this.rewardRates.get(rewardTokenAddress)?.multipliedBy(24 * 60 * 60);
  }

  getMyDailyRewardFor(rewardTokenAddress: string): BigNumber | undefined {
    const balance = this.getBalanceFor(this.account!);

    if (!balance || !this.poolSize || !this.poolSize.gt(BigNumber.ZERO)) {
      return undefined;
    }

    const myRatio = balance.dividedBy(this.poolSize);

    return this.getDailyRewardFor(rewardTokenAddress)?.multipliedBy(myRatio);
  }

  async loadBalanceFor(rewardTokenAddress: string): Promise<void> {
    const balance = await this.call('balances', [rewardTokenAddress], { from: this.account });

    this.balances.set(rewardTokenAddress, new BigNumber(balance));
    this.emit(Web3Contract.UPDATE_DATA);
  }

  getBalanceFor(rewardTokenAddress: string): BigNumber | undefined {
    return this.balances.get(rewardTokenAddress);
  }

  async loadClaimFor(rewardTokenAddress: string): Promise<void> {
    const claim = await this.call('claim', this._isMulti ? [rewardTokenAddress] : [], { from: this.account });

    this.claims.set(rewardTokenAddress, new BigNumber(claim));
    this.emit(Web3Contract.UPDATE_DATA);
  }

  getClaimFor(rewardTokenAddress: string): BigNumber | undefined {
    return this.claims.get(rewardTokenAddress);
  }

  async sendClaimAll(gasPrice?: number): Promise<void> {
    await this.send(this._isMulti ? 'claim_allTokens' : 'claim', [], {}, gasPrice);
  }

  async sendDeposit(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('deposit', [amount], {}, gasPrice);
  }

  async sendWithdraw(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('withdraw', [amount], {}, gasPrice);
  }

  async sendWithdrawAndClaim(amount: BigNumber, gasPrice?: number): Promise<void> {
    await this.send('withdrawAndClaim', [amount], {}, gasPrice);
  }
}

export default SYRewardPoolContract;
