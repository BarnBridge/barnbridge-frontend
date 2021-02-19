import React from 'react';
import BigNumber from 'bignumber.js';

import useMergeState from 'hooks/useMergeState';
import { useErc20Contract, UseErc20ContractType } from 'web3/useErc20Contract';
import { getNonHumanValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

const COMPOUND_PROVIDER_ADDR = String(process.env.REACT_APP_CONTRACT_SY_COMPOUND_PROVIDER_ADDR);

export type TokenPoolProviderState = {};

const InitialState: TokenPoolProviderState = {};

type TokenPoolProviderActions = {
  enableToken: (enable: boolean) => Promise<void>;
  juniorDeposit: (underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number) => Promise<void>;
  seniorDeposit: (principalAmount: BigNumber, minGain: BigNumber, deadline: number, forDays: number, gasPrice: number) => Promise<void>;
};

export type TokenPoolContextType = {
  tokenAddress?: string;
  state: TokenPoolProviderState;
  erc20?: UseErc20ContractType;
  actions: TokenPoolProviderActions,
};

const TokenPoolContext = React.createContext<TokenPoolContextType>({
  tokenAddress: undefined,
  state: InitialState,
  erc20: undefined,
  actions: {
    enableToken: () => Promise.reject(),
    juniorDeposit: () => Promise.reject(),
    seniorDeposit: () => Promise.reject(),
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

  const web3c = useWeb3Contracts();
  const erc20c = useErc20Contract(tokenAddress, COMPOUND_PROVIDER_ADDR);

  const [state, setState] = useMergeState<TokenPoolProviderState>(InitialState);

  const enableToken = React.useCallback((enable: boolean) => {
    if (enable) {
      return erc20c.actions.approveMax();
    } else {
      return erc20c.actions.approveMin();
    }
  }, [erc20c.actions.approveMax, erc20c.actions.approveMin]);

  const juniorDeposit = React.useCallback((underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number): Promise<void> => {
    return web3c.sy.buyTokens(
      underlyingAmount,
      minTokens,
      // getNonHumanValue(underlyingAmount, erc20c.state.decimals),
      // getNonHumanValue(minTokens, erc20c.state.decimals),
      deadline,
      gasPrice,
    ).then(() => {
      erc20c.actions.reloadBalance();
    });
  }, [web3c.sy.buyTokens, erc20c.state.decimals]);

  const seniorDeposit = React.useCallback((principalAmount: BigNumber, minGain: BigNumber, deadline: number, forDays: number, gasPrice: number): Promise<void> => {
    return web3c.sy.buyBond(
      principalAmount,
      minGain,
      // getNonHumanValue(principalAmount, erc20c.state.decimals),
      // getNonHumanValue(minGain, erc20c.state.decimals),
      deadline,
      forDays,
      gasPrice,
    ).then(() => {
      erc20c.actions.reloadBalance();
    });
  }, [web3c.sy.buyBond, erc20c.state.decimals]);

  const value = React.useMemo(() => ({
    tokenAddress,
    state,
    erc20: erc20c,
    actions: {
      enableToken,
      juniorDeposit,
      seniorDeposit,
    },
  }), [tokenAddress, state, erc20c, enableToken, juniorDeposit, seniorDeposit]);

  return (
    <TokenPoolContext.Provider value={value}>
      {children}
    </TokenPoolContext.Provider>
  );
};

export default TokenPoolProvider;
