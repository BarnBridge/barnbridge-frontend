import BigNumber from 'bignumber.js';

import Web3Contract from 'web3/contract';
import { getGasValue, getHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import SYPoolContract from '../sy-pool/contract';
import SYJuniorBondContract from '../sy-junior-bond/contract';
import SYSeniorBondContract from '../sy-senior-bond/contract';
import SYControllerContract from '../sy-controller/contract';
import ABI from './abi';

export class SYContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);

    this.on('changeProvider', (provider: any) => {
      this.pool?.setProvider(provider);
      this.juniorBond?.setProvider(provider);
      this.seniorBond?.setProvider(provider);
    });

    this.on('changeAccount', () => {
      this.loadBalance()
        .catch(Error);

      this.pool?.setAccount(this.account);
      this.juniorBond?.setAccount(this.account);
      this.seniorBond?.setAccount(this.account);
    });
  }

  loaded: boolean = false;

  decimals?: number;
  totalSupply?: BigNumber;
  controllerAddr?: string;
  poolAddr?: string;
  juniorBondAddr?: string;
  seniorBondAddr?: string;
  abondDebt?: BigNumber;
  abondGain?: BigNumber;
  abondPaid?: BigNumber;
  juniorBondId?: BigNumber;
  seniorBondId?: BigNumber;
  tokensInJuniorBonds?: BigNumber;
  underlyingJuniors?: BigNumber;
  underlyingLiquidatedJuniors?: BigNumber;
  underlyingLoanable?: BigNumber;
  underlyingTotal?: BigNumber;
  price?: BigNumber;

  // account data
  balance?: BigNumber;

  // computed
  underlyingSeniors?: BigNumber;
  underlyingJuniorsPrice?: BigNumber;
  underlyingSeniorsPrice?: BigNumber;
  underlyingTotalPrice?: BigNumber;

  // related contracts
  pool?: SYPoolContract;
  juniorBond?: SYJuniorBondContract;
  seniorBond?: SYSeniorBondContract;
  controller?: SYControllerContract;

  abond?: {
    principal: BigNumber;
    gain: BigNumber;
    issuedAt: number;
    maturesAt: number;
    liquidated: boolean;
  };

  async init() {
    try {
      await this.loadCommon();
      await this.loadBalance();
      await this.loadRelatedContracts();
    } catch (e) {
      console.error('SYContract', e);
    }
  }

  private async loadCommon() {
    try {
      const [
        name,
        decimals,
        totalSupply,
        controllerAddr,
        poolAddr,
        seniorBondAddr,
        juniorBondAddr,
        abondDebt,
        abondGain,
        abondPaid,
        juniorBondId,
        seniorBondId,
        tokensInJuniorBonds,
        underlyingJuniors,
        underlyingLiquidatedJuniors,
        underlyingLoanable,
        underlyingTotal,
        price,
      ] = await this.batch([
        { method: 'name', },
        { method: 'decimals', transform: value => Number(value), },
        { method: 'totalSupply', transform: value => new BigNumber(value), },
        { method: 'controller', },
        { method: 'pool', },
        { method: 'seniorBond', },
        { method: 'juniorBond', },
        { method: 'abondDebt', transform: value => new BigNumber(value), },
        { method: 'abondGain', transform: value => new BigNumber(value), },
        { method: 'abondPaid', transform: value => new BigNumber(value), },
        { method: 'juniorBondId', transform: value => new BigNumber(value), },
        { method: 'seniorBondId', transform: value => new BigNumber(value), },
        { method: 'tokensInJuniorBonds', transform: value => new BigNumber(value), },
        { method: 'underlyingJuniors', transform: value => new BigNumber(value), },
        { method: 'underlyingLiquidatedJuniors', transform: value => new BigNumber(value), },
        { method: 'underlyingLoanable', transform: value => new BigNumber(value), },
        { method: 'underlyingTotal', transform: value => new BigNumber(value), },
        { method: 'price', transform: value => new BigNumber(value), },
      ]);

      this.name = name;
      this.decimals = decimals;
      this.totalSupply = totalSupply;

      this.controllerAddr = controllerAddr;
      this.poolAddr = poolAddr;
      this.seniorBondAddr = seniorBondAddr;
      this.juniorBondAddr = juniorBondAddr;

      this.juniorBondId = juniorBondId;
      this.seniorBondId = seniorBondId;

      this.abondDebt = abondDebt;
      this.abondGain = abondGain;
      this.abondPaid = abondPaid;
      this.tokensInJuniorBonds = tokensInJuniorBonds;
      this.underlyingJuniors = underlyingJuniors;
      this.underlyingLiquidatedJuniors = underlyingLiquidatedJuniors;
      this.underlyingLoanable = underlyingLoanable;
      this.underlyingTotal = underlyingTotal;
      this.price = price;

      this.underlyingSeniors = undefined;
      this.underlyingJuniorsPrice = undefined;
      this.underlyingSeniorsPrice = undefined;
      this.underlyingTotalPrice = undefined;

      if (this.underlyingTotal && this.underlyingJuniors) {
        this.underlyingSeniors = this.underlyingTotal.minus(this.underlyingJuniors);
      }

      if (this.price) {
        if (this.underlyingJuniors) {
          this.underlyingJuniorsPrice = this.underlyingJuniors.multipliedBy(this.price);
        }

        if (this.underlyingSeniors) {
          this.underlyingSeniorsPrice = this.underlyingSeniors?.multipliedBy(this.price);
        }

        if (this.underlyingTotal) {
          this.underlyingTotalPrice = this.underlyingTotal?.multipliedBy(this.price);
        }
      }

      this.loaded = true;

      this.emit('update');
    } catch (e) {
      console.error('SYContract', e);
    }
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
        console.error('SYContract', e);
      }
    }

    this.emit('update');
  }

  async loadAbond() {
    this.abond = undefined;

    try {
      const [
        abond,
      ] = await this.batch([
        {
          method: 'abond',
        },
      ]);

      this.abond = {
        ...abond,
        principal: getHumanValue(new BigNumber(abond.principal), this.decimals),
        gain: getHumanValue(new BigNumber(abond.gain), this.decimals),
        issuedAt: getHumanValue(new BigNumber(abond.issuedAt), 18)?.toNumber(), /// ??? this.decimals
        maturesAt: getHumanValue(new BigNumber(abond.maturesAt), 18)?.toNumber(), /// ??? this.decimals
      };
      console.log(this.abond);
    } catch (e) {
      console.error('SYContract', e);
    }

    this.emit('update');
  }

  private async loadRelatedContracts() {
    if (this.poolAddr) {
      try {
        this.pool = new SYPoolContract(this.poolAddr);
        this.pool.on('update', () => {
          this.emit('update');
        });
        this.pool.setProvider(this.currentProvider);
        this.pool.setAccount(this.account);
        await this.pool.init();
      } catch {
      }
    }

    if (this.juniorBondAddr) {
      try {
        this.juniorBond = new SYJuniorBondContract(this.juniorBondAddr);
        this.juniorBond.on('update', () => {
          this.emit('update');
        });
        this.juniorBond.setProvider(this.currentProvider);
        this.juniorBond.setAccount(this.account);
      } catch {
      }
    }

    if (this.seniorBondAddr) {
      try {
        this.seniorBond = new SYSeniorBondContract(this.seniorBondAddr);
        this.seniorBond.on('update', () => {
          this.emit('update');
        });
        this.seniorBond.setProvider(this.currentProvider);
        this.seniorBond.setAccount(this.account);
      } catch {
      }
    }

    if (this.controllerAddr) {
      try {
        this.controller = new SYControllerContract(this.controllerAddr);
        this.controller.on('update', () => {
          this.emit('update');
        });
        this.controller.setProvider(this.currentProvider);
        this.controller.setAccount(this.account);
        await this.controller.init();
      } catch {
      }
    }
  }

  buyTokensSend(underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    return this.send('buyTokens', [underlyingAmount, minTokens, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    });
  }

  buyBondSend(principalAmount: BigNumber, minGain: BigNumber, deadline: number, forDays: number, gasPrice: number): Promise<void> {
    return this.send('buyBond', [principalAmount, minGain, deadline, forDays], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    });
  }

  buyJuniorBondSend(tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number): Promise<void> {
    return this.send('buyJuniorBond', [tokenAmount, maxMaturesAt, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    });
  }

  sellTokensSend(tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    return this.send('sellTokens', [tokenAmount, minUnderlying, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    }).catch(e => console.log(e));
  }

  redeemJuniorBondSend(jBondId: number, gasPrice: number): Promise<void> {
    return this.send('redeemJuniorBond', [jBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    }).catch(e => console.log(e));
  }

  redeemBondSend(sBondId: number, gasPrice: number): Promise<void> {
    return this.send('redeemBond', [sBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).then(() => {
      this.reloadBalance();
    }).catch(e => console.log(e));
  }

  bondGainCall(principalAmount: BigNumber, forDays: number): Promise<BigNumber> {
    return this.call('bondGain', [principalAmount, forDays])
      .then(value => {
        return new BigNumber(value ?? ZERO_BIG_NUMBER);
      });
  }

  reloadBalance() {
    this.loadBalance()
      .catch(Error);
  }
}
