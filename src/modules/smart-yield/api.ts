import BigNumber from 'bignumber.js';
import QueryString from 'query-string';

const GOV_API_URL = process.env.REACT_APP_GOV_API_URL;

function queryfy(obj: Record<string, any>): string {
  return QueryString.stringify(obj, {
    skipNull: true,
    skipEmptyString: true,
    encode: true,
  });
}

type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
    block: number;
  };
};

export type SYMarketMeta = {
  id: string;
  name: string;
  icon: string;
  active: boolean;
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
      active: true,
    },
  ],
  [
    'aave',
    {
      id: 'aave',
      name: 'Aave',
      icon: `aave_grayed`,
      active: false,
    },
  ],
  [
    'yearn-finance',
    {
      id: 'yearn-finance',
      name: 'Yearn Finance',
      icon: 'yearn_finance_grayed',
      active: false,
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
  [
    'DAI',
    {
      id: 'DAI',
      name: 'Dai',
      icon: 'dai-token',
    },
  ],
]);

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

export function fetchSYPools(protocolID = 'all'): Promise<APISYPool[]> {
  const url = new URL(`/api/smartyield/pools?protocolID=${protocolID}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

export function fetchSYPool(protocolID: string, underlyingSymbol: string): Promise<APISYPool> {
  const url = new URL(
    `/api/smartyield/pools?protocolID=${protocolID}&underlyingSymbol=${underlyingSymbol}`,
    GOV_API_URL,
  );

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data?.[0]);
}

export type APISYPoolAPY = {
  point: Date;
  seniorApy: number;
  juniorApy: number;
};

export function fetchSYPoolAPY(syAddr: string): Promise<APISYPoolAPY[]> {
  const url = new URL(`/api/smartyield/pools/${syAddr}/apy`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

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

export function fetchSYUserTxHistory(
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

  const url = new URL(`/api/smartyield/users/${address}/history?${query}`, GOV_API_URL);

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

export function fetchSYSeniorRedeems(
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

  const url = new URL(`/api/smartyield/users/${address}/redeems/senior?=${query}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then((result: PaginatedResult<APISYSeniorRedeem>) => ({
      ...result,
      data: (result.data ?? []).map((item: APISYSeniorRedeem) => ({
        ...item,
      })),
    }));
}

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

export function fetchSYJuniorPastPositions(
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

  const url = new URL(`/api/smartyield/users/${address}/junior-past-positions?${query}`, GOV_API_URL);

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

export type APISYPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
  juniorValue: number;
};

export function fetchSYPortfolioValues(address: string): Promise<APISYPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: APISYPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}

export type APISYSeniorPortfolioValue = {
  timestamp: Date;
  seniorValue: number;
};

export function fetchSYSeniorPortfolioValues(address: string): Promise<APISYSeniorPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value/senior`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: APISYSeniorPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}

export type APISYJuniorPortfolioValue = {
  timestamp: Date;
  juniorValue: number;
};

export function fetchSYJuniorPortfolioValues(address: string): Promise<APISYJuniorPortfolioValue[]> {
  const url = new URL(`/api/smartyield/users/${address}/portfolio-value/junior`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result =>
      (result.data ?? []).map((item: APISYJuniorPortfolioValue) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })),
    );
}

export type APISYRewardPool = {
  poolAddress: string;
  poolTokenAddress: string;
  poolTokenDecimals: number;
  rewardTokenAddress: string;
  protocolId: string;
  underlyingAddress: string;
  underlyingSymbol: string;
};

export function fetchSYRewardPools(
  protocolId: string = 'all',
  underlyingSymbol: string = 'all',
): Promise<APISYRewardPool[]> {
  const url = new URL(
    `/api/smartyield/rewards/pools?protocolId=${protocolId}&underlyingSymbol=${underlyingSymbol}`,
    GOV_API_URL,
  );

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

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

export function fetchSYRewardPoolTransactions(
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

  const url = new URL(`/api/smartyield/rewards/pools/${poolAddress}/transactions?${query}`, GOV_API_URL);

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
