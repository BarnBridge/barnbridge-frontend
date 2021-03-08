import React from 'react';
import BigNumber from 'bignumber.js';
import STAKING_ABI from 'web3/abi/staking.json';
import Web3Contract, { BatchContractMethod, Web3ContractAbiItem } from 'web3/contract';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { TokenMeta } from 'web3/types';
import { getGasValue, getHumanValue, getNonHumanValue } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_STAKING_ADDR = String(process.env.REACT_APP_CONTRACT_STAKING_ADDR);

const Contract = new Web3Contract(STAKING_ABI as Web3ContractAbiItem[], CONTRACT_STAKING_ADDR, 'STAKING');

type StakingTokenData = {
  epochPoolSize?: BigNumber;
  nextEpochPoolSize?: BigNumber;
  balance?: BigNumber;
  epochUserBalance?: BigNumber;
  nextEpochUserBalance?: BigNumber;
};

type StakingContractData = {
  currentEpoch?: number;
  epoch1Start?: number;
  epochDuration?: number;
  currentEpochEnd?: number;
  usdc: StakingTokenData;
  dai: StakingTokenData;
  susd: StakingTokenData;
  uniswap: StakingTokenData;
  bond: StakingTokenData;
};

export type StakingContract = StakingContractData & {
  contract: Web3Contract;
  reload(): void;
  depositSend: (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => void;
  withdrawSend: (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => void;
  getEpochAt: (timestamp: number) => number | undefined;
  getEpochPeriod: (epoch: number) => [number, number] | undefined;
};

const InitialData: StakingContractData = {
  currentEpoch: undefined,
  epoch1Start: undefined,
  epochDuration: undefined,
  currentEpochEnd: undefined,
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
  uniswap: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  bond: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
};

export function useStakingContract(): StakingContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<StakingContractData>(InitialData);
  const dataRef = React.useRef<StakingContractData>(data);
  dataRef.current = data;

  React.useEffect(() => {
    (async () => {
      const [currentEpoch, epoch1Start, epochDuration] = await Contract.batch([
        {
          method: 'getCurrentEpoch',
          transform: (value: string) => Number(value),
        },
        {
          method: 'epoch1Start',
          transform: (value: string) => Number(value) * 1_000,
        },
        {
          method: 'epochDuration',
          transform: (value: string) => Number(value) * 1_000,
        },
      ]);

      setData(prevState => ({
        ...prevState,
        currentEpoch,
        epoch1Start,
        epochDuration,
        currentEpochEnd: epoch1Start + currentEpoch * epochDuration,
      }));

      const [
        usdcEpochPoolSize,
        usdcNextEpochPoolSize,
        daiEpochPoolSize,
        daiNextEpochPoolSize,
        susdEpochPoolSize,
        susdNextEpochPoolSize,
        uniEpochPoolSize,
        uniNextEpochPoolSize,
        bondEpochPoolSize,
        bondNextEpochPoolSize,
      ] = await Contract.batch([
        ...[USDCTokenMeta, DAITokenMeta, SUSDTokenMeta, UNISWAPTokenMeta, BONDTokenMeta].reduce(
          (ac: BatchContractMethod[], token) => {
            return [
              ...ac,
              {
                method: 'getEpochPoolSize',
                methodArgs: [token.address, currentEpoch],
                transform: (value: string) => getHumanValue(new BigNumber(value), token.decimals),
              },
              {
                method: 'getEpochPoolSize',
                methodArgs: [token.address, currentEpoch + 1],
                transform: (value: string) => getHumanValue(new BigNumber(value), token.decimals),
              },
            ];
          },
          [],
        ),
      ]);

      setData(prevState => ({
        ...prevState,
        usdc: {
          ...prevState.usdc,
          epochPoolSize: usdcEpochPoolSize,
          nextEpochPoolSize: usdcNextEpochPoolSize,
        },
        dai: {
          ...prevState.dai,
          epochPoolSize: daiEpochPoolSize,
          nextEpochPoolSize: daiNextEpochPoolSize,
        },
        susd: {
          ...prevState.susd,
          epochPoolSize: susdEpochPoolSize,
          nextEpochPoolSize: susdNextEpochPoolSize,
        },
        uniswap: {
          ...prevState.uniswap,
          epochPoolSize: uniEpochPoolSize,
          nextEpochPoolSize: uniNextEpochPoolSize,
        },
        bond: {
          ...prevState.bond,
          epochPoolSize: bondEpochPoolSize,
          nextEpochPoolSize: bondNextEpochPoolSize,
        },
      }));
    })();
  }, [reload]);

  React.useEffect(() => {
    (async () => {
      const { currentEpoch } = data;

      let usdcBalance: BigNumber | undefined;
      let usdcEpochUserBalance: BigNumber | undefined;
      let usdcNextEpochUserBalance: BigNumber | undefined;
      let daiBalance: BigNumber | undefined;
      let daiEpochUserBalance: BigNumber | undefined;
      let daiNextEpochUserBalance: BigNumber | undefined;
      let susdBalance: BigNumber | undefined;
      let susdEpochUserBalance: BigNumber | undefined;
      let susdNextEpochUserBalance: BigNumber | undefined;
      let uniswapBalance: BigNumber | undefined;
      let uniswapEpochUserBalance: BigNumber | undefined;
      let uniswapNextEpochUserBalance: BigNumber | undefined;
      let bondBalance: BigNumber | undefined;
      let bondEpochUserBalance: BigNumber | undefined;
      let bondNextEpochUserBalance: BigNumber | undefined;

      if (wallet.account && currentEpoch !== undefined) {
        [
          usdcBalance,
          usdcEpochUserBalance,
          usdcNextEpochUserBalance,
          daiBalance,
          daiEpochUserBalance,
          daiNextEpochUserBalance,
          susdBalance,
          susdEpochUserBalance,
          susdNextEpochUserBalance,
          uniswapBalance,
          uniswapEpochUserBalance,
          uniswapNextEpochUserBalance,
          bondBalance,
          bondEpochUserBalance,
          bondNextEpochUserBalance,
        ] = await Contract.batch([
          ...[USDCTokenMeta, DAITokenMeta, SUSDTokenMeta, UNISWAPTokenMeta, BONDTokenMeta].reduce(
            (ac: BatchContractMethod[], token) => [
              ...ac,
              {
                method: 'balanceOf',
                methodArgs: [wallet.account, token.address],
                transform: (value: string) => getHumanValue(new BigNumber(value), token.decimals),
              },
              {
                method: 'getEpochUserBalance',
                methodArgs: [wallet.account, token.address, currentEpoch],
                transform: (value: string) => getHumanValue(new BigNumber(value), token.decimals),
              },
              {
                method: 'getEpochUserBalance',
                methodArgs: [wallet.account, token.address, currentEpoch + 1],
                transform: (value: string) => getHumanValue(new BigNumber(value), token.decimals),
              },
            ],
            [],
          ),
        ]);
      }

      setData(prevState => ({
        ...prevState,
        usdc: {
          ...prevState.usdc,
          balance: usdcBalance,
          epochUserBalance: usdcEpochUserBalance,
          nextEpochUserBalance: usdcNextEpochUserBalance,
        },
        dai: {
          ...prevState.dai,
          balance: daiBalance,
          epochUserBalance: daiEpochUserBalance,
          nextEpochUserBalance: daiNextEpochUserBalance,
        },
        susd: {
          ...prevState.susd,
          balance: susdBalance,
          epochUserBalance: susdEpochUserBalance,
          nextEpochUserBalance: susdNextEpochUserBalance,
        },
        uniswap: {
          ...prevState.uniswap,
          balance: uniswapBalance,
          epochUserBalance: uniswapEpochUserBalance,
          nextEpochUserBalance: uniswapNextEpochUserBalance,
        },
        bond: {
          ...prevState.bond,
          balance: bondBalance,
          epochUserBalance: bondEpochUserBalance,
          nextEpochUserBalance: bondNextEpochUserBalance,
        },
      }));
    })();
  }, [reload, wallet.account, data.currentEpoch]);

  const depositSend = React.useCallback(
    (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return Contract.send('deposit', [tokenMeta.address, getNonHumanValue(amount, tokenMeta.decimals)], {
        from: wallet.account,
        gasPrice: getGasValue(gasPrice),
      }).then(reload);
    },
    [reload, Contract, wallet.account],
  );

  const withdrawSend = React.useCallback(
    (tokenMeta: TokenMeta, amount: BigNumber, gasPrice: number) => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return Contract.send('withdraw', [tokenMeta.address, getNonHumanValue(amount, tokenMeta.decimals)], {
        from: wallet.account,
        gasPrice: getGasValue(gasPrice),
      }).then(reload);
    },
    [reload, Contract, wallet.account],
  );

  const getEpochAt = React.useCallback(
    (timestamp: number): number | undefined => {
      const { epoch1Start, epochDuration } = dataRef.current;

      if (epoch1Start === undefined || epochDuration === undefined) {
        return undefined;
      }

      return Math.floor((timestamp - epoch1Start) / epochDuration);
    },
    [dataRef],
  );

  const getEpochPeriod = React.useCallback(
    (epoch: number): [number, number] | undefined => {
      const { epoch1Start, epochDuration } = dataRef.current;

      if (epoch1Start === undefined || epochDuration === undefined) {
        return undefined;
      }

      const start = epoch1Start + (epoch - 1) * epochDuration;
      const end = start + epochDuration;

      return [start, end];
    },
    [dataRef],
  );

  return React.useMemo<StakingContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      depositSend,
      withdrawSend,
      getEpochAt,
      getEpochPeriod,
    }),
    [data, Contract, reload, depositSend, withdrawSend, getEpochAt, getEpochPeriod],
  );
}
