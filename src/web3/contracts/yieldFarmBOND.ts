import React from 'react';
import BigNumber from 'bignumber.js';
import Web3Contract, { BatchContractMethod } from 'web3/contract';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export const CONTRACT_YIELD_FARM_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_YIELD_FARM_BOND_ADDR);

type State = {
  isEnded?: boolean;
  totalEpochs?: number;
  totalReward?: BigNumber;
  epochReward?: BigNumber;
  nextCurrentEpoch?: number;
  currentEpoch?: number;
  bondReward?: BigNumber;
  poolSize?: BigNumber;
  nextPoolSize?: BigNumber;
  epochStake?: BigNumber;
  nextEpochStake?: BigNumber;
  currentReward?: BigNumber;
  potentialReward?: BigNumber;
};

const InitialState: State = {
  isEnded: undefined,
  totalEpochs: undefined,
  totalReward: undefined,
  epochReward: undefined,
  nextCurrentEpoch: undefined,
  currentEpoch: undefined,
  bondReward: undefined,
  poolSize: undefined,
  nextPoolSize: undefined,
  epochStake: undefined,
  nextEpochStake: undefined,
  currentReward: undefined,
  potentialReward: undefined,
};

export type YieldFarmBONDContract = State & {
  contract: Web3Contract;
  massHarvestSend: () => void;
  reload: () => void;
};

const contract = new Web3Contract(
  require('web3/abi/yield_farm_bond.json'),
  CONTRACT_YIELD_FARM_BOND_ADDR,
  'YIELD_FARM_BOND',
);

function nrOfEpochsAction(): BatchContractMethod {
  return {
    method: 'NR_OF_EPOCHS',
    transform: (value: string) => Number(value),
  };
}

function totalDistributedAmountAction(): BatchContractMethod {
  return {
    method: 'TOTAL_DISTRIBUTED_AMOUNT',
    transform: (value: string) => new BigNumber(value),
  };
}

function getCurrentEpoch(): BatchContractMethod {
  return {
    method: 'getCurrentEpoch',
    transform: (value: string) => Number(value),
  };
}

function getPoolSizeAction(epoch: number): BatchContractMethod {
  return {
    method: 'getPoolSize',
    methodArgs: [epoch],
    transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  };
}

function getEpochStakeAction(account: string, epoch: number): BatchContractMethod {
  return {
    method: 'getEpochStake',
    methodArgs: [account, epoch],
    transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  };
}

function massHarvestAction(account: string): BatchContractMethod {
  return {
    method: 'massHarvest',
    callArgs: { from: account },
    transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  };
}

export function useYieldFarmBONDContract(): YieldFarmBONDContract {
  const [reload, version] = useReload();
  const wallet = useWallet();

  const [state, setState] = useMergeState<State>(InitialState);

  React.useEffect(() => {
    const actions: BatchContractMethod[] = [nrOfEpochsAction(), totalDistributedAmountAction(), getCurrentEpoch()];

    contract
      .batch(actions)
      .then(([totalEpochs, totalReward, currentEpoch]) => {
        let epochReward: BigNumber | undefined;

        if (totalReward && totalEpochs > 0) {
          epochReward = totalReward.div(totalEpochs);
        }

        let bondReward: BigNumber | undefined;

        if (epochReward && currentEpoch > 0) {
          bondReward = BigNumber.min(epochReward.multipliedBy(currentEpoch - 1), totalReward);
        }

        setState({
          totalEpochs,
          totalReward,
          nextCurrentEpoch: currentEpoch,
          currentEpoch: Math.min(currentEpoch, totalEpochs),
          isEnded: currentEpoch > totalEpochs,
          epochReward,
          bondReward,
        });
      })
      .catch(() => {
        setState({
          totalEpochs: undefined,
          totalReward: undefined,
          nextCurrentEpoch: undefined,
          currentEpoch: undefined,
          isEnded: undefined,
          epochReward: undefined,
          bondReward: undefined,
        });
      });
  }, [version, setState]);

  React.useEffect(() => {
    const { nextCurrentEpoch } = state;
    const actions: BatchContractMethod[] = [];

    if (nextCurrentEpoch !== undefined) {
      actions.push(getPoolSizeAction(nextCurrentEpoch), getPoolSizeAction(nextCurrentEpoch + 1));
    }

    contract
      .batch(actions)
      .then(([poolSize, nextPoolSize]) => {
        setState({
          poolSize,
          nextPoolSize,
        });
      })
      .catch(() => {
        setState({
          poolSize: undefined,
          nextPoolSize: undefined,
        });
      });
  }, [version, state.nextCurrentEpoch, setState]);

  React.useEffect(() => {
    const { nextCurrentEpoch } = state;
    const actions: BatchContractMethod[] = [];

    if (wallet.account && nextCurrentEpoch !== undefined) {
      actions.push(
        getEpochStakeAction(wallet.account, nextCurrentEpoch),
        getEpochStakeAction(wallet.account, nextCurrentEpoch + 1),
        massHarvestAction(wallet.account),
      );
    }

    contract
      .batch(actions)
      .then(([epochStake, nextEpochStake, currentReward]) => {
        setState({
          epochStake,
          nextEpochStake,
          currentReward,
        });
      })
      .catch(() => {
        setState({
          epochStake: undefined,
          nextEpochStake: undefined,
          currentReward: undefined,
        });
      });
  }, [version, wallet.account, state.nextCurrentEpoch, setState]);

  React.useEffect(() => {
    const { epochStake } = state;
    const { poolSize } = state;
    const { epochReward } = state;

    let potentialReward: BigNumber | undefined;

    if (epochStake !== undefined && poolSize !== undefined && epochReward !== undefined) {
      if (poolSize.isEqualTo(ZERO_BIG_NUMBER)) {
        potentialReward = ZERO_BIG_NUMBER;
      } else {
        potentialReward = epochStake.div(poolSize).multipliedBy(epochReward);
      }
    }

    setState({
      potentialReward,
    });
  }, [version, state.epochStake, state.poolSize, state.epochReward, setState]);

  const massHarvestSend = React.useCallback(() => {
    if (!wallet.account) {
      return Promise.reject();
    }

    return contract
      .send('massHarvest', [], {
        from: wallet.account,
      })
      .then(reload);
  }, [reload, wallet.account]);

  return React.useMemo<YieldFarmBONDContract>(
    () => ({
      ...state,
      contract,
      massHarvestSend,
      reload,
    }),
    [state, massHarvestSend, reload],
  );
}
