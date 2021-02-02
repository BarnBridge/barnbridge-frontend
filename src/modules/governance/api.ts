import BigNumber from 'bignumber.js';
import QueryString from 'query-string';

import { getHumanValue } from 'web3/utils';
import { BONDTokenMeta } from 'web3/contracts/bond';

const GOVERNANCE_API_URL = String(process.env.REACT_APP_GOV_API_URL);

export type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
  };
};

export type APIOverviewData = {
  avgLockTimeSeconds: number;
  totalDelegatedPower: BigNumber;
  totalVbond: BigNumber;
  holders: number;
  voters: number;
  barnUsers: number;
};

export function fetchOverviewData(): Promise<APIOverviewData> {
  const url = new URL(`/api/governance/overview`, GOVERNANCE_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result.data,
      totalDelegatedPower: getHumanValue(
        new BigNumber(result.data.totalDelegatedPower),
        18,
      ),
      totalVbond: getHumanValue(new BigNumber(result.data.totalVbond), 18),
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

export function fetchVoters(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResult<APIVoterEntity>> {
  const url = new URL(
    `/api/governance/voters?page=${page}&limit=${limit}`,
    GOVERNANCE_API_URL,
  );

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result,
      data: (result.data ?? []).map((item: APIVoterEntity) => ({
        ...item,
        bondStaked: getHumanValue(
          new BigNumber(item.bondStaked),
          BONDTokenMeta.decimals,
        ),
        delegatedPower: getHumanValue(new BigNumber(item.delegatedPower), 18),
        votingPower: getHumanValue(new BigNumber(item.votingPower), 18),
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
  page: number = 1,
  limit: number = 10,
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

  const url = new URL(`/api/governance/proposals?${query}`, GOVERNANCE_API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((data: PaginatedResult<APILiteProposalEntity>) => ({
      ...data,
      data: (data.data ?? []).map(proposal => ({
        ...proposal,
        forVotes: getHumanValue(new BigNumber(proposal.forVotes), 18)!,
        againstVotes: getHumanValue(new BigNumber(proposal.againstVotes), 18)!,
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
  const url = new URL(
    `/api/governance/proposals/${proposalId}`,
    GOVERNANCE_API_URL,
  );

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
      forVotes: getHumanValue(new BigNumber(data.forVotes), 18)!,
      againstVotes: getHumanValue(new BigNumber(data.againstVotes), 18)!,
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
  page: number = 1,
  limit: number = 10,
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

  const url = new URL(
    `/api/governance/proposals/${proposalId}/votes?${query}`,
    GOVERNANCE_API_URL,
  );

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((data: PaginatedResult<APIVoteEntity>) => ({
      ...data,
      data: (data.data ?? []).map(vote => ({
        ...vote,
        power: getHumanValue(new BigNumber(vote.power), 18)!,
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

export function fetchAbrogation(
  proposalId: number,
): Promise<APIAbrogationEntity> {
  const url = new URL(
    `/api/governance/abrogation-proposals/${proposalId}`,
    GOVERNANCE_API_URL,
  );

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
      forVotes: getHumanValue(new BigNumber(data.forVotes), 18)!,
      againstVotes: getHumanValue(new BigNumber(data.againstVotes), 18)!,
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
  page: number = 1,
  limit: number = 10,
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

  const url = new URL(
    `/api/governance/abrogation-proposals/${proposalId}/votes?${query}`,
    GOVERNANCE_API_URL,
  );

  return fetch(url.toString())
    .then(result => result.json())
    .then(({ status, ...data }) => {
      if (status !== 200) {
        return Promise.reject(status);
      }

      return data;
    })
    .then((data: PaginatedResult<APIVoteEntity>) => ({
      ...data,
      data: (data.data ?? []).map(vote => ({
        ...vote,
        power: getHumanValue(new BigNumber(vote.power), 18)!,
      })),
    }));
}
