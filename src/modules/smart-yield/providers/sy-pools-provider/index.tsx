import React from 'react';

import { mergeState } from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';
import { SYContract } from './sy/contract';

export type SYMarketType = {
  name: string;
  icon: string;
};

export type SYOriginatorType = {
  address: string;
  name: string;
  icon: string;
  market: SYMarketType;
};

const Originators: SYOriginatorType[] = require('./sy_originators.json');

const Markets: SYMarketType[] = Originators.reduce((list, originator) => {
  if (!list.some(item => item.name === originator.market.name)) {
    list.push(originator.market);
  }

  return list;
}, [] as SYMarketType[]);

type State = {
  loading: boolean;
  markets: SYMarketType[];
  originators: SYOriginatorType[];
  contracts: Map<string, SYContract>;
};

const InitialState: State = {
  loading: false,
  markets: Markets,
  originators: Originators,
  contracts: new Map(),
};

type Actions = {};

type ContextType = {
  state: State;
  actions: Actions;
};

const Context = React.createContext<ContextType>({
  state: InitialState,
  actions: {},
});

export function useSYPools(): ContextType {
  return React.useContext(Context);
}

const SYPoolsProvider: React.FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(mergeState<State>({
      loading: true,
    }));

    const contracts = new Map<string, SYContract>(state.originators.map(originator => {
      const syContract = new SYContract(originator.address);
      syContract.setProvider(wallet.provider);
      syContract.setAccount(wallet.account);

      return [originator.address, syContract];
    }));

    setState(mergeState<State>({
      contracts,
    }));

    Promise.all(
      Array.from(contracts.values())
        .map(contract => contract.init())
    )
      .catch(Error)
      .then(() => {
        console.log(contracts);
        setState(mergeState<State>({
          loading: false,
        }));
      });
  }, [state.originators]);

  React.useEffect(() => {
    state.contracts.forEach(contract => {
      contract.setProvider(wallet.provider);
    });
  }, [wallet.provider, state.contracts]);

  React.useEffect(() => {
    state.contracts.forEach(contract => {
      contract.setAccount(wallet.account);
    });
  }, [wallet.account, state.contracts]);

  const value = React.useMemo(
    () => ({
      state,
      actions: {},
    }),
    [state],
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default SYPoolsProvider;
