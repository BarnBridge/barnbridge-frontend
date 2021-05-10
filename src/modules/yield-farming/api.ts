import BigNumber from 'bignumber.js';

import config from 'config';

import { PaginatedResult, queryfy } from 'utils/fetch';

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

  const url = new URL(`/api/yieldfarming/staking-actions/list?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => {
      if (result.status !== 200) {
        return Promise.reject(new Error(result.data));
      }

      return result;
    })
    .then((result: PaginatedResult<APIYFPoolTransaction>) => {
      return {
        ...result,
        data: (result.data ?? []).map((item: APIYFPoolTransaction) => ({
          ...item,
          amount: new BigNumber(item.amount),
        })),
      };
    });
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

  const url = new URL(`/api/yieldfarming/staking-actions/chart?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => {
      if (result.status !== 200) {
        return Promise.reject(new Error(result.data));
      }

      return result.data;
    });
}
