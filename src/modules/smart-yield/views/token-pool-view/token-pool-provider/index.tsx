import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { SYOriginator, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import SYControllerContract from 'modules/smart-yield/providers/sy-pools-provider/sy-controller/contract';
import SYPoolCTokenContract from 'modules/smart-yield/providers/sy-pools-provider/sy-pool-c-token/contract';
import SYPoolUTokenContract from 'modules/smart-yield/providers/sy-pools-provider/sy-pool-u-token/contract';
import { SYContract } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';

type Actions = {
  enableToken: (enable: boolean) => Promise<void>;

  juniorDeposit: (
    underlyingAmount: BigNumber,
    minTokens: BigNumber,
    deadline: number,
    gasPrice: number,
  ) => Promise<void>;

  seniorDeposit: (
    principalAmount: BigNumber,
    minGain: BigNumber,
    deadline: number,
    forDays: number,
    gasPrice: number,
  ) => Promise<void>;

  juniorRegularWithdraw: (
    tokenAmount: BigNumber,
    maxMaturesAt: number,
    deadline: number,
    gasPrice: number,
  ) => Promise<void>;

  juniorInstantWithdraw: (
    tokenAmount: BigNumber,
    minUnderlying: BigNumber,
    deadline: number,
    gasPrice: number,
  ) => Promise<void>;
};

export type TokenPoolContextType = {
  address?: string;
  originator?: SYOriginator;
  sy?: SYContract;
  controller?: SYControllerContract;
  cToken?: SYPoolCTokenContract;
  uToken?: SYPoolUTokenContract;
  actions: Actions;
};

const TokenPoolContext = React.createContext<TokenPoolContextType>({
  address: undefined,
  originator: undefined,
  sy: undefined,
  controller: undefined,
  cToken: undefined,
  uToken: undefined,
  actions: {
    enableToken: () => Promise.reject(),
    juniorDeposit: () => Promise.reject(),
    seniorDeposit: () => Promise.reject(),
    juniorRegularWithdraw: () => Promise.reject(),
    juniorInstantWithdraw: () => Promise.reject(),
  },
});

export function useTokenPool(): TokenPoolContextType {
  return React.useContext(TokenPoolContext);
}

type TokenPoolProviderProps = {
  tokenAddress: string;
};

const TokenPoolProvider: React.FC<TokenPoolProviderProps> = props => {
  const { tokenAddress, children } = props;

  const syPools = useSYPools();
  const [reload, version] = useReload();

  const originator = React.useMemo<SYOriginator | undefined>(() => {
    return syPools.state.originators.find(originator => originator.address === tokenAddress);
  }, [syPools.state.originators, tokenAddress, version]);

  const sy = React.useMemo<SYContract | undefined>(() => {
    return syPools.state.contracts.get(tokenAddress);
  }, [syPools.state.contracts, tokenAddress, version]);

  const controller = React.useMemo<SYControllerContract | undefined>(() => {
    return sy?.controller;
  }, [sy, version]);

  const cToken = React.useMemo<SYPoolCTokenContract | undefined>(() => {
    return sy?.pool?.cToken;
  }, [sy?.pool?.cToken]);

  const uToken = React.useMemo<SYPoolUTokenContract | undefined>(() => {
    return sy?.pool?.uToken;
  }, [sy, version]);

  React.useEffect(() => {
    if (sy) {
      sy.on('update', () => {
        console.log(sy);
        reload();
      });
    }
  }, [sy]);

  const enableToken = React.useCallback(
    (enable: boolean) => {
      if (enable) {
        return uToken?.approveMax() ?? Promise.reject();
      }

      return uToken?.approveMin() ?? Promise.reject();
    },
    [uToken],
  );

  const juniorDeposit = React.useCallback(
    (underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> => {
      return (
        sy?.buyTokensSend(underlyingAmount, minTokens, deadline, gasPrice).then(() => {
          uToken?.reloadBalance();
        }) ?? Promise.reject()
      );
    },
    [sy, uToken],
  );

  const seniorDeposit = React.useCallback(
    (
      principalAmount: BigNumber,
      minGain: BigNumber,
      deadline: number,
      forDays: number,
      gasPrice: number,
    ): Promise<void> => {
      return (
        sy?.buyBondSend(principalAmount, minGain, deadline, forDays, gasPrice).then(() => {
          uToken?.reloadBalance();
        }) ?? Promise.reject()
      );
    },
    [sy, uToken],
  );

  const juniorRegularWithdraw = React.useCallback(
    (tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number): Promise<void> => {
      return (
        sy?.buyJuniorBondSend(tokenAmount, maxMaturesAt, deadline, gasPrice).then(() => {
          uToken?.reloadBalance();
        }) ?? Promise.reject()
      );
    },
    [sy, uToken],
  );

  const juniorInstantWithdraw = React.useCallback(
    (tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number): Promise<void> => {
      console.log({
        tokenAmount,
        minUnderlying,
        deadline,
        gasPrice,
      });
      return (
        sy?.sellTokensSend(tokenAmount, minUnderlying, deadline, gasPrice).then(() => {
          uToken?.reloadBalance();
        }) ?? Promise.reject()
      );
    },
    [sy, uToken],
  );

  const value = React.useMemo(
    () => ({
      address: tokenAddress,
      originator,
      sy,
      controller,
      cToken,
      uToken,
      actions: {
        enableToken,
        juniorDeposit,
        seniorDeposit,
        juniorRegularWithdraw,
        juniorInstantWithdraw,
      },
      version,
    }),
    [
      tokenAddress,
      originator,
      sy,
      controller,
      cToken,
      uToken,
      enableToken,
      juniorDeposit,
      seniorDeposit,
      juniorRegularWithdraw,
      juniorInstantWithdraw,
      version,
    ],
  );

  return <TokenPoolContext.Provider value={value}>{children}</TokenPoolContext.Provider>;
};

export default TokenPoolProvider;
