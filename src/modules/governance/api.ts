import BigNumber from 'bignumber.js';
import QueryString from 'query-string';
import { getHumanValue } from 'web3/utils';

import { config } from 'config';

import { PaginatedResult } from 'utils/fetch';

export type APIOverviewData = {
  avgLockTimeSeconds: number;
  totalDelegatedPower: BigNumber;
  totalVbond: BigNumber;
  holders: number;
  holdersStakingExcluded: number;
  voters: number;
  barnUsers: number;
};

export function fetchOverviewData(): Promise<APIOverviewData> {
  const url = new URL(`/api/governance/overview`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result.data,
      totalDelegatedPower: getHumanValue(BigNumber.from(result.data.totalDelegatedPower), 18),
      totalVbond: getHumanValue(BigNumber.from(result.data.totalVbond), 18),
    }));
}

export type APIVoterEntity = {
  address: string;
  bondStaked: BigNumber;
  lockedUntil: number;
  delegatedPower: BigNumber;
  votes: number;
  proposals: number;
  votingPower: BigNumber;
  hasActiveDelegation: boolean;
};

export function fetchVoters(page = 1, limit = 10): Promise<PaginatedResult<APIVoterEntity>> {
  const url = new URL(`/api/governance/voters?page=${page}&limit=${limit}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then((result: PaginatedResult<APIVoterEntity>) => ({
      ...result,
      data: (result.data ?? []).map((item: APIVoterEntity) => ({
        ...item,
        bondStaked: getHumanValue(BigNumber.from(item.bondStaked), 18), // bond decimals
        delegatedPower: getHumanValue(BigNumber.from(item.delegatedPower), 18)!,
        votingPower: getHumanValue(BigNumber.from(item.votingPower), 18)!,
      })),
    }));
}

export enum APIProposalState {
  CREATED = 'CREATED',
  WARMUP = 'WARMUP',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  ACCEPTED = 'ACCEPTED',
  QUEUED = 'QUEUED',
  GRACE = 'GRACE',
  EXPIRED = 'EXPIRED',
  EXECUTED = 'EXECUTED',
  ABROGATED = 'ABROGATED',
}

export enum APIProposalStateId {
  WARMUP = 0,
  ACTIVE,
  CANCELED,
  FAILED,
  ACCEPTED,
  QUEUED,
  GRACE,
  EXPIRED,
  EXECUTED,
  ABROGATED,
}

export const APIProposalStateMap = new Map<APIProposalState, string>([
  [APIProposalState.CREATED, 'Created'],
  [APIProposalState.WARMUP, 'Warm-Up'],
  [APIProposalState.ACTIVE, 'Voting'],
  [APIProposalState.CANCELED, 'Canceled'],
  [APIProposalState.FAILED, 'Failed'],
  [APIProposalState.ACCEPTED, 'Accepted'],
  [APIProposalState.QUEUED, 'Queued for execution'],
  [APIProposalState.GRACE, 'Pending execution'],
  [APIProposalState.EXPIRED, 'Expired'],
  [APIProposalState.EXECUTED, 'Executed'],
  [APIProposalState.ABROGATED, 'Abrogated'],
]);

export type APILiteProposalEntity = {
  proposalId: number;
  proposer: string;
  title: string;
  description: string;
  createTime: number;
  state: APIProposalState;
  stateTimeLeft: number | null;
  forVotes: BigNumber;
  againstVotes: BigNumber;
};

export function fetchProposals(
  page = 1,
  limit = 10,
  state?: string,
  search?: string,
): Promise<PaginatedResult<APILiteProposalEntity>> {
  const query = QueryString.stringify(
    {
      page: String(page),
      limit: String(limit),
      state,
      title: search,
    },
    {
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    },
  );

  const url = new URL(`/api/governance/proposals?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((result: PaginatedResult<APILiteProposalEntity>) => ({
      ...result,
      data: (result.data ?? []).map(proposal => ({
        ...proposal,
        forVotes: getHumanValue(BigNumber.from(proposal.forVotes), 18)!,
        againstVotes: getHumanValue(BigNumber.from(proposal.againstVotes), 18)!,
      })),
    }));
}

export type APIProposalHistoryEntity = {
  name: string;
  startTimestamp: number;
  endTimestamp: number;
  txHash: string;
};

export type APIProposalEntity = APILiteProposalEntity & {
  blockTimestamp: number;
  warmUpDuration: number;
  activeDuration: number;
  queueDuration: number;
  gracePeriodDuration: number;
  minQuorum: number;
  acceptanceThreshold: number;
  targets: string[];
  values: string[];
  signatures: string[];
  calldatas: string[];
  history: APIProposalHistoryEntity[];
};

export function fetchProposal(proposalId: number): Promise<APIProposalEntity> {
  const url = new URL(`/api/governance/proposals/${proposalId}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ data, status }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((data: APIProposalEntity) => ({
      ...data,
      forVotes: getHumanValue(BigNumber.from(data.forVotes), 18)!,
      againstVotes: getHumanValue(BigNumber.from(data.againstVotes), 18)!,
    }));
}

export type APIVoteEntity = {
  address: string;
  power: BigNumber;
  support: boolean;
  blockTimestamp: number;
};

export function fetchProposalVoters(
  proposalId: number,
  page = 1,
  limit = 10,
  support?: boolean,
): Promise<PaginatedResult<APIVoteEntity>> {
  const query = QueryString.stringify(
    {
      page: String(page),
      limit: String(limit),
      support,
    },
    {
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    },
  );

  const url = new URL(`/api/governance/proposals/${proposalId}/votes?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((result: PaginatedResult<APIVoteEntity>) => ({
      ...result,
      data: (result.data ?? []).map(vote => ({
        ...vote,
        power: getHumanValue(BigNumber.from(vote.power), 18)!,
      })),
    }));
}

export type APIAbrogationEntity = {
  proposalId: number;
  caller: string;
  createTime: number;
  description: string;
  forVotes: BigNumber;
  againstVotes: BigNumber;
};

export function fetchAbrogation(proposalId: number): Promise<APIAbrogationEntity> {
  const url = new URL(`/api/governance/abrogation-proposals/${proposalId}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ data, status }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((data: APIAbrogationEntity) => ({
      ...data,
      forVotes: getHumanValue(BigNumber.from(data.forVotes), 18)!,
      againstVotes: getHumanValue(BigNumber.from(data.againstVotes), 18)!,
    }));
}

export type APIAbrogationVoteEntity = {
  address: string;
  power: BigNumber;
  support: boolean;
  blockTimestamp: number;
};

export function fetchAbrogationVoters(
  proposalId: number,
  page = 1,
  limit = 10,
  support?: boolean,
): Promise<PaginatedResult<APIAbrogationVoteEntity>> {
  const query = QueryString.stringify(
    {
      page: String(page),
      limit: String(limit),
      support,
    },
    {
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    },
  );

  const url = new URL(`/api/governance/abrogation-proposals/${proposalId}/votes?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((result: PaginatedResult<APIVoteEntity>) => ({
      ...result,
      data: (result.data ?? []).map(vote => ({
        ...vote,
        power: getHumanValue(BigNumber.from(vote.power), 18)!,
      })),
    }));
}

export type APITreasuryToken = {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
};

export function fetchTreasuryTokens(): Promise<APITreasuryToken[]> {
  const url = new URL(`/api/governance/treasury/tokens?address=${config.contracts.dao.governance}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    });
}

export type APITreasuryHistory = {
  accountAddress: string;
  accountLabel: string;
  counterpartyAddress: string;
  counterpartyLabel: string;
  amount: number;
  transactionDirection: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
};

export function fetchTreasuryHistory(
  page = 1,
  limit = 10,
  tokenFilter: string,
  directionFilter: string,
): Promise<PaginatedResult<APITreasuryHistory>> {
  const query = QueryString.stringify(
    {
      address: config.contracts.dao.governance,
      page: String(page),
      limit: String(limit),
      tokenAddress: tokenFilter,
      transactionDirection: directionFilter,
    },
    {
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    },
  );

  const url = new URL(`/api/governance/treasury/transactions?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((result: PaginatedResult<APITreasuryHistory>) => ({
      ...result,
      data: (result.data ?? []).map(item => ({
        ...item,
        amount: Number(item.amount),
      })),
    }));
}
