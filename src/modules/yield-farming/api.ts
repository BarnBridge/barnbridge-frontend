import BigNumber from 'bignumber.js';
import QueryString from 'query-string';

const GOV_API_URL = process.env.REACT_APP_GOV_API_URL;

function queryfy(obj: Record<string, any>): string {
  return QueryString.stringify(obj, {
    skipNull: true,
    skipEmptyString: true,
    encode: true,
    arrayFormat: 'comma',
  });
}

type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
    block: number;
  };
};

export enum APIYFPoolActionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export type APIYFPoolTransaction = {
  userAddress: string;
  tokenAddress: string;
  amount: BigNumber;
  transactionHash: string;
  actionType: APIYFPoolActionType;
  blockTimestamp: number;
};

export function fetchYFPoolTransactions(
  page = 1,
  limit = 10,
  tokenAddress: string,
  userAddress: string = 'all',
  actionType: string = 'all',
): Promise<PaginatedResult<APIYFPoolTransaction>> {
  const query = queryfy({
    page: String(page),
    limit: String(limit),
    userAddress,
    actionType,
    tokenAddress,
  });

  const url = new URL(`/api/yieldfarming/staking-actions/list?${query}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then((result: PaginatedResult<APIYFPoolTransaction>) => ({
      ...result,
      data: (result.data ?? []).map((item: APIYFPoolTransaction) => ({
        ...item,
        amount: new BigNumber(item.amount),
      })),
    }));
}

export type APIYFPoolChart = {
  [tokenAddress: string]: {
    [point: number]: {
      sumDeposits: string;
      sumWithdrawals: string;
    };
  };
};

export function fetchYFPoolChart(
  tokenAddress: string[],
  start: number,
  end: number,
  scale?: string,
): Promise<APIYFPoolChart> {
  const query = queryfy({
    tokenAddress,
    start,
    end,
    scale,
  });

  const url = new URL(`/api/yieldfarming/staking-actions/chart?${query}`, GOV_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}
