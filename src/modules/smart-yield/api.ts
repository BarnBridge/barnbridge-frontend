import BigNumber from 'bignumber.js';
import QueryString from 'query-string';

const GOV_API_URL = process.env.REACT_APP_GOV_API_URL;

type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
  };
};

export type SYMarketMeta = {
  id: string;
  name: string;
  icon: string;
};

export type SYPoolMeta = {
  id: string;
  name: string;
  icon: string;
};

export const Markets = new Map<string, SYMarketMeta>([
  [
    'compound/v2',
    {
      id: 'compound/v2',
      name: 'Compound',
      icon: 'compound',
    },
  ],
]);

export const Pools = new Map<string, SYPoolMeta>([
  [
    'USDC',
    {
      id: 'USDC',
      name: 'USD Coin',
      icon: 'usdc-token',
    },
  ],
]);

export type SYPool = {
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

export function fetchSYPools(protocolID: string = 'all'): Promise<SYPool[]> {
  const url = new URL(`/api/smartyield/pools?protocolID=${protocolID}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

export function fetchSYPool(syAddr: string): Promise<SYPool> {
  const url = new URL(`/api/smartyield/pools/${syAddr}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

export type SYPoolAPY = {
  point: Date;
  seniorApy: number;
  juniorApy: number;
};

export function fetchSYPoolAPY(syAddr: string): Promise<SYPoolAPY[]> {
  const url = new URL(`/api/smartyield/pools/${syAddr}/apy`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

export enum SYTxHistoryType {
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
}

export const HistoryTypes = new Map<string, string>([
  [SYTxHistoryType.JUNIOR_DEPOSIT, 'Deposit'],
  [SYTxHistoryType.JUNIOR_INSTANT_WITHDRAW, 'Instant Withdraw'],
  [SYTxHistoryType.JUNIOR_REGULAR_WITHDRAW, '2 Step Withdraw'],
  [SYTxHistoryType.JUNIOR_REDEEM, 'Redeem'],
  [SYTxHistoryType.SENIOR_DEPOSIT, 'Deposit'],
  [SYTxHistoryType.SENIOR_REDEEM, 'Redeem'],
  [SYTxHistoryType.JTOKEN_SEND, 'Send'],
  [SYTxHistoryType.JTOKEN_RECEIVE, 'Receive'],
  [SYTxHistoryType.JBOND_SEND, 'Send'],
  [SYTxHistoryType.JBOND_RECEIVE, 'Receive'],
  [SYTxHistoryType.SBOND_SEND, 'Send'],
  [SYTxHistoryType.SBOND_RECEIVE, 'Receive'],
]);

export type SYUserTxHistory = {
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

export function fetchSYUserTxHistory(
  address: string,
  page: number = 1,
  limit: number = 10,
  originator: string = 'all',
  token: string = 'all',
  transactionType: string = 'all',
): Promise<PaginatedResult<SYUserTxHistory>> {
  const query = QueryString.stringify(
    {
      page: String(page),
      limit: String(limit),
      originator,
      token,
      transactionType,
    },
    {
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    },
  );

  const url = new URL(`/api/smartyield/users/${address}/history?${query}`, GOV_API_URL);

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

export type SYSeniorRedeem = {
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

export type SYJuniorRedeem = {
  juniorBondAddress: string;
  userAddress: string;
  juniorBondId: number;
  smartYieldAddress: string;
  tokensIn: BigNumber;
  maturesAt: number;
  underlyingOut: BigNumber;
  blockTimestamp: number;
};

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
        tokensIn: new BigNumber(item.tokensIn),
        underlyingOut: new BigNumber(item.underlyingOut),
        maturesAt: Number(item.maturesAt),
        blockTimestamp: Number(item.blockTimestamp),
      })),
    }));
}

export type SYPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
  juniorValue: number;
};

export function fetchSYPortfolioValues(address: string): Promise<SYPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: SYPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}

export type SYSeniorPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
};

export function fetchSYSeniorPortfolioValues(address: string): Promise<SYSeniorPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value/senior`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: SYSeniorPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}

export type SYJuniorPortfolioValue = {
  timestamp: Date;
  juniorValue: number;
};

export function fetchSYJuniorPortfolioValues(address: string): Promise<SYJuniorPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value/junior`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: SYJuniorPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}
