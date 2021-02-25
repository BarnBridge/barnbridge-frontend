import React from 'react';

import { mergeState } from 'hooks/useMergeState';
import { PaginatedResult } from 'modules/governance/api';
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

const GOV_API_URL = process.env.REACT_APP_GOV_API_URL;

type SYPool = {
  protocolId: string;
  controllerAddress: string;
  modelAddress: string;
  providerAddress: string;
  smartYieldAddress: string;
  oracleAddress: string;
  juniorBondAddress: string;
  seniorBondAddress: string;
  cTokenAddress: string;
  underlyingAddress: string;
  underlyingSymbol: string;
  underlyingDecimals: number;
  state: {
    blockNumber: number;
    blockTimestamp: string;
    seniorLiquidity: number;
    juniorLiquidity: number;
    jTokenPrice: number;
    seniorApy: number;
    juniorApy: number;
    originatorApy: number;
    originatorNetApy: number;
    avgSeniorMaturityDays: number;
    numberOfSeniors: number;
    numberOfJuniors: number;
  };
};

type SYPoolAPY = {
  point: Date;
  seniorApy: number;
  juniorApy: number;
};

type SYUserTxHistory = {
  protocolId: string;
  pool: string;
  underlyingTokenAddress: string;
  amount: number;
  tranche: string;
  transactionType: string;
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
};

type SYSeniorRedeem = {
  seniorBondAddress: string;
  userAddress: string;
  seniorBondId: number;
  smartYieldAddress: string;
  fee: number;
  underlyingIn: number;
  gain: number;
  forDays: number;
  blockTimestamp: number;
};

type SYJuniorRedeem = {
  juniorBondAddress: string;
  userAddress: string;
  juniorBondId: number;
  smartYieldAddress: string;
  tokensIn: number;
  maturesAt: number;
  underlyingOut: number;
  blockTimestamp: number;
};

function fetchSYPools(protocolID: string = 'all'): Promise<SYPool[]> {
  const url = new URL(`/api/smartyield/pools?protocolID=${protocolID}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

function fetchSYPool(syAddr: string): Promise<SYPool> {
  const url = new URL(`/api/smartyield/pools/${syAddr}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

function fetchSYPoolAPY(syAddr: string): Promise<SYPoolAPY[]> {
  const url = new URL(`/api/smartyield/pools/${syAddr}/apy`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

export function fetchSYUserTxHistory(
  address: string,
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResult<SYUserTxHistory>> {
  const url = new URL(`/api/smartyield/users/${address}/history?page=${page}&limit=${limit}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result,
      data: (result.data ?? []).map((item: SYUserTxHistory) => ({
        ...item,
        amount: Number(item.amount),
      })),
    }));
}

export function fetchSYSeniorRedeems(
  address: string,
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResult<SYSeniorRedeem>> {
  const url = new URL(`/api/smartyield/users/${address}/redeems/senior?page=${page}&limit=${limit}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result,
      data: (result.data ?? []).map((item: SYSeniorRedeem) => ({
        ...item,
      })),
    }));
}

export function fetchSYJuniorRedeems(
  address: string,
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResult<SYJuniorRedeem>> {
  const url = new URL(`/api/smartyield/users/${address}/redeems/junior?page=${page}&limit=${limit}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result,
      data: (result.data ?? []).map((item: SYJuniorRedeem) => ({
        ...item,
      })),
    }));
}

const SYPoolsProvider: React.FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [state, setState] = React.useState<State>(InitialState);

  // React.useEffect(() => {
  //   if (!wallet.account) {
  //     return;
  //   }
  //
  //   (async () => {
  //     const pools = await fetchSYPools();
  //     console.log({ pools });
  //     const pool = await fetchSYPool(pools[0].smartYieldAddress);
  //     console.log({ pool });
  //     const apy = await fetchSYPoolAPY(pools[0].smartYieldAddress);
  //     console.log({ apy });
  //     const userTxHistory = await fetchSYUserTxHistory(wallet.account!);
  //     console.log({ userTxHistory });
  //     const juniorRedeems = await fetchSYJuniorRedeems(wallet.account!);
  //     console.log({ juniorRedeems });
  //     const seniorRedeems = await fetchSYSeniorRedeems(wallet.account!);
  //     console.log({ seniorRedeems });
  //   })();
  // }, [wallet.account]);

  React.useEffect(() => {
    setState(
      mergeState<State>({
        loading: true,
      }),
    );

    const contracts = new Map<string, SYContract>(
      state.originators.map(originator => {
        originator.contract.setProvider(wallet.provider);
        originator.contract.setAccount(wallet.account);

        return [originator.address, originator.contract];
      }),
    );

    setState(
      mergeState<State>({
        contracts,
      }),
    );

    Promise.all(Array.from(contracts.values()).map(contract => contract.init()))
      .catch(Error)
      .then(() => {
        console.log(contracts);
        setState(
          mergeState<State>({
            loading: false,
          }),
        );
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

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default SYPoolsProvider;
