import BigNumber from 'bignumber.js';

import Web3Contract from 'web3/contract';
import { getHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import ABI from './abi';

export default class SYPoolUTokenContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);

    this.on('changeAccount', () => {
      this.loadAllowance()
        .catch(Error);
      this.loadBalance()
        .catch(Error);
    });
  }

  poolAddr?: string;
  loaded: boolean = false;
  isApproving: boolean = false;

  // common data
  decimals?: number;
  symbol?: string;

  // account data
  allowance?: BigNumber;
  balance?: BigNumber;

  // computed
  isAllowed?: boolean;

  get maxAllowed(): BigNumber | undefined {
    return BigNumber.min(
      this.allowance ?? ZERO_BIG_NUMBER,
      this.balance ?? ZERO_BIG_NUMBER,
    );
  };

  setPoolAddress(address?: string) {
    this.poolAddr = address;
  }

  async init() {
    try {
      const [
        name,
        decimals,
        symbol,
      ] = await this.batch([
        { method: 'name', },
        { method: 'decimals', transform: value => Number(value), },
        { method: 'symbol', },
      ]);

      this.name = name;
      this.decimals = decimals;
      this.symbol = symbol;
      this.loaded = true;

      this.emit('update');

      await this.loadAllowance();
      await this.loadBalance();
    } catch (e) {
      console.error('SYPoolUTokenContract', e);
    }
  }

  private async loadAllowance() {
    this.allowance = undefined;

    if (this.account && this.loaded) {
      try {
        const [
          allowance,
        ] = await this.batch([
          {
            method: 'allowance',
            methodArgs: [this.account, this.poolAddr],
            transform: value => new BigNumber(value),
          },
        ]);

        this.allowance = allowance;
        this.isAllowed = allowance?.gt(ZERO_BIG_NUMBER) ?? false;
      } catch (e) {
        console.error('SYPoolUTokenContract', e);
      }
    }

    this.emit('update');
  }

  private async loadBalance() {
    this.balance = undefined;

    if (this.account && this.loaded) {
      try {
        const [
          balance,
        ] = await this.batch([
          {
            method: 'balanceOf',
            methodArgs: [this.account],
            transform: value => new BigNumber(value),
          },
        ]);

        this.balance = getHumanValue(balance, this.decimals);
      } catch (e) {
        console.error('SYPoolUTokenContract', e);
      }
    }

    this.emit('update');
  }

  private async approve(value: BigNumber): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    this.isApproving = true;
    this.emit('update');

    try {
      await this.send('approve', [this.poolAddr, value], {
        from: this.account,
      });

      this.loadAllowance()
        .catch(Error);
    } catch {
    }

    this.isApproving = false;
    this.emit('update');
  }

  approveMin(): Promise<void> {
    return this.approve(ZERO_BIG_NUMBER);
  }

  approveMax(): Promise<void> {
    return this.approve(MAX_UINT_256);
  }

  reloadBalance() {
    this.loadBalance()
      .catch(Error);
  }
}
