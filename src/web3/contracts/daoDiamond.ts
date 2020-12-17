import React from 'react';
import BigNumber from 'bignumber.js';

import { getNowTs } from 'utils';
import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { formatBigValue, getGasValue, getHumanValue, getNonHumanValue } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { BONDTokenMeta, VBONDTokenMeta } from 'web3/contracts/bond';

export const CONTRACT_DAO_DIAMOND_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_DIAMOND_ADDR).toLowerCase();
const Contract = new Web3Contract(
  require('web3/abi/dao_diamond.json'),
  CONTRACT_DAO_DIAMOND_ADDR,
  'DAO Diamond',
);

type DAODiamondContractData = {
  bondStaked?: BigNumber;
  balance?: BigNumber;
  votingPower?: BigNumber;
  delegatedPower?: number;
  userLockedUntil?: number;
  userDelegatedTo?: string;
  multiplier?: number;
};

export type DAODiamondActions = {
  deposit(amount: BigNumber, gasPrice: number): Promise<any>;
  withdraw(amount: BigNumber, gasPrice: number): Promise<any>;
  delegate(to: string, gasPrice: number): Promise<any>;
  stopDelegate(gasPrice: number): Promise<any>;
  lock(timestamp: number, gasPrice: number): Promise<any>;
};

export type DAODiamondContract = DAODiamondContractData & {
  contract: Web3Contract;
  reload(): void;
  actions: DAODiamondActions;
};

async function loadCommonData(): Promise<DAODiamondContractData> {
  const [bondStaked] = await Contract.batch([
    {
      method: 'bondStaked',
      transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
    },
  ]);

  return {
    bondStaked,
  };
}

async function loadUserData(userAddress?: string): Promise<DAODiamondContractData> {
  let balance: BigNumber | undefined;
  let votingPower: BigNumber | undefined;
  let delegatedPower: number | undefined;
  let userLockedUntil: number | undefined;
  let userDelegatedTo: string | undefined;
  let multiplier: number | undefined;

  if (userAddress) {
    [balance, votingPower, delegatedPower, userLockedUntil, userDelegatedTo, multiplier] = await Contract.batch([
      {
        method: 'balanceOf',
        methodArgs: [userAddress],
        transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
      },
      {
        method: 'votingPower',
        methodArgs: [userAddress],
        transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
      },
      {
        method: 'delegatedPower',
        methodArgs: [userAddress],
        transform: (value: string) => Number(value),
      },
      {
        method: 'userLockedUntil',
        methodArgs: [userAddress],
        transform: (value: string) => Number(value) * 1000,
      },
      {
        method: 'userDelegatedTo',
        methodArgs: [userAddress],
        transform: (value: string) => value,
      },
      {
        method: 'multiplierAtTs',
        methodArgs: [userAddress, getNowTs()],
        transform: (value: string) => formatBigValue(getHumanValue(new BigNumber(value), 18), 2, '-', 2),
      },
    ]);
  }

  return {
    balance,
    votingPower,
    delegatedPower,
    userLockedUntil,
    userDelegatedTo,
    multiplier,
  };
}

function depositSend(amount: BigNumber, from: string, gasPrice: number): Promise<any> {
  return Contract.send('deposit', [
    getNonHumanValue(amount, VBONDTokenMeta.decimals),
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function withdrawSend(amount: BigNumber, from: string, gasPrice: number): Promise<any> {
  return Contract.send('withdraw', [
    getNonHumanValue(amount, VBONDTokenMeta.decimals),
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function delegateSend(to: string, from: string, gasPrice: number): Promise<any> {
  return Contract.send('delegate', [
    to,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function stopDelegateSend(from: string, gasPrice: number): Promise<any> {
  return Contract.send('stopDelegate', [], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function lockSend(timestamp: number, from: string, gasPrice: number): Promise<any> {
  return Contract.send('lock', [
    timestamp,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

export function useDAODiamondContract(): DAODiamondContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<DAODiamondContractData>({});

  useAsyncEffect(async () => {
    const data = await loadCommonData();

    setData(prevState => ({
      ...prevState,
      ...data,
    }));
  }, [reload]);

  useAsyncEffect(async () => {
    const data = await loadUserData(wallet.account);

    setData(prevState => ({
      ...prevState,
      ...data,
    }));
  }, [reload, wallet.account]);

  function deposit(amount: BigNumber, gasPrice: number): Promise<any> {
    return wallet.account ? depositSend(amount, wallet.account, gasPrice) : Promise.reject();
  }

  function withdraw(amount: BigNumber, gasPrice: number): Promise<any> {
    return wallet.account ? withdrawSend(amount, wallet.account, gasPrice) : Promise.reject();
  }

  function delegate(to: string, gasPrice: number): Promise<any> {
    return wallet.account ? delegateSend(to, wallet.account, gasPrice) : Promise.reject();
  }

  function stopDelegate(gasPrice: number): Promise<any> {
    return wallet.account ? stopDelegateSend(wallet.account, gasPrice) : Promise.reject();
  }

  function lock(timestamp: number, gasPrice: number): Promise<any> {
    return wallet.account ? lockSend(timestamp, wallet.account, gasPrice) : Promise.reject();
  }

  return {
    ...data,
    contract: Contract,
    reload,
    actions: {
      deposit,
      withdraw,
      delegate,
      stopDelegate,
      lock,
    },
  };
}
