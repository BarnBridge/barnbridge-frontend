import React from 'react';
import BigNumber from 'bignumber.js';

import { useWallet } from 'wallets/wallet';
import Web3Contract from 'web3/contract';
import { getHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import useMergeState from 'hooks/useMergeState';

export type Erc20ContractState = {
  name?: string;
  decimals?: number;
  balance?: BigNumber;
  allowance?: BigNumber;
  isAllowed?: boolean;
  isApproving: boolean;
};

const InitialState: Erc20ContractState = {
  name: undefined,
  decimals: undefined,
  balance: undefined,
  allowance: undefined,
  isAllowed: undefined,
  isApproving: false,
};

type Erc20ContractComputed = {
  maxAllowed: BigNumber;
};

type Erc20ContractActions = {
  approve: (value: BigNumber) => Promise<void>;
  approveMin: () => Promise<void>;
  approveMax: () => Promise<void>;
  reloadBalance: () => void;
};

export type UseErc20ContractType = {
  state: Erc20ContractState;
  computed: Erc20ContractComputed;
  actions: Erc20ContractActions;
};

export function useErc20Contract(tokenAddress: string, targetAddress: string): UseErc20ContractType {
  const wallet = useWallet();

  const contract = React.useMemo(() => {
    return new Web3Contract(require('web3/abi/erc20.json'), tokenAddress, `ERC20_${tokenAddress}`);
  }, [tokenAddress]);

  const [state, setState] = useMergeState<Erc20ContractState>(InitialState);

  const loadCommon = React.useCallback(() => {
    setState({
      name: undefined,
      decimals: undefined,
    });

    contract.batch([
      {
        method: 'name',
      },
      {
        method: 'decimals',
      }
    ])
      .then(([name, decimals]) => {
        setState({
          name,
          decimals,
        });
      });
  }, [contract]);

  const loadBalance = React.useCallback(() => {
    setState({
      balance: undefined,
    });

    if (!wallet.account) {
      return;
    }

    if (!state.decimals) {
      return;
    }

    contract.batch([{
      method: 'balanceOf',
      methodArgs: [wallet.account],
      transform: value => value ? getHumanValue(new BigNumber(value), state.decimals) : undefined,
    }])
      .then(([balance]) => {
        setState({
          balance,
        });
      });
  }, [contract, wallet.account, state.decimals]);

  const loadAllowance = React.useCallback(() => {
    setState({
      allowance: undefined,
      isAllowed: undefined,
    });

    if (!wallet.account) {
      return;
    }

    if (!state.decimals) {
      return;
    }

    contract.batch([{
      method: 'allowance',
      methodArgs: [wallet.account, targetAddress],
      transform: value => value ? new BigNumber(value) : undefined,
    }])
      .then(([allowance]) => {
        setState({
          allowance,
          isAllowed: allowance?.gt(ZERO_BIG_NUMBER) ?? false,
        });
      });
  }, [contract, wallet.account, state.decimals, targetAddress]);

  React.useEffect(() => {
    if (!wallet.provider) {
      return;
    }

    contract.setProvider(wallet.provider);
  }, [wallet.provider]);

  React.useEffect(() => {
    loadCommon();
  }, [loadCommon]);

  React.useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  React.useEffect(() => {
    loadAllowance();
  }, [loadAllowance]);

  const approve = React.useCallback(async (value: BigNumber): Promise<void> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      setState({
        isApproving: true,
      });

      try {
        await contract.send('approve', [targetAddress, value], {
          from: wallet.account,
        });

        loadAllowance();
      } catch {
      }

      setState({
        isApproving: false,
      });
    },
    [contract, wallet.account, targetAddress, loadAllowance],
  );

  const approveMin = React.useCallback((): Promise<void> => {
    return approve(ZERO_BIG_NUMBER);
  }, [approve]);

  const approveMax = React.useCallback((): Promise<void> => {
    return approve(MAX_UINT_256);
  }, [approve]);

  const reloadBalance = React.useCallback(loadBalance, []);

  return React.useMemo(() => ({
    state,
    computed: {
      get maxAllowed(): BigNumber {
        return BigNumber.min(
          state.allowance ?? ZERO_BIG_NUMBER,
          state.balance ?? ZERO_BIG_NUMBER,
        );
      },
    },
    actions: {
      approve,
      approveMin,
      approveMax,
      reloadBalance,
    },
  }), [state, approve]);
}
