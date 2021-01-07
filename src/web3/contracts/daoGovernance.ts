import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import Web3Contract from 'web3/contract';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { getHumanValue } from 'web3/utils';
import { useWallet } from 'wallets/wallet';

const CONTRACT_DAO_GOVERNANCE_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase();

export enum ProposalState {
  WarmUp = 0,
  Active,
  Canceled,
  Failed,
  Accepted,
  Queued,
  Grace,
  Expired,
  Executed
}

export type ProposalMeta = {
  id: number;
  proposer: string;
  description: string;
  title: string;
  createTime: number;
  eta: number;
  forVotes: number;
  againstVotes: number;
  canceled: boolean;
  executed: boolean;
  /// ---
  forVotesBN: BigNumber;
  againstVotesBN: BigNumber;
};

export type ProposalData = {
  proposal_id: number;
  block_timestamp: number;
  title: string;
  create_time: number;
  description: string;
  proposer: string;
  targets: string[];
  signatures: string[];
  calldatas: string[];
  values: string[];
  /// -----
  state: ProposalState;
  meta: ProposalMeta;
  time_left: number;
};

export const ProposalStateName: Record<ProposalState, string> = {
  [ProposalState.WarmUp]: 'WarmUp',
  [ProposalState.Active]: 'Active',
  [ProposalState.Canceled]: 'Canceled',
  [ProposalState.Failed]: 'Failed',
  [ProposalState.Accepted]: 'Accepted',
  [ProposalState.Queued]: 'Queued',
  [ProposalState.Grace]: 'Grace',
  [ProposalState.Expired]: 'Expired',
  [ProposalState.Executed]: 'Executed',
};

export type ProposalCancellationData = {
  creator: string;
  createTime: number;
  forVotes: number;
  againstVotes: number;
};

type DAOGovernanceContractData = {
  warmUpDuration?: number;
  activeDuration?: number;
  queueDuration?: number;
  gracePeriodDuration?: number;
  acceptanceThreshold?: number;
  minQuorum?: number;
};

export type DAOGovernanceContract = DAOGovernanceContractData & {
  contract: Web3Contract;
  reload(): void;
  proposalTimeLeft(state: ProposalState, createdAt: number): number | undefined;
  proposalStateSend(proposalId: number): Promise<[ProposalState, ProposalMeta]>;
  getReceiptCall(proposalId: number): Promise<[[boolean, BigNumber, boolean]]>;
  cancellationProposalsCall(proposalId: number): Promise<[ProposalCancellationData]>
};

const InitialData: DAOGovernanceContractData = {};

export function useDAOGovernanceContract(): DAOGovernanceContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/dao_governance.json'),
      CONTRACT_DAO_GOVERNANCE_ADDR,
      'DAO Governance',
    );
  }, []);

  const [data, setData] = React.useState<DAOGovernanceContractData>(InitialData);
  const dataRef = React.useRef<DAOGovernanceContractData>(data);
  dataRef.current = data;

  useAsyncEffect(async () => {
    const [
      warmUpDuration,
      activeDuration,
      queueDuration,
      gracePeriodDuration,
      acceptanceThreshold,
      minQuorum,
    ] = await contract.batch([
      {
        method: 'warmUpDuration',
        transform: (value: string) => Number(value) * 1000,
      },
      {
        method: 'activeDuration',
        transform: (value: string) => Number(value) * 1000,
      },
      {
        method: 'queueDuration',
        transform: (value: string) => Number(value) * 1000,
      },
      {
        method: 'gracePeriodDuration',
        transform: (value: string) => Number(value) * 1000,
      },
      {
        method: 'acceptanceThreshold',
        transform: (value: string) => Number(value),
      },
      {
        method: 'minQuorum',
        transform: (value: string) => Number(value),
      },
    ]);

    setData(prevState => ({
      ...prevState,
      warmUpDuration,
      activeDuration,
      queueDuration,
      gracePeriodDuration,
      acceptanceThreshold,
      minQuorum,
    }));
  }, []);

  const proposalTimeLeft = React.useCallback((state: ProposalState, createdAt: number): number | undefined => {
    const nowUnix = Date.now().valueOf();

    const { warmUpDuration, activeDuration, queueDuration, gracePeriodDuration } = dataRef.current;

    switch (+state) {
      case ProposalState.WarmUp:
        return Math.max(createdAt + warmUpDuration! - nowUnix, 0);
      case ProposalState.Active:
        return Math.max(createdAt + warmUpDuration! + activeDuration! - nowUnix, 0);
      case ProposalState.Queued:
        return Math.max(createdAt + warmUpDuration! + activeDuration! + queueDuration! - nowUnix, 0);
      case ProposalState.Grace:
        return Math.max(createdAt + warmUpDuration! + activeDuration! + queueDuration! + gracePeriodDuration! - nowUnix, 0);
      case ProposalState.Canceled:
      case ProposalState.Failed:
      case ProposalState.Accepted:
      case ProposalState.Expired:
      case ProposalState.Executed:
        return undefined;
    }
  }, []);

  const proposalStateSend = React.useCallback((proposalId: number): Promise<any> => {
    return contract.batch([{
      method: 'state',
      methodArgs: [proposalId],
      transform: (value: string) => Number(value),
    }, {
      method: 'proposals',
      methodArgs: [proposalId],
      transform: (value: ProposalMeta) => {
        return {
          ...value,
          forVotesBN: getHumanValue(new BigNumber(value.forVotes), 18),
          againstVotesBN: getHumanValue(new BigNumber(value.againstVotes), 18),
        };
      },
    }]);
  }, [contract]);

  const getReceiptCall = React.useCallback((proposalId: number): Promise<[[boolean, BigNumber, boolean]]> => {
    return contract.batch([{
      method: 'getReceipt',
      methodArgs: [proposalId, wallet?.account],
      transform: (value: [boolean, BigNumber, boolean]) => value,
    }]) as any;
  }, [contract, wallet?.account]);

  const cancellationProposalsCall = React.useCallback((proposalId: number): Promise<[ProposalCancellationData]> => {
    return contract.batch([{
      method: 'cancellationProposals',
      methodArgs: [proposalId],
      transform: (value: ProposalCancellationData) => value,
    }]) as any;
  }, [contract]);

  return React.useMemo<DAOGovernanceContract>(() => ({
    ...data,
    contract,
    reload,
    proposalTimeLeft,
    proposalStateSend,
    getReceiptCall,
    cancellationProposalsCall,
  }), [
    data,
    contract,
    reload,
    proposalTimeLeft,
    proposalStateSend,
    getReceiptCall,
    cancellationProposalsCall,
  ]);
}
