import React from 'react';
import BigNumber from 'bignumber.js';

import { getNowTs } from 'utils';
import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { getGasValue, getHumanValue, getNonHumanValue } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { BONDTokenMeta, VBONDTokenMeta } from 'web3/contracts/bond';

export const CONTRACT_DAO_BARN_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_BARN_ADDR).toLowerCase();

const Contract = new Web3Contract(
  require('web3/abi/dao_barn.json'),
  CONTRACT_DAO_BARN_ADDR,
  'DAO Barn',
);

type DAOBarnContractData = {
  activationThreshold?: BigNumber;
  bondStaked?: BigNumber;
  balance?: BigNumber;
  votingPower?: BigNumber;
  delegatedPower?: BigNumber;
  userLockedUntil?: number;
  userDelegatedTo?: string;
  multiplier?: number;
};

export type DAOBarnActions = {
  deposit(amount: BigNumber, gasPrice: number): Promise<any>;
  withdraw(amount: BigNumber, gasPrice: number): Promise<any>;
  delegate(to: string, gasPrice: number): Promise<any>;
  stopDelegate(gasPrice: number): Promise<any>;
  lock(timestamp: number, gasPrice: number): Promise<any>;
  votingPower(address: string): Promise<[BigNumber]>;
  votingPowerAtTs(timestamp: number): Promise<[BigNumber]>;
  bondStakedAtTs(timestamp: number): Promise<[BigNumber]>;
};

export type DAOBarnContract = DAOBarnContractData & {
  contract: Web3Contract;
  reload(): void;
  actions: DAOBarnActions;
};

async function loadCommonData(): Promise<DAOBarnContractData> {
  const [bondStaked] = await Contract.batch([
    {
      method: 'bondStaked',
      transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
    },
  ]);

  return {
    activationThreshold: new BigNumber(400_000),
    bondStaked,
  };
}

async function loadUserData(userAddress?: string): Promise<DAOBarnContractData> {
  let balance: BigNumber | undefined;
  let votingPower: BigNumber | undefined;
  let delegatedPower: BigNumber | undefined;
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
        transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
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
        transform: (value: string) => getHumanValue(new BigNumber(value), 18)?.toNumber(),
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

function votingPowerCall(address: string): Promise<any> {
  return Contract.batch([{
    method: 'votingPower',
    methodArgs: [address],
    transform: (value: string) => getHumanValue(new BigNumber(value), 18),
  }]);
}

function votingPowerAtTsCall(address: string, timestamp: number): Promise<any> {
  return Contract.batch([{
    method: 'votingPowerAtTs',
    methodArgs: [address, timestamp],
    transform: (value: string) => getHumanValue(new BigNumber(value), 18),
  }]);
}

function bondStakedAtTsCall(timestamp: number): Promise<any> {
  return Contract.batch([{
    method: 'bondStakedAtTs',
    methodArgs: [timestamp],
    transform: (value: string) => getHumanValue(new BigNumber(value), 18),
  }]);
}

export function useDAOBarnContract(): DAOBarnContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<DAOBarnContractData>({});

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

  function votingPower(address: string): Promise<any> {
    return votingPowerCall(address);
  }

  function votingPowerAtTs(timestamp: number): Promise<any> {
    return wallet.account ? votingPowerAtTsCall(wallet.account, timestamp) : Promise.reject();
  }

  function bondStakedAtTs(timestamp: number): Promise<any> {
    return bondStakedAtTsCall(timestamp);
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
      votingPower,
      votingPowerAtTs,
      bondStakedAtTs,
    },
  };
}
