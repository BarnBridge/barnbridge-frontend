import React from 'react';
import memoize from 'lodash/memoize';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';

export enum PoolTypes {
  STABLE = 'stable',
  UNILP = 'unilp',
  BOND = 'bond',
}

export enum PoolActions {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export const getPoolIcons = memoize((poolType: PoolTypes): React.ReactNode[] => {
  switch (poolType) {
    case PoolTypes.STABLE:
      return [USDCTokenMeta.icon, DAITokenMeta.icon, SUSDTokenMeta.icon];
    case PoolTypes.UNILP:
      return [UNISWAPTokenMeta.icon];
    case PoolTypes.BOND:
      return [BONDTokenMeta.icon];
    default:
      return [];
  }
});

export const getPoolNames = memoize((poolType: PoolTypes): string[] => {
  switch (poolType) {
    case PoolTypes.STABLE:
      return [USDCTokenMeta.name, DAITokenMeta.name, SUSDTokenMeta.name];
    case PoolTypes.UNILP:
      return [UNISWAPTokenMeta.name];
    case PoolTypes.BOND:
      return [BONDTokenMeta.name];
    default:
      return [];
  }
});
