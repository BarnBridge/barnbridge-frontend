import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { getGasValue } from 'web3/utils';
import Web3Contract, { BatchContractMethod } from 'web3/web3Contract';

const ABI: any[] = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'price',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'abondDebt',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'abond',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { internalType: 'uint256', name: 'principal', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'gain',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'issuedAt', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maturesAt',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'liquidated', type: 'bool' },
    ],
  },
  {
    name: 'bondGain',
    type: 'function',
    inputs: [
      { name: 'principalAmount', type: 'uint256' },
      { name: 'forDays', type: 'uint16' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'juniorBonds',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    outputs: [
      { internalType: 'uint256', name: 'tokens', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maturesAt',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'seniorBonds',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    outputs: [
      { internalType: 'uint256', name: 'principal', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'gain',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'issuedAt', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maturesAt',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'liquidated', type: 'bool' },
    ],
  },
  {
    name: 'buyTokens',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'uint256',
        name: 'underlyingAmount_',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'minTokens_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'deadline_',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    name: 'buyBond',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'uint256',
        name: 'principalAmount_',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'minGain_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'deadline_',
        type: 'uint256',
      },
      { internalType: 'uint16', name: 'forDays_', type: 'uint16' },
    ],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    name: 'buyJuniorBond',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'uint256', name: 'tokenAmount_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maxMaturesAt_',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'deadline_', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'sellTokens',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'uint256', name: 'tokenAmount_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'minUnderlying_',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'deadline_', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'redeemJuniorBond',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint256', name: 'jBondId_', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'redeemBond',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint256', name: 'bondId_', type: 'uint256' }],
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

class SYSmartYieldContract extends Erc20Contract {
  constructor(address: string) {
    super(ABI, address);
  }

  price?: BigNumber;
  abondDebt?: BigNumber;
  abond?: SYAbond;

  async loadCommon(): Promise<void> {
    super.loadCommon();

    return this.batch([
      {
        method: 'price',
        transform: value => BigNumber.from(value),
      },
      {
        method: 'abondDebt',
        transform: value => BigNumber.from(value),
      },
      {
        method: 'abond',
        transform: (value: SYAbond) => ({
          principal: BigNumber.from(value.principal),
          gain: BigNumber.from(value.gain),
          issuedAt: Math.floor(new BigNumber(value.issuedAt).dividedBy(1e18).toNumber()),
          maturesAt: Math.floor(new BigNumber(value.maturesAt).dividedBy(1e18).toNumber()),
          liquidated: value.liquidated,
        }),
      },
    ]).then(([price, abondDebt, abond]) => {
      this.price = price.dividedBy(1e18);
      this.abondDebt = abondDebt;
      this.abond = abond;
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  async getPrice(): Promise<BigNumber> {
    return this.call('price').then(value => new BigNumber(value));
  }

  async getAbondDebt(): Promise<BigNumber> {
    return this.call('abondDebt').then(value => new BigNumber(value));
  }

  async getAbond(): Promise<SYAbond> {
    return this.call('abond').then(value => ({
      principal: new BigNumber(value.principal),
      gain: new BigNumber(value.gain),
      issuedAt: Math.floor(new BigNumber(value.issuedAt).dividedBy(1e18).toNumber()),
      maturesAt: Math.floor(new BigNumber(value.maturesAt).dividedBy(1e18).toNumber()),
      liquidated: value.liquidated,
    }));
  }

  async getBondGain(principalAmount: BigNumber, forDays: number): Promise<BigNumber> {
    return this.call('bondGain', [principalAmount, forDays]).then(value => new BigNumber(value));
  }

  async getJuniorBonds(jBondIds: number[]): Promise<SYJuniorBondToken[]> {
    if (jBondIds.length === 0) {
      return Promise.resolve([]);
    }

    const methods = jBondIds.map<BatchContractMethod>(jBondId => ({
      method: 'juniorBonds',
      methodArgs: [jBondId],
      transform: value => ({
        jBondId,
        tokens: BigNumber.from(value.tokens),
        maturesAt: Number(value.maturesAt),
      }),
    }));

    return this.batch(methods);
  }

  async getSeniorBonds(sBondIds: number[]): Promise<SYSeniorBondToken[]> {
    if (sBondIds.length === 0) {
      return Promise.resolve([]);
    }

    const methods = sBondIds.map<BatchContractMethod>(sBondId => ({
      method: 'seniorBonds',
      methodArgs: [sBondId],
      transform: value => ({
        sBondId,
        principal: BigNumber.from(value.principal),
        gain: BigNumber.from(value.gain),
        issuedAt: Number(value.issuedAt),
        maturesAt: Number(value.maturesAt),
      }),
    }));

    return this.batch(methods);
  }

  buyTokensSend(underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('buyTokens', [underlyingAmount, minTokens, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  buyBondSend(
    principalAmount: BigNumber,
    minGain: BigNumber,
    deadline: number,
    forDays: number,
    gasPrice: number,
  ): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('buyBond', [principalAmount, minGain, deadline, forDays], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  buyJuniorBondSend(tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('buyJuniorBond', [tokenAmount, maxMaturesAt, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  sellTokensSend(tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('sellTokens', [tokenAmount, minUnderlying, deadline], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  redeemJuniorBondSend(jBondId: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('redeemJuniorBond', [jBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }

  redeemBondSend(sBondId: number, gasPrice: number): Promise<void> {
    if (!this.account) {
      return Promise.reject();
    }

    return this.send('redeemBond', [sBondId], {
      from: this.account,
      gasPrice: getGasValue(gasPrice),
    });
  }
}

export default SYSmartYieldContract;
