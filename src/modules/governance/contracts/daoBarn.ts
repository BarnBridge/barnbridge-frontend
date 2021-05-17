import React from 'react';
import BigNumber from 'bignumber.js';
import { getGasValue, getHumanValue, getNonHumanValue } from 'web3/utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import { BondToken } from 'components/providers/known-tokens-provider';
import config from 'config';
import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import DAO_BARN_ABI from './daoBarn.json';

import { getNowTs } from 'utils';

const Contract = new Web3Contract(DAO_BARN_ABI as Web3ContractAbiItem[], config.contracts.dao.barn, 'DAO Barn');

function loadCommonData(): Promise<any> {
  return Contract.batch([
    {
      method: 'bondStaked',
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals),
    },
  ]).then(([bondStaked]) => {
    return {
      bondStaked,
    };
  });
}

function loadUserData(userAddress?: string): Promise<any> {
  if (!userAddress) {
    return Promise.reject();
  }

  return Contract.batch([
    {
      method: 'balanceOf',
      methodArgs: [userAddress],
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals),
    },
    {
      method: 'votingPower',
      methodArgs: [userAddress],
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals),
    },
    {
      method: 'multiplierAtTs',
      methodArgs: [userAddress, getNowTs()],
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals)?.toNumber(),
    },
    {
      method: 'userLockedUntil',
      methodArgs: [userAddress],
      transform: (value: string) => Number(value) * 1_000,
    },
    {
      method: 'delegatedPower',
      methodArgs: [userAddress],
      transform: (value: string) => getHumanValue(new BigNumber(value), BondToken.decimals),
    },
    {
      method: 'userDelegatedTo',
      methodArgs: [userAddress],
    },
  ]).then(([balance, votingPower, multiplier, userLockedUntil, delegatedPower, userDelegatedTo]) => ({
    balance,
    votingPower,
    multiplier,
    userLockedUntil,
    delegatedPower,
    userDelegatedTo,
  }));
}

function bondStakedAtTsCall(timestamp: number): Promise<BigNumber | undefined> {
  return Contract.call('bondStakedAtTs', [timestamp], {}).then((value: string) =>
    getHumanValue(new BigNumber(value), BondToken.decimals),
  );
}

function votingPowerCall(address: string): Promise<BigNumber | undefined> {
  return Contract.call('votingPower', [address], {}).then((value: string) => getHumanValue(new BigNumber(value), 18));
}

function votingPowerAtTsCall(address: string, timestamp: number): Promise<BigNumber | undefined> {
  return Contract.call('votingPowerAtTs', [address, timestamp], {}).then((value: string) =>
    getHumanValue(new BigNumber(value), 18),
  );
}

function depositSend(amount: BigNumber, from: string, gasPrice: number): Promise<void> {
  return Contract.send('deposit', [getNonHumanValue(amount, 18)], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function withdrawSend(amount: BigNumber, from: string, gasPrice: number): Promise<void> {
  return Contract.send('withdraw', [getNonHumanValue(amount, 18)], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function delegateSend(to: string, from: string, gasPrice: number): Promise<void> {
  return Contract.send('delegate', [to], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function stopDelegateSend(from: string, gasPrice: number): Promise<void> {
  return Contract.send('stopDelegate', [], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function lockSend(timestamp: number, from: string, gasPrice: number): Promise<void> {
  return Contract.send('lock', [timestamp], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

export type DAOBarnContractData = {
  contract: Web3Contract;
  activationThreshold?: BigNumber;
  bondStaked?: BigNumber;
  balance?: BigNumber;
  votingPower?: BigNumber;
  multiplier?: number;
  userLockedUntil?: number;
  delegatedPower?: BigNumber;
  userDelegatedTo?: string;
};

const InitialState: DAOBarnContractData = {
  contract: Contract,
  activationThreshold: new BigNumber(400_000),
  bondStaked: undefined,
  balance: undefined,
  votingPower: undefined,
  multiplier: undefined,
  userLockedUntil: undefined,
  delegatedPower: undefined,
  userDelegatedTo: undefined,
};

export type DAOBarnContract = DAOBarnContractData & {
  reload(): void;
  actions: {
    bondStakedAtTs(timestamp: number): Promise<BigNumber | undefined>;
    votingPower(address: string): Promise<BigNumber | undefined>;
    votingPowerAtTs(timestamp: number): Promise<BigNumber | undefined>;
    deposit(amount: BigNumber, gasPrice: number): Promise<any>;
    withdraw(amount: BigNumber, gasPrice: number): Promise<any>;
    delegate(to: string, gasPrice: number): Promise<any>;
    stopDelegate(gasPrice: number): Promise<any>;
    lock(timestamp: number, gasPrice: number): Promise<any>;
  };
};

export function useDAOBarnContract(): DAOBarnContract {
  const wallet = useWallet();

  const [state, setState] = useMergeState<DAOBarnContractData>(InitialState);
  const [reload, version] = useReload();

  React.useEffect(() => {
    setState({
      bondStaked: undefined,
    });

    loadCommonData().then(setState).catch(Error);
  }, [version, setState]);

  React.useEffect(() => {
    setState({
      balance: undefined,
      votingPower: undefined,
      multiplier: undefined,
      userLockedUntil: undefined,
      delegatedPower: undefined,
      userDelegatedTo: undefined,
    });

    loadUserData(wallet.account).then(setState).catch(Error);
  }, [wallet.account, version, setState]);

  return {
    ...state,
    reload,
    actions: {
      bondStakedAtTs(timestamp: number): Promise<BigNumber | undefined> {
        return bondStakedAtTsCall(timestamp);
      },
      votingPower(address: string): Promise<BigNumber | undefined> {
        return votingPowerCall(address);
      },
      votingPowerAtTs(timestamp: number): Promise<BigNumber | undefined> {
        return wallet.isActive ? votingPowerAtTsCall(wallet.account!, timestamp) : Promise.reject();
      },
      deposit(amount: BigNumber, gasPrice: number): Promise<void> {
        return wallet.isActive ? depositSend(amount, wallet.account!, gasPrice) : Promise.reject();
      },
      withdraw(amount: BigNumber, gasPrice: number): Promise<void> {
        return wallet.isActive ? withdrawSend(amount, wallet.account!, gasPrice) : Promise.reject();
      },
      delegate(to: string, gasPrice: number): Promise<void> {
        return wallet.isActive ? delegateSend(to, wallet.account!, gasPrice) : Promise.reject();
      },
      stopDelegate(gasPrice: number): Promise<void> {
        return wallet.isActive ? stopDelegateSend(wallet.account!, gasPrice) : Promise.reject();
      },
      lock(timestamp: number, gasPrice: number): Promise<void> {
        return wallet.isActive ? lockSend(timestamp, wallet.account!, gasPrice) : Promise.reject();
      },
    },
  };
}
