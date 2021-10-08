import { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';

import { useConfig } from 'components/providers/configProvider';

import { InvariantContext } from 'utils/context';
import { PaginatedResult, UseFetchReturn, queryfy, useFetch } from 'utils/fetch';

export type APISYPool = {
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
  rewardPoolAddress: string;
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
    juniorLiquidityLocked: number;
  };
};

export type APISYPoolAPY = {
  point: Date;
  seniorApy: number;
  juniorApy: number;
  originatorNetApy: number;
};

export type APISYPoolLiquidity = {
  point: Date;
  seniorLiquidity: number;
  juniorLiquidity: number;
};

export type APISYPoolTransaction = {
  protocolId: string;
  pool: string;
  underlyingTokenAddress: string;
  underlyingTokenSymbol: string;
  amount: BigNumber;
  tranche: string;
  transactionType: string;
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
  accountAddress: string;
};

export type APISYSeniorBonds = {
  seniorBondId: number;
  maturityDate: number;
  redeemed: boolean;
  accountAddress: string;
  depositedAmount: BigNumber;
  redeemableAmount: BigNumber;
  underlyingTokenAddress: string;
  underlyingTokenSymbol: string;
  underlyingTokenDecimals: number;
  transactionHash: string;
  blockTimestamp: number;
};

export type APISYJuniorBonds = {
  juniorBondId: number;
  maturityDate: number;
  redeemed: boolean;
  accountAddress: string;
  depositedAmount: BigNumber;
  underlyingTokenAddress: string;
  underlyingTokenSymbol: string;
  underlyingTokenDecimals: number;
  transactionHash: string;
  blockTimestamp: number;
};

export enum APISYTxHistoryType {
  JUNIOR_DEPOSIT = 'JUNIOR_DEPOSIT',
  JUNIOR_INSTANT_WITHDRAW = 'JUNIOR_INSTANT_WITHDRAW',
  JUNIOR_REGULAR_WITHDRAW = 'JUNIOR_REGULAR_WITHDRAW',
  JUNIOR_REDEEM = 'JUNIOR_REDEEM',
  SENIOR_DEPOSIT = 'SENIOR_DEPOSIT',
  SENIOR_REDEEM = 'SENIOR_REDEEM',
  JTOKEN_SEND = 'JTOKEN_SEND',
  JTOKEN_RECEIVE = 'JTOKEN_RECEIVE',
  JBOND_SEND = 'JBOND_SEND',
  JBOND_RECEIVE = 'JBOND_RECEIVE',
  SBOND_SEND = 'SBOND_SEND',
  SBOND_RECEIVE = 'SBOND_RECEIVE',
  JUNIOR_STAKE = 'JUNIOR_STAKE',
  JUNIOR_UNSTAKE = 'JUNIOR_UNSTAKE',
}

export const HistoryShortTypes = new Map<string, string>([
  [APISYTxHistoryType.JUNIOR_DEPOSIT, 'Deposit'],
  [APISYTxHistoryType.JUNIOR_INSTANT_WITHDRAW, 'Instant Withdraw'],
  [APISYTxHistoryType.JUNIOR_REGULAR_WITHDRAW, '2 Step Withdraw'],
  [APISYTxHistoryType.JUNIOR_REDEEM, 'Redeem'],
  [APISYTxHistoryType.JTOKEN_SEND, 'Token Send'],
  [APISYTxHistoryType.JTOKEN_RECEIVE, 'Token Receive'],
  [APISYTxHistoryType.JBOND_SEND, 'Bond Send'],
  [APISYTxHistoryType.JBOND_RECEIVE, 'Bond Receive'],
  [APISYTxHistoryType.JUNIOR_STAKE, 'Stake'],
  [APISYTxHistoryType.JUNIOR_UNSTAKE, 'Unstake'],
  [APISYTxHistoryType.SENIOR_DEPOSIT, 'Deposit'],
  [APISYTxHistoryType.SENIOR_REDEEM, 'Redeem'],
  [APISYTxHistoryType.SBOND_SEND, 'Bond Send'],
  [APISYTxHistoryType.SBOND_RECEIVE, 'Bond Receive'],
]);

export const HistoryTypes = new Map<string, string>([
  [APISYTxHistoryType.JUNIOR_DEPOSIT, 'Junior Deposit'],
  [APISYTxHistoryType.JUNIOR_INSTANT_WITHDRAW, 'Junior Instant Withdraw'],
  [APISYTxHistoryType.JUNIOR_REGULAR_WITHDRAW, 'Junior 2 Step Withdraw'],
  [APISYTxHistoryType.JUNIOR_REDEEM, 'Junior Redeem'],
  [APISYTxHistoryType.JTOKEN_SEND, 'Junior Token Send'],
  [APISYTxHistoryType.JTOKEN_RECEIVE, 'Junior Token Receive'],
  [APISYTxHistoryType.JBOND_SEND, 'Junior Bond Send'],
  [APISYTxHistoryType.JBOND_RECEIVE, 'Junior Bond Receive'],
  [APISYTxHistoryType.JUNIOR_STAKE, 'Junior Stake'],
  [APISYTxHistoryType.JUNIOR_UNSTAKE, 'Junior Unstake'],
  [APISYTxHistoryType.SENIOR_DEPOSIT, 'Senior Deposit'],
  [APISYTxHistoryType.SENIOR_REDEEM, 'Senior Redeem'],
  [APISYTxHistoryType.SBOND_SEND, 'Senior Bond Send'],
  [APISYTxHistoryType.SBOND_RECEIVE, 'Senior Bond Receive'],
]);

export function isPositiveHistoryType(type: APISYTxHistoryType) {
  return [
    APISYTxHistoryType.JUNIOR_DEPOSIT,
    APISYTxHistoryType.JTOKEN_RECEIVE,
    APISYTxHistoryType.JBOND_RECEIVE,
    APISYTxHistoryType.JUNIOR_STAKE,
    APISYTxHistoryType.SENIOR_DEPOSIT,
    APISYTxHistoryType.SBOND_RECEIVE,
  ].includes(type);
}

export type APISYUserTxHistory = {
  protocolId: string;
  pool: string;
  underlyingTokenAddress: string;
  underlyingTokenSymbol: string;
  amount: number;
  tranche: string;
  transactionType: string;
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
};

export type APISYSeniorRedeem = {
  seniorBondAddress: string;
  userAddress: string;
  seniorBondId: number;
  smartYieldAddress: string;
  fee: number;
  underlyingIn: number;
  gain: number;
  forDays: number;
  blockTimestamp: number;
  transactionHash: string;
};

export enum APISYJuniorPastPositionType {
  JUNIOR_REDEEM = 'JUNIOR_REDEEM',
  JUNIOR_INSTANT_WITHDRAW = 'JUNIOR_INSTANT_WITHDRAW',
}

export const JuniorPastPositionTypes = new Map<string, string>([
  [APISYJuniorPastPositionType.JUNIOR_REDEEM, 'Redeem'],
  [APISYJuniorPastPositionType.JUNIOR_INSTANT_WITHDRAW, 'Instant Withdraw'],
]);

export type APISYJuniorPastPosition = {
  protocolId: string;
  smartYieldAddress: string;
  underlyingTokenAddress: string;
  underlyingTokenSymbol: string;
  tokensIn: BigNumber;
  underlyingOut: BigNumber;
  forfeits: BigNumber;
  transactionType: string;
  blockTimestamp: number;
  transactionHash: string;
};

export type APISYPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
  juniorValue: number;
};

export type APISYSeniorPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
};

export type APISYJuniorPortfolioValue = {
  timestamp: Date;
  juniorValue: number;
};

export type APISYRewardPool = {
  poolAddress: string;
  poolTokenAddress: string;
  poolTokenDecimals: number;
  poolType: string; // SINGLE | MULTI
  protocolId: string;
  rewardTokens: {
    address: string;
    symbol: string;
    decimals: number;
  }[];
  underlyingAddress: string;
  underlyingSymbol: string;
  poolControllerAddress: string;
};

export enum APISYRewardTxHistoryType {
  JUNIOR_STAKE = 'JUNIOR_STAKE',
  JUNIOR_UNSTAKE = 'JUNIOR_UNSTAKE',
}

export const RewardHistoryShortTypes = new Map<string, string>([
  [APISYRewardTxHistoryType.JUNIOR_STAKE, 'Stake'],
  [APISYRewardTxHistoryType.JUNIOR_UNSTAKE, 'Unstake'],
]);

export type APISYRewardPoolTransaction = {
  userAddress: string;
  transactionType: string;
  amount: BigNumber;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
};

export type SyAPIType = {
  fetchSYPools(originator?: string): Promise<APISYPool[]>;
  fetchSYPool(originator: string, underlyingSymbol: string): Promise<APISYPool>;
  fetchSYPoolAPY(syAddress: string, windowFilter?: string): Promise<APISYPoolAPY[]>;
  fetchSYPoolLiquidity(syAddress: string, windowFilter?: string): Promise<APISYPoolLiquidity[]>;
  fetchSYPoolTransactions(
    poolAddress: string,
    page: number,
    limit: number,
    transactionType?: string,
  ): Promise<PaginatedResult<APISYPoolTransaction>>;
  fetchSYSeniorBonds(
    poolAddress: string,
    page: number,
    limit: number,
    redeemed?: string,
    sortBy?: string,
    sortDir?: string,
  ): Promise<PaginatedResult<APISYSeniorBonds>>;
  fetchSYJuniorBonds(
    poolAddress: string,
    page: number,
    limit: number,
    redeemed?: string,
    sortBy?: string,
    sortDir?: string,
  ): Promise<PaginatedResult<APISYJuniorBonds>>;
  fetchSYUserTxHistory(
    address: string,
    page: number,
    limit: number,
    originator?: string,
    token?: string,
    transactionType?: string,
  ): Promise<PaginatedResult<APISYUserTxHistory>>;
  fetchSYSeniorRedeems(
    address: string,
    page: number,
    limit: number,
    originator?: string,
    token?: string,
  ): Promise<PaginatedResult<APISYSeniorRedeem>>;
  fetchSYJuniorPastPositions(
    address: string,
    page: number,
    limit: number,
    originator?: string,
    token?: string,
    transactionType?: string,
  ): Promise<PaginatedResult<APISYJuniorPastPosition>>;
  fetchSYPortfolioValues(address: string): Promise<APISYPortfolioValue[]>;
  fetchSYSeniorPortfolioValues(address: string): Promise<APISYSeniorPortfolioValue[]>;
  fetchSYJuniorPortfolioValues(address: string): Promise<APISYJuniorPortfolioValue[]>;
  fetchSYRewardPools(originator?: string, underlyingSymbol?: string): Promise<APISYRewardPool[]>;
  fetchSYRewardPoolTransactions(
    poolAddress: string,
    page: number,
    limit: number,
    userAddress?: string,
    transactionType?: string,
  ): Promise<PaginatedResult<APISYRewardPoolTransaction>>;
};

const Context = createContext<SyAPIType>(InvariantContext('SyAPIProvider'));

export function useSyAPI(): SyAPIType {
  return useContext(Context);
}

const SyAPIProvider: FC = props => {
  const config = useConfig();

  function fetchSYPools(originator = 'all'): Promise<APISYPool[]> {
    const url = new URL(`/api/smartyield/pools?originator=${originator}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result => result.data);
  }

  function fetchSYPool(originator: string, underlyingSymbol: string): Promise<APISYPool> {
    const url = new URL(
      `/api/smartyield/pools?originator=${originator}&underlyingSymbol=${underlyingSymbol}`,
      config.api.baseUrl,
    );

    return fetch(url.toString())
      .then(result => result.json())
      .then(result => result.data?.[0]);
  }

  function fetchSYPoolAPY(syAddress: string, windowFilter: string = '24h'): Promise<APISYPoolAPY[]> {
    const query = queryfy({
      window: windowFilter,
    });

    const url = new URL(`/api/smartyield/pools/${syAddress}/apy?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result => result.data);
  }

  function fetchSYPoolLiquidity(syAddress: string, windowFilter: string = '24h'): Promise<APISYPoolLiquidity[]> {
    const query = queryfy({
      window: windowFilter,
    });

    const url = new URL(`/api/smartyield/pools/${syAddress}/liquidity?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result => result.data);
  }

  function fetchSYPoolTransactions(
    poolAddress: string,
    page = 1,
    limit = 10,
    transactionType: string = 'all',
  ): Promise<PaginatedResult<APISYPoolTransaction>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      transactionType,
    });

    const url = new URL(`/api/smartyield/pools/${poolAddress}/transactions?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYPoolTransaction>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYPoolTransaction) => ({
          ...item,
          amount: new BigNumber(item.amount),
        })),
      }));
  }

  function fetchSYSeniorBonds(
    poolAddress: string,
    page = 1,
    limit = 10,
    redeemed?: string,
    sortBy?: string,
    sortDir?: string,
  ): Promise<PaginatedResult<APISYSeniorBonds>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      redeemed,
      sort: sortBy,
      sortDirection: sortDir,
    });

    const url = new URL(`/api/smartyield/pools/${poolAddress}/senior-bonds?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYSeniorBonds>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYSeniorBonds) => ({
          ...item,
          depositedAmount: new BigNumber(item.depositedAmount),
          redeemableAmount: new BigNumber(item.redeemableAmount),
        })),
      }));
  }

  function fetchSYJuniorBonds(
    poolAddress: string,
    page = 1,
    limit = 10,
    redeemed?: string,
    sortBy?: string,
    sortDir?: string,
  ): Promise<PaginatedResult<APISYJuniorBonds>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      redeemed,
      sort: sortBy,
      sortDirection: sortDir,
    });

    const url = new URL(`/api/smartyield/pools/${poolAddress}/junior-bonds?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYJuniorBonds>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYJuniorBonds) => ({
          ...item,
          depositedAmount: new BigNumber(item.depositedAmount),
        })),
      }));
  }

  function fetchSYUserTxHistory(
    address: string,
    page = 1,
    limit = 10,
    originator = 'all',
    token = 'all',
    transactionType = 'all',
  ): Promise<PaginatedResult<APISYUserTxHistory>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      originator,
      token,
      transactionType,
    });

    const url = new URL(`/api/smartyield/users/${address}/history?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYUserTxHistory>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYUserTxHistory) => ({
          ...item,
          amount: Number(item.amount),
        })),
      }));
  }

  function fetchSYSeniorRedeems(
    address: string,
    page = 1,
    limit = 10,
    originator = 'all',
    token = 'all',
  ): Promise<PaginatedResult<APISYSeniorRedeem>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      originator,
      token,
    });

    const url = new URL(`/api/smartyield/users/${address}/redeems/senior?=${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYSeniorRedeem>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYSeniorRedeem) => ({
          ...item,
        })),
      }));
  }

  function fetchSYJuniorPastPositions(
    address: string,
    page = 1,
    limit = 10,
    originator = 'all',
    token = 'all',
    transactionType = 'all',
  ): Promise<PaginatedResult<APISYJuniorPastPosition>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      originator,
      token,
      transactionType,
    });

    const url = new URL(`/api/smartyield/users/${address}/junior-past-positions?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYJuniorPastPosition>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYJuniorPastPosition) => ({
          ...item,
          tokensIn: new BigNumber(item.tokensIn),
          underlyingOut: new BigNumber(item.underlyingOut),
          forfeits: new BigNumber(item.forfeits),
        })),
      }));
  }

  function fetchSYPortfolioValues(address: string): Promise<APISYPortfolioValue[]> {
    const url = new URL(`/api/smartyield/users/${address}/portfolio-value`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result =>
        (result.data ?? []).map((item: APISYPortfolioValue) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      );
  }

  function fetchSYSeniorPortfolioValues(address: string): Promise<APISYSeniorPortfolioValue[]> {
    const url = new URL(`/api/smartyield/users/${address}/portfolio-value/senior`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result =>
        (result.data ?? []).map((item: APISYSeniorPortfolioValue) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      );
  }

  function fetchSYJuniorPortfolioValues(address: string): Promise<APISYJuniorPortfolioValue[]> {
    const url = new URL(`/api/smartyield/users/${address}/portfolio-value/junior`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then(result =>
        (result.data ?? []).map((item: APISYJuniorPortfolioValue) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      );
  }

  function fetchSYRewardPools(
    originator: string = 'all',
    underlyingSymbol: string = 'all',
  ): Promise<APISYRewardPool[]> {
    const url = new URL(
      `/api/smartyield/rewards/v2/pools?originator=${originator}&underlyingSymbol=${underlyingSymbol}`,
      config.api.baseUrl,
    );

    return fetch(url.toString())
      .then(result => result.json())
      .then(result => result.data);
  }

  function fetchSYRewardPoolTransactions(
    poolAddress: string,
    page = 1,
    limit = 10,
    userAddress: string = 'all',
    transactionType: string = 'all',
  ): Promise<PaginatedResult<APISYRewardPoolTransaction>> {
    const query = queryfy({
      page: String(page),
      limit: String(limit),
      userAddress,
      transactionType,
    });

    const url = new URL(`/api/smartyield/rewards/v2/pools/${poolAddress}/transactions?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(result => result.json())
      .then((result: PaginatedResult<APISYRewardPoolTransaction>) => ({
        ...result,
        data: (result.data ?? []).map((item: APISYRewardPoolTransaction) => ({
          ...item,
          amount: new BigNumber(item.amount),
        })),
      }));
  }

  const value = {
    fetchSYPools,
    fetchSYPool,
    fetchSYPoolAPY,
    fetchSYPoolLiquidity,
    fetchSYPoolTransactions,
    fetchSYSeniorBonds,
    fetchSYJuniorBonds,
    fetchSYUserTxHistory,
    fetchSYSeniorRedeems,
    fetchSYJuniorPastPositions,
    fetchSYPortfolioValues,
    fetchSYSeniorPortfolioValues,
    fetchSYJuniorPortfolioValues,
    fetchSYRewardPools,
    fetchSYRewardPoolTransactions,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default SyAPIProvider;

export function useFetchSyPools({
  originator,
  baseUrl,
}: {
  originator?: string;
  baseUrl?: string;
} = {}): UseFetchReturn<APISYPool[]> {
  const config = useConfig();
  const url = new URL('/api/smartyield/pools', baseUrl ?? config.api.baseUrl);

  if (originator) {
    url.searchParams.set('originator', originator);
  }

  return useFetch(url, {
    transform: ({ data }) => data,
  });
}
