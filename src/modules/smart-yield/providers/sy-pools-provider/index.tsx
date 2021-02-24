import React from 'react';

import { mergeState } from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';
import { SYContract } from './sy/contract';

export type SYMarket = {
  name: string;
  icon: string;
};

export type SYOriginator = {
  address: string;
  name: string;
  icon: string;
  market: SYMarket;
  contract: SYContract;
};

const Originators: SYOriginator[] = require('./sy_originators.json');

const Markets: SYMarket[] = Originators.reduce((list, originator) => {
  if (!list.some(item => item.name === originator.market.name)) {
    list.push(originator.market);
  }

  return list;
}, [] as SYMarket[]);

type State = {
  loading: boolean;
  markets: SYMarket[];
  originators: SYOriginator[];
  contracts: Map<string, SYContract>;
};

const InitialState: State = {
  loading: false,
  markets: Markets,
  originators: Originators.map(originator => {
    originator.contract = new SYContract(originator.address);
    return originator;
  }),
  contracts: new Map(),
};

type ContextType = {
  state: State;
};

const Context = React.createContext<ContextType>({
  state: InitialState,
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
      originator.contract.setProvider(wallet.provider);
      originator.contract.setAccount(wallet.account);

      return [originator.address, originator.contract];
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
