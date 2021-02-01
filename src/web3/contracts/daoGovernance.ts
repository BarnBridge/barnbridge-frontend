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

export type StartAbrogationProposalSendResult = {
  proposalId: string;
  caller: string;
};

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

function startAbrogationProposalSend(from: string, gasPrice: number, proposalId: number, description: string): Promise<Web3EventType<StartAbrogationProposalSendResult>> {
  return Contract.send('startAbrogationProposal', [
    proposalId,
    description,
  ], {
    from,
  }).then((tx: any) => (tx.events as Record<string, any>).AbrogationProposalStarted);
}

function abrogationCastVoteSend(from: string, gasPrice: number, proposalId: number, support: boolean): Promise<Web3EventType<any>> {
  return Contract.send('abrogationProposal_castVote', [
    proposalId,
    support,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function abrogationCancelVoteSend(from: string, gasPrice: number, proposalId: number): Promise<Web3EventType<any>> {
  return Contract.send('abrogationProposal_cancelVote', [
    proposalId,
  ], {
    gasPrice: getGasValue(gasPrice),
    from,
  });
}

function getAbrogationReceiptCall(proposalId: number, voterAddress: string): Promise<GetReceiptCallResult> {
  return Contract
    .call('getAbrogationProposalReceipt', [proposalId, voterAddress])
    .then(data => ({
      hasVoted: data?.hasVoted ?? false,
      votes: Number(data?.votes ?? 0),
      support: data?.support ?? false,
    }));
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

export type AbrogationProposalsCallResult = {
  creator: string;
  createTime: number;
  forVotes: number;
  againstVotes: number;
};

function abrogationProposalsCall(proposalId: number): Promise<AbrogationProposalsCallResult> {
  return Contract.call('abrogationProposals', [proposalId]);
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

function latestProposalIdsCall(address: string): Promise<number> {
  return Contract.call('latestProposalIds', [address])
    .then(Number);
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
    queueForExecution(proposalId: number): Promise<any>;
    executeProposal(proposalId: number): Promise<any>;
    getProposalState(proposalId: number): Promise<number>;
    getProposalData(proposalId: number): Promise<ProposalDataType>;
    abrogationProposals(proposalId: number): Promise<AbrogationProposalsCallResult>;
    getReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult>;
    latestProposalIds(address?: string): Promise<number>;
    proposalTimeLeft(state: ProposalState, createdAt: number): number | undefined;
    castVote(gasPrice: number, proposalId: number, support: boolean): Promise<any>;
    cancelVote(gasPrice: number, proposalId: number): Promise<any>;
    startAbrogationProposal(gasPrice: number, proposalId: number, description: string): Promise<Web3EventType<StartAbrogationProposalSendResult>>;
    abrogationCastVote(gasPrice: number, proposalId: number, support: boolean): Promise<any>;
    abrogationCancelVote(gasPrice: number, proposalId: number): Promise<any>;
    getAbrogationReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult>;
  };
};

export function useDAOGovernanceContract(): DAOGovernanceContract {
  const [reload, version] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<DAOGovernanceContractData>({});

  useAsyncEffect(async () => {
    const data = await loadCommonData();

    setData(prevState => ({
      ...prevState,
      ...data,
    }));
  }, [version]);

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
      startAbrogationProposal(gasPrice: number, proposalId: number, description: string): Promise<Web3EventType<CancelProposalSendResult>> {
        return wallet.account ? startAbrogationProposalSend(wallet.account, gasPrice, proposalId, description) : Promise.reject();
      },
      abrogationCastVote(gasPrice: number, proposalId: number, support: boolean): Promise<Web3EventType<any>> {
        return wallet.account ? abrogationCastVoteSend(wallet.account, gasPrice, proposalId, support) : Promise.reject();
      },
      abrogationCancelVote(gasPrice: number, proposalId: number): Promise<Web3EventType<any>> {
        return wallet.account ? abrogationCancelVoteSend(wallet.account, gasPrice, proposalId) : Promise.reject();
      },
      getAbrogationReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult> {
        const address = voterAddress ?? wallet.account;
        return address ? getAbrogationReceiptCall(proposalId, address) : Promise.reject();
      },
      getProposalState: stateCall,
      getProposalData: proposalsCall,
      abrogationProposals: abrogationProposalsCall,
      getReceipt(proposalId: number, voterAddress?: string): Promise<GetReceiptCallResult> {
        const address = voterAddress ?? wallet.account;
        return address ? getReceiptCall(proposalId, address) : Promise.reject();
      },
      latestProposalIds(address: string): Promise<number> {
        return address ? latestProposalIdsCall(address) : Promise.reject();
      },
      proposalTimeLeft(state: ProposalState, createdAt: number): number | undefined {
        return proposalTimeLeft(data, state, createdAt);
      },
    },
  };
}
