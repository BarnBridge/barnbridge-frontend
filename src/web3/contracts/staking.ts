import React from 'react';
import BigNumber from 'bignumber.js';

import { TokenMeta } from 'web3/types';
import {
  assertValues,
  batchContract,
  createContract,
  getHumanValue,
  getNonHumanValue,
  sendContract,
} from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswapV2';
import { useVersion } from 'hooks/useVersion';

export const CONTRACT_STAKING_ADDR = String(process.env.REACT_APP_CONTRACT_STAKING_ADDR);

export type StakingContractType = {
  epoch1Start?: number;
  epochDuration?: number;
  currentEpoch?: number;
  epochEnd?: number;
  usdc: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  dai: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  susd: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  uniswap_v2: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  depositSend: (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => void;
  withdrawSend: (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => void;
  getEpochAt: (timestamp: number) => number | undefined;
  getEpochPeriod: (epoch: number) => number[];
};

const InitialData: StakingContractType = {
  epoch1Start: undefined,
  epochDuration: undefined,
  currentEpoch: undefined,
  usdc: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  dai: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  susd: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  uniswap_v2: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  depositSend: () => null,
  withdrawSend: () => null,
  getEpochAt: () => undefined,
  getEpochPeriod: () => [],
};

const Contract = createContract(
  require('web3/abi/staking.json'),
  CONTRACT_STAKING_ADDR,
);

export function useStakingContract(): StakingContractType {
  const { account } = useWeb3();
  const { version, incVersion } = useVersion();

  const [data, setData] = React.useState<StakingContractType>(InitialData);

  React.useEffect(() => {
    (async () => {
      const [currentEpoch, epoch1Start, epochDuration] = await batchContract(Contract, [
        'getCurrentEpoch',
        'epoch1Start',
        'epochDuration',
      ]);

      const [
        usdcEpochPoolSize,
        usdcNextEpochPoolSize,
        daiEpochPoolSize,
        daiNextEpochPoolSize,
        susdEpochPoolSize,
        susdNextEpochPoolSize,
        uniEpochPoolSize,
        uniNextEpochPoolSize,
      ] = await batchContract(Contract, [
        { method: 'getEpochPoolSize', methodArgs: [USDCTokenMeta.address, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [USDCTokenMeta.address, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [DAITokenMeta.address, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [DAITokenMeta.address, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [SUSDTokenMeta.address, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [SUSDTokenMeta.address, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [UNISWAPTokenMeta.address, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [UNISWAPTokenMeta.address, currentEpoch + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        epoch1Start: Number(epoch1Start) * 1000,
        epochDuration: Number(epochDuration) * 1000,
        currentEpoch: Number(currentEpoch),
        usdc: {
          ...prevState.usdc,
          epochPoolSize: getHumanValue(new BigNumber(usdcEpochPoolSize), USDCTokenMeta.decimals),
          nextEpochPoolSize: getHumanValue(new BigNumber(usdcNextEpochPoolSize), USDCTokenMeta.decimals),
        },
        dai: {
          ...prevState.dai,
          epochPoolSize: getHumanValue(new BigNumber(daiEpochPoolSize), DAITokenMeta.decimals),
          nextEpochPoolSize: getHumanValue(new BigNumber(daiNextEpochPoolSize), DAITokenMeta.decimals),
        },
        susd: {
          ...prevState.susd,
          epochPoolSize: getHumanValue(new BigNumber(susdEpochPoolSize), SUSDTokenMeta.decimals),
          nextEpochPoolSize: getHumanValue(new BigNumber(susdNextEpochPoolSize), SUSDTokenMeta.decimals),
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          epochPoolSize: getHumanValue(new BigNumber(uniEpochPoolSize), UNISWAPTokenMeta.decimals),
          nextEpochPoolSize: getHumanValue(new BigNumber(uniNextEpochPoolSize), UNISWAPTokenMeta.decimals),
        },
      }));
    })();
  }, [version]);

  React.useEffect(() => {
    if (!assertValues(account, data.currentEpoch)) {
      return;
    }

    (async () => {
      const [
        usdcBalance,
        daiBalance,
        susdBalance,
        uniBalance,
        usdcEpochUserBalance,
        usdcNextEpochUserBalance,
        daiEpochUserBalance,
        daiNextEpochUserBalance,
        susdEpochUserBalance,
        susdNextEpochUserBalance,
        uniEpochUserBalance,
        uniNextEpochUserBalance,
      ] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account, USDCTokenMeta.address] },
        { method: 'balanceOf', methodArgs: [account, DAITokenMeta.address] },
        { method: 'balanceOf', methodArgs: [account, SUSDTokenMeta.address] },
        { method: 'balanceOf', methodArgs: [account, UNISWAPTokenMeta.address] },
        { method: 'getEpochUserBalance', methodArgs: [account, USDCTokenMeta.address, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, USDCTokenMeta.address, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, DAITokenMeta.address, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, DAITokenMeta.address, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, SUSDTokenMeta.address, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, SUSDTokenMeta.address, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, UNISWAPTokenMeta.address, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, UNISWAPTokenMeta.address, data.currentEpoch! + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        usdc: {
          ...prevState.usdc,
          balance: getHumanValue(new BigNumber(usdcBalance), USDCTokenMeta.decimals),
          epochUserBalance: getHumanValue(new BigNumber(usdcEpochUserBalance), USDCTokenMeta.decimals),
          nextEpochUserBalance: getHumanValue(new BigNumber(usdcNextEpochUserBalance), USDCTokenMeta.decimals),
        },
        dai: {
          ...prevState.dai,
          balance: getHumanValue(new BigNumber(daiBalance), DAITokenMeta.decimals),
          epochUserBalance: getHumanValue(new BigNumber(daiEpochUserBalance), DAITokenMeta.decimals),
          nextEpochUserBalance: getHumanValue(new BigNumber(daiNextEpochUserBalance), DAITokenMeta.decimals),
        },
        susd: {
          ...prevState.susd,
          balance: getHumanValue(new BigNumber(susdBalance), SUSDTokenMeta.decimals),
          epochUserBalance: getHumanValue(new BigNumber(susdEpochUserBalance), SUSDTokenMeta.decimals),
          nextEpochUserBalance: getHumanValue(new BigNumber(susdNextEpochUserBalance), SUSDTokenMeta.decimals),
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          balance: getHumanValue(new BigNumber(uniBalance), UNISWAPTokenMeta.decimals),
          epochUserBalance: getHumanValue(new BigNumber(uniEpochUserBalance), UNISWAPTokenMeta.decimals),
          nextEpochUserBalance: getHumanValue(new BigNumber(uniNextEpochUserBalance), UNISWAPTokenMeta.decimals),
        },
      }));
    })();
  }, [account, data.currentEpoch, version]); // eslint-disable-line react-hooks/exhaustive-deps

  function depositSend(tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'deposit', [
      tokenMeta.address,
      getNonHumanValue(amount, tokenMeta.decimals),
    ], {
      from: account,
      gasPrice: getNonHumanValue(gasPrice, 9).toNumber(),
    })
      .then(async () => {
        incVersion();
      });
  }

  function withdrawSend(tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'withdraw', [
      tokenMeta.address,
      getNonHumanValue(amount, tokenMeta.decimals),
    ], {
      from: account,
      gasPrice: getNonHumanValue(gasPrice, 9).toNumber(),
    })
      .then(async () => {
        incVersion();
      });
  }

  function getEpochAt(timestamp: number): number | undefined {
    if (!data.epoch1Start || !data.epochDuration) {
      return undefined;
    }

    return Math.floor((timestamp - data.epoch1Start) / data.epochDuration);
  }

  function getEpochPeriod(epoch: number): number[] {
    const start = data.epoch1Start! + ((epoch - 1) * data.epochDuration!);
    const end = start + data.epochDuration!;

    return [start, end];
  }

  return {
    ...data,
    depositSend,
    withdrawSend,
    getEpochAt,
    getEpochPeriod,
  };
}
