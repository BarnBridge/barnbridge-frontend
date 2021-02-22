import React from 'react';
import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { ZERO_BIG_NUMBER, getGasValue, getHumanValue } from 'web3/utils';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

const CONTRACT_SY_ADDR = String(process.env.REACT_APP_CONTRACT_SY_ADDR).toLowerCase();

type SYContractData = {
  underlyingTotal?: BigNumber;
  underlyingJuniors?: BigNumber;
  price?: BigNumber;
  abondGain?: BigNumber;
  balance?: BigNumber;
};

export type SYContract = SYContractData & {
  contract: Web3Contract;
  reload(): void;
  getBondGain(principalAmount: BigNumber, forDays: number): Promise<BigNumber>;
  buyTokens(underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void>;
  buyBond(
    principalAmount: BigNumber,
    minGain: BigNumber,
    deadline: number,
    forDays: number,
    gasPrice: number,
  ): Promise<void>;
};

const InitialData: SYContractData = {};

const Contract = new Web3Contract(require('web3/abi/sy.json'), CONTRACT_SY_ADDR, 'SY');

const DECIMALS_1 = 6;
const DECIMALS_2 = 18;

function getBondGainCall(principalAmount: BigNumber, forDays: number): Promise<BigNumber> {
  return Contract.call('bondGain', [principalAmount, forDays]).then(value => {
    return new BigNumber(value ?? ZERO_BIG_NUMBER);
  });
}

function buyTokensSend(
  underlyingAmount: BigNumber,
  minTokens: BigNumber,
  deadline: number,
  from: string,
  gasPrice: number,
): Promise<void> {
  return Contract.send('buyTokens', [underlyingAmount, minTokens, deadline], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function buyBondSend(
  principalAmount: BigNumber,
  minGain: BigNumber,
  deadline: number,
  forDays: number,
  from: string,
  gasPrice: number,
): Promise<void> {
  return Contract.send('buyBond', [principalAmount, minGain, deadline, forDays], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

export function useSYContract(): SYContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [state, setState] = useMergeState<SYContractData>(InitialData);

  useAsyncEffect(async () => {
    let underlyingTotal: BigNumber | undefined;
    let underlyingJuniors: BigNumber | undefined;
    let price: BigNumber | undefined;
    let abondGain: BigNumber | undefined;

    [underlyingTotal, underlyingJuniors, price, abondGain] = await Contract.batch([
      {
        method: 'underlyingTotal',
        transform: (value: string) => getHumanValue(new BigNumber(value), DECIMALS_1),
      },
      {
        method: 'underlyingJuniors',
        transform: (value: string) => getHumanValue(new BigNumber(value), DECIMALS_1),
      },
      {
        method: 'price',
        transform: (value: string) => new BigNumber(value),
        // transform: (value: string) =>
        //   getHumanValue(new BigNumber(value), DECIMALS_2),
      },
      {
        method: 'abondGain',
        transform: (value: string) => getHumanValue(new BigNumber(value), DECIMALS_2),
      },
    ]);

    setState({
      underlyingTotal,
      underlyingJuniors,
      price,
      abondGain,
    });
  }, [reload]);

  useAsyncEffect(async () => {
    let balance: BigNumber | undefined;

    if (wallet.account) {
      [balance] = await Contract.batch([
        {
          method: 'balanceOf',
          methodArgs: [wallet.account],
          transform: (value: string) => getHumanValue(new BigNumber(value), 18),
        },
      ]);
    }

    setState({
      balance,
    });
  }, [reload, wallet.account]);

  const buyTokens = React.useCallback(
    (underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return buyTokensSend(underlyingAmount, minTokens, deadline, wallet.account, gasPrice).then(reload);
    },
    [reload, wallet.account],
  );

  const buyBond = React.useCallback(
    (
      principalAmount: BigNumber,
      minGain: BigNumber,
      deadline: number,
      forDays: number,
      gasPrice: number,
    ): Promise<void> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return buyBondSend(principalAmount, minGain, deadline, forDays, wallet.account, gasPrice).then(reload);
    },
    [reload, wallet.account],
  );

  const getBondGain = React.useCallback((principalAmount: BigNumber, forDays: number): Promise<BigNumber> => {
    return getBondGainCall(principalAmount, forDays);
  }, []);

  return React.useMemo<SYContract>(
    () => ({
      ...state,
      contract: Contract,
      reload,
      buyTokens,
      buyBond,
      getBondGain,
    }),
    [state, Contract, reload, buyTokens, buyBond, getBondGain],
  );
}
