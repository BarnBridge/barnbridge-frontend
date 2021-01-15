import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import { Web3EventType } from 'web3/types';
import Web3Contract from 'web3/contract';
import { getGasValue, getHumanValue } from 'web3/utils';

const CONTRACT_DAO_GOVERNANCE_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase();

const Contract = new Web3Contract(
  require('web3/abi/dao_governance.json'),
  CONTRACT_DAO_GOVERNANCE_ADDR,
  'DAO Governance',
);

export type CommonDataType = {
  isActive?: boolean;
  warmUpDuration?: number;
  activeDuration?: number;
  queueDuration?: number;
  gracePeriodDuration?: number;
  acceptanceThreshold?: number;
  minQuorum?: number;
};

function loadCommonData(): Promise<CommonDataType> {
  return Contract.batch([
    {
      method: 'isActive',
    },
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
  ]).then(([isActive, warmUpDuration, activeDuration, queueDuration, gracePeriodDuration, acceptanceThreshold, minQuorum]) => ({
    isActive,
    warmUpDuration,
    activeDuration,
    queueDuration,
    gracePeriodDuration,
    acceptanceThreshold,
    minQuorum,
  }));
}

export type CreateProposalPayload = {
  title: string;
  description: string;
  targets: string[];
  signatures: string[];
  calldatas: string[];
  values: string[];
};

export type CreateProposalSendResult = {
  proposalId: string;
  caller: string;
};

function activateSend(from: string): Promise<void> {
  return Contract.send('activate', [], {
    from,
  });
}

function createProposalSend(from: string, payload: CreateProposalPayload): Promise<Web3EventType<CreateProposalSendResult>> {
  return Contract.send('propose', [
    payload.targets,
    payload.values,
    payload.signatures,
    payload.calldatas,
    payload.description,
    payload.title,
  ], {
    from,
  }).then((tx: any) => (tx.events as Record<string, any>).ProposalCreated);
}

export type CancelProposalSendResult = {
  proposalId: string;
  caller: string;
};

function cancelProposalSend(from: string, proposalId: number): Promise<Web3EventType<CancelProposalSendResult>> {
  return Contract.send('cancelProposal', [
    proposalId,
  ], {
    from,
  }).then((tx: any) => (tx.events as Record<string, any>).ProposalCanceled);
}

export type StartCancellationProposalSendResult = {
  proposalId: string;
  caller: string;
};

function startCancellationProposalSend(from: string, proposalId: number): Promise<Web3EventType<StartCancellationProposalSendResult>> {
  return Contract.send('startCancellationProposal', [
    proposalId,
  ], {
    from,
  }).then((tx: any) => (tx.events as Record<string, any>).CancellationProposalStarted);
}

function queueForExecutionSend(from: string, proposalId: number): Promise<any> {
  return Contract.send('queue', [
    proposalId,
  ], {
    from,
  });
}

function executeProposalSend(from: string, proposalId: number): Promise<any> {
  return Contract.send('execute', [
    proposalId,
  ], {
    from,
  });
}

function castVoteSend(from: string, gasPrice: number, proposalId: number, support: boolean): Promise<Web3EventType<any>> {
  return Contract.send('castVote', [
    proposalId,
    support,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function cancelVoteSend(from: string, gasPrice: number, proposalId: number): Promise<Web3EventType<any>> {
  return Contract.send('cancelVote', [
    proposalId,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

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

function stateCall(proposalId: number): Promise<ProposalState> {
  return Contract.call('state', [proposalId])
    .then(Number);
}

export type ProposalDataType = {
  id: number;
  proposer: string;
  title: string;
  description: string;
  createTime: number;
  eta: number;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  canceled: boolean;
  executed: boolean;
};

function proposalsCall(proposalId: number): Promise<ProposalDataType> {
  return Contract.call('proposals', [proposalId])
    .then((data: ProposalDataType) => {
      return {
        ...data,
        createTime: data.createTime * 1000,
        forVotes: getHumanValue(new BigNumber(data.forVotes), 18)!,
        againstVotes: getHumanValue(new BigNumber(data.againstVotes), 18)!,
      };
    });
}

export type CancellationProposalsCallResult = {
  creator: string;
  createTime: number;
  forVotes: number;
  againstVotes: number;
};

function cancellationProposalsCall(proposalId: number): Promise<CancellationProposalsCallResult> {
  return Contract.call('cancellationProposals', [proposalId]);
}

export type GetReceiptCallResult = {
  hasVoted: boolean;
  votes: number;
  support: boolean;
};

function getReceiptCall(proposalId: number, voterAddress: string): Promise<GetReceiptCallResult> {
  return Contract
    .call('getReceipt', [proposalId, voterAddress])
    .then(data => ({
      hasVoted: data?.hasVoted ?? false,
      votes: Number(data?.votes ?? 0),
      support: data?.support ?? false,
    }));
}

function proposalTimeLeft(data: CommonDataType, state: ProposalState, createdAt: number): number | undefined {
  const nowUnix = Date.now().valueOf();

  const { warmUpDuration, activeDuration, queueDuration, gracePeriodDuration } = data;

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
}

export async function validateFunctionCall(contract: Web3Contract, functionName: string, params: any[]): Promise<void> {
  try {
    await contract.call(functionName, params, {
      from: CONTRACT_DAO_GOVERNANCE_ADDR,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

type DAOGovernanceContractData = CommonDataType & {};

export type DAOGovernanceContract = DAOGovernanceContractData & {
  contract: Web3Contract;
  reload(): void;
  actions: {
    activate(): Promise<any>;
    createProposal(payload: CreateProposalPayload): Promise<Web3EventType<CreateProposalSendResult>>;
    cancelProposal(proposalId: number): Promise<Web3EventType<CancelProposalSendResult>>;
    startCancellationProposal(proposalId: number): Promise<Web3EventType<StartCancellationProposalSendResult>>;
    queueForExecution(proposalId: number): Promise<any>;
    executeProposal(proposalId: number): Promise<any>;
    getProposalState(proposalId: number): Promise<number>;
    getProposalData(proposalId: number): Promise<ProposalDataType>;
    cancellationProposals(proposalId: number): Promise<CancellationProposalsCallResult>;
    getReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult>;
    proposalTimeLeft(state: ProposalState, createdAt: number): number | undefined;
    castVote(gasPrice: number, proposalId: number, support: boolean): Promise<any>;
    cancelVote(gasPrice: number, proposalId: number): Promise<any>;
  };
};

export function useDAOGovernanceContract(): DAOGovernanceContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<DAOGovernanceContractData>({});

  useAsyncEffect(async () => {
    const data = await loadCommonData();

    setData(prevState => ({
      ...prevState,
      ...data,
    }));
  }, []);

  return {
    ...data,
    contract: Contract,
    reload,
    actions: {
      activate(): Promise<any> {
        return wallet.account ? activateSend(wallet.account) : Promise.reject();
      },
      createProposal(payload: CreateProposalPayload): Promise<Web3EventType<CreateProposalSendResult>> {
        return wallet.account ? createProposalSend(wallet.account, payload) : Promise.reject();
      },
      cancelProposal(proposalId: number): Promise<Web3EventType<CancelProposalSendResult>> {
        return wallet.account ? cancelProposalSend(wallet.account, proposalId) : Promise.reject();
      },
      startCancellationProposal(proposalId: number): Promise<Web3EventType<CancelProposalSendResult>> {
        return wallet.account ? startCancellationProposalSend(wallet.account, proposalId) : Promise.reject();
      },
      queueForExecution(proposalId: number): Promise<any> {
        return wallet.account ? queueForExecutionSend(wallet.account, proposalId) : Promise.reject();
      },
      executeProposal(proposalId: number): Promise<any> {
        return wallet.account ? executeProposalSend(wallet.account, proposalId) : Promise.reject();
      },
      castVote(gasPrice: number, proposalId: number, support: boolean): Promise<Web3EventType<any>> {
        return wallet.account ? castVoteSend(wallet.account, gasPrice, proposalId, support) : Promise.reject();
      },
      cancelVote(gasPrice: number, proposalId: number): Promise<Web3EventType<any>> {
        return wallet.account ? cancelVoteSend(wallet.account, gasPrice, proposalId) : Promise.reject();
      },
      getProposalState: stateCall,
      getProposalData: proposalsCall,
      cancellationProposals: cancellationProposalsCall,
      getReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult> {
        const address = voterAddress ?? wallet?.account;
        return address ? getReceiptCall(proposalId, address) : Promise.reject();
      },
      proposalTimeLeft(state: ProposalState, createdAt: number): number | undefined {
        return proposalTimeLeft(data, state, createdAt);
      },
    },
  };
}
