import BigNumber from 'bignumber.js';
import Web3Contract, { BatchContractMethod } from 'web3/contract';
import { getGasValue, getHumanValue } from 'web3/utils';

const ABI: any[] = [
  {
    name: 'totalSupply',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'price',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'abondDebt',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'abond',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: 'principal',
        type: 'uint256',
      },
      {
        name: 'gain',
        type: 'uint256',
      },
      {
        name: 'issuedAt',
        type: 'uint256',
      },
      {
        name: 'maturesAt',
        type: 'uint256',
      },
      {
        name: 'liquidated',
        type: 'bool',
      },
    ],
  },
  {
    name: 'bondGain',
    type: 'function',
    inputs: [
      {
        name: 'principalAmount_',
        type: 'uint256',
      },
      {
        name: 'forDays_',
        type: 'uint16',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'juniorBonds',
    type: 'function',
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'tokens',
        type: 'uint256',
      },
      {
        name: 'maturesAt',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'seniorBonds',
    type: 'function',
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'principal',
        type: 'uint256',
      },
      {
        name: 'gain',
        type: 'uint256',
      },
      {
        name: 'issuedAt',
        type: 'uint256',
      },
      {
        name: 'maturesAt',
        type: 'uint256',
      },
      {
        name: 'liquidated',
        type: 'bool',
      },
    ],
  },
  {
    name: 'buyTokens',
    type: 'function',
    inputs: [
      {
        name: 'underlyingAmount_',
        type: 'uint256',
      },
      {
        name: 'minTokens_',
        type: 'uint256',
      },
      {
        name: 'deadline_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'buyBond',
    type: 'function',
    inputs: [
      {
        name: 'principalAmount_',
        type: 'uint256',
      },
      {
        name: 'minGain_',
        type: 'uint256',
      },
      {
        name: 'deadline_',
        type: 'uint256',
      },
      {
        name: 'forDays_',
        type: 'uint16',
      },
    ],
    outputs: [],
  },
  {
    name: 'buyJuniorBond',
    type: 'function',
    inputs: [
      {
        name: 'tokenAmount_',
        type: 'uint256',
      },
      {
        name: 'maxMaturesAt_',
        type: 'uint256',
      },
      {
        name: 'deadline_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'sellTokens',
    type: 'function',
    inputs: [
      {
        name: 'tokenAmount_',
        type: 'uint256',
      },
      {
        name: 'minUnderlying_',
        type: 'uint256',
      },
      {
        name: 'deadline_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'redeemJuniorBond',
    type: 'function',
    inputs: [
      {
        name: 'jBondId_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'redeemBond',
    type: 'function',
    inputs: [
      {
        name: 'bondId_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
];

export type SYJuniorBondToken = {
  jBondId: number;
  tokens: BigNumber;
  maturesAt: number;
};

export type SYSeniorBondToken = {
  sBondId: number;
  principal: BigNumber;
  gain: BigNumber;
  issuedAt: number;
  maturesAt: number;
  liquidated: boolean;
};

export type SYAbond = {
  principal: BigNumber;
  gain: BigNumber;
  issuedAt: number;
  maturesAt: number;
  liquidated: boolean;
};

class SmartYieldContract extends Web3Contract {
  constructor(address: string, name: string) {
    super(ABI, address, name);
  }

  decimals?: number;
  balance?: BigNumber;

  loadBalance() {
    if (!this.account) {
      return Promise.reject();
    }

    return this.batch([
      {
        method: 'decimals',
      },
      {
        method: 'balanceOf',
        methodArgs: [this.account],
        transform: value => new BigNumber(value),
      },
    ]).then(([decimals, balance]) => {
      this.decimals = decimals;
      this.balance = getHumanValue(balance, this.decimals);
    });
  }

  async getTotalSupply(): Promise<BigNumber> {
    return this.call('totalSupply').then(value => new BigNumber(value));
  }

  async getPrice(): Promise<BigNumber> {
    return this.call('price').then(value => new BigNumber(value));
  }

  async getAbondDebt(): Promise<BigNumber> {
    return this.call('abondDebt').then(value => new BigNumber(value));
  }

  async getAbond(): Promise<SYAbond> {
    return this.call('abond').then(value => ({
      ...value,
      principal: new BigNumber(value.principal),
      gain: new BigNumber(value.gain),
      issuedAt: Math.floor(new BigNumber(value.issuedAt).dividedBy(1e18).toNumber()),
      maturesAt: Math.floor(new BigNumber(value.maturesAt).dividedBy(1e18).toNumber()),
    }));
  }

  async getBondGain(principalAmount: BigNumber, forDays: number): Promise<BigNumber> {
    return this.call('bondGain', [principalAmount, forDays]).then(value => new BigNumber(value));
  }

  async getJuniorBonds(jBondIds: number[]): Promise<SYJuniorBondToken[]> {
    let juniorBondTokens: SYJuniorBondToken[] = [];

    if (jBondIds.length > 0) {
      try {
        const methods = jBondIds.map<BatchContractMethod>(jBondId => ({
          method: 'juniorBonds',
          methodArgs: [jBondId],
          transform: value => ({
            jBondId,
            tokens: new BigNumber(value.tokens),
            maturesAt: Number(value.maturesAt) * 1_000,
          }),
        }));

        juniorBondTokens = await this.batch(methods);
      } catch (e) {
        console.error('SmartYieldContract:getJuniorBonds', e);
      }
    }

    return juniorBondTokens;
  }

  async getSeniorBonds(sBondIds: number[]): Promise<SYSeniorBondToken[]> {
    let seniorBondTokens: SYSeniorBondToken[] = [];

    if (sBondIds.length > 0) {
      try {
        const methods = sBondIds.map<BatchContractMethod>(sBondId => ({
          method: 'seniorBonds',
          methodArgs: [sBondId],
          transform: value => ({
            sBondId,
            principal: new BigNumber(value.principal),
            gain: new BigNumber(value.gain),
            issuedAt: Number(value.issuedAt) * 1_000,
            maturesAt: Number(value.maturesAt) * 1_000,
          }),
        }));

        seniorBondTokens = await this.batch(methods);
      } catch (e) {
        console.error('SmartYieldContract:getSeniorBonds', e);
      }
    }

    return seniorBondTokens;
  }

  buyTokensSend(underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    return this.send('buyTokens', [underlyingAmount, minTokens, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:buyTokens', e));
  }

  buyBondSend(
    principalAmount: BigNumber,
    minGain: BigNumber,
    deadline: number,
    forDays: number,
    gasPrice: number,
  ): Promise<void> {
    return this.send('buyBond', [principalAmount, minGain, deadline, forDays], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:buyBond', e));
  }

  buyJuniorBondSend(tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number): Promise<void> {
    return this.send('buyJuniorBond', [tokenAmount, maxMaturesAt, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:buyJuniorBond', e));
  }

  sellTokensSend(tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    return this.send('sellTokens', [tokenAmount, minUnderlying, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:sellTokens', e));
  }

  redeemJuniorBondSend(jBondId: number, gasPrice: number): Promise<void> {
    return this.send('redeemJuniorBond', [jBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:redeemJuniorBond', e));
  }

  redeemBondSend(sBondId: number, gasPrice: number): Promise<void> {
    return this.send('redeemBond', [sBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    }).catch(e => console.error('SmartYieldContract:redeemBond', e));
  }
}

export default SmartYieldContract;
