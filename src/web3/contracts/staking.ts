import React from 'react';
import BigNumber from 'bignumber.js';

import {
  assertValues,
  batchContract,
  createContract,
  getHumanValue,
  getNonHumanValue,
  sendContract,
} from 'web3/utils';
import {
  CONTRACT_DAI_ADDR,
  CONTRACT_SUSD_ADDR,
  CONTRACT_UNISWAP_V2_ADDR,
  CONTRACT_USDC_ADDR,
  TokenInfo,
} from 'web3/contracts';

export type StakingContract = {
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
  depositSend: (tokenInfo: TokenInfo, account: string, amount: BigNumber, gasPrice: number) => void;
  withdrawSend: (tokenInfo: TokenInfo, account: string, amount: BigNumber, gasPrice: number) => void;
  getEpochAt: (timestamp: number) => number | undefined;
  getEpochPeriod: (epoch: number) => number[];
};

const InitialDataState: StakingContract = {
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
  String(process.env.REACT_APP_CONTRACT_STAKING_ADDR),
);

export function useStakingContract(account?: string): StakingContract {
  const [data, setData] = React.useState<StakingContract>(InitialDataState);
  const [version, setVersion] = React.useState<number>(0);

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
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_USDC_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_USDC_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_DAI_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_DAI_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_SUSD_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_SUSD_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_UNISWAP_V2_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_UNISWAP_V2_ADDR, currentEpoch + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        epoch1Start: Number(epoch1Start) * 1000,
        epochDuration: Number(epochDuration) * 1000,
        currentEpoch: Number(currentEpoch),
        usdc: {
          ...prevState.usdc,
          epochPoolSize: getHumanValue(new BigNumber(usdcEpochPoolSize), 6), // TODO: get decimals from USDC contract
          nextEpochPoolSize: getHumanValue(new BigNumber(usdcNextEpochPoolSize), 6), // TODO: get decimals from USDC contract
        },
        dai: {
          ...prevState.dai,
          epochPoolSize: getHumanValue(new BigNumber(daiEpochPoolSize), 18), // TODO: get decimals from DAI contract
          nextEpochPoolSize: getHumanValue(new BigNumber(daiNextEpochPoolSize), 18), // TODO: get decimals from DAI contract
        },
        susd: {
          ...prevState.susd,
          epochPoolSize: getHumanValue(new BigNumber(susdEpochPoolSize), 18), // TODO: get decimals from SUSD contract
          nextEpochPoolSize: getHumanValue(new BigNumber(susdNextEpochPoolSize), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          epochPoolSize: getHumanValue(new BigNumber(uniEpochPoolSize), 18), // TODO: get decimals from UNISWAP V2 contract
          nextEpochPoolSize: getHumanValue(new BigNumber(uniNextEpochPoolSize), 18), // TODO: get decimals from UNISWAP V2 contract
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
        { method: 'balanceOf', methodArgs: [account, CONTRACT_USDC_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_DAI_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_SUSD_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_USDC_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_USDC_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_DAI_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_DAI_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_SUSD_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_SUSD_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch! + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        usdc: {
          ...prevState.usdc,
          balance: getHumanValue(new BigNumber(usdcBalance), 6), // TODO: get decimals from USDC contract
          epochUserBalance: getHumanValue(new BigNumber(usdcEpochUserBalance), 6), // TODO: get decimals from USDC contract
          nextEpochUserBalance: getHumanValue(new BigNumber(usdcNextEpochUserBalance), 6), // TODO: get decimals from USDC contract
        },
        dai: {
          ...prevState.dai,
          balance: getHumanValue(new BigNumber(daiBalance), 18), // TODO: get decimals from DAI contract
          epochUserBalance: getHumanValue(new BigNumber(daiEpochUserBalance), 18), // TODO: get decimals from DAI contract
          nextEpochUserBalance: getHumanValue(new BigNumber(daiNextEpochUserBalance), 18), // TODO: get decimals from DAI contract
        },
        susd: {
          ...prevState.susd,
          balance: getHumanValue(new BigNumber(susdBalance), 18), // TODO: get decimals from SUSD contract
          epochUserBalance: getHumanValue(new BigNumber(susdEpochUserBalance), 18), // TODO: get decimals from SUSD contract
          nextEpochUserBalance: getHumanValue(new BigNumber(susdNextEpochUserBalance), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          balance: getHumanValue(new BigNumber(uniBalance), 18), // TODO: get decimals from UNISWAP V2 contract
          epochUserBalance: getHumanValue(new BigNumber(uniEpochUserBalance), 18), // TODO: get decimals from UNISWAP V2 contract
          nextEpochUserBalance: getHumanValue(new BigNumber(uniNextEpochUserBalance), 18), // TODO: get decimals from UNISWAP V2 contract
        },
      }));
    })();
  }, [account, data.currentEpoch, version]); // eslint-disable-line react-hooks/exhaustive-deps

  function depositSend(tokenInfo: TokenInfo, account: string, amount: BigNumber, gasPrice: number) {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'deposit', [
      tokenInfo.address,
      getNonHumanValue(amount, tokenInfo.decimals),
    ], {
      from: account,
      gasPrice: getNonHumanValue(gasPrice, 9).toNumber(),
    })
      .then(async () => {
        setVersion(prevState => prevState + 1);
      });
  }

  function withdrawSend(tokenInfo: TokenInfo, account: string, amount: BigNumber, gasPrice: number) {
    if (!assertValues(account)) {
      return;
    }

    return sendContract(Contract, 'withdraw', [
      tokenInfo.address,
      getNonHumanValue(amount, tokenInfo.decimals),
    ], {
      from: account,
      gasPrice: getNonHumanValue(gasPrice, 9).toNumber(),
    })
      .then(async () => {
        setVersion(prevState => prevState + 1);
      });
  }

  function getEpochAt(timestamp: number): number | undefined {
    if (!data.epoch1Start || !data.epochDuration) {
      return undefined;
    }

    return Math.floor((timestamp - data.epoch1Start) / data.epochDuration);
  }

  function getEpochPeriod(epoch: number): number[] {
    const start = data.epoch1Start! + ((epoch-1) * data.epochDuration!);
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
