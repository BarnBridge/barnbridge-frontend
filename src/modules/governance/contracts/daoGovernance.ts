import React from 'react';
import { Web3EventType } from 'web3/types';
import { getGasValue } from 'web3/utils';
import Web3Contract, { Web3ContractAbiItem } from 'web3/web3Contract';

import config from 'config';
import useMergeState from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import DAO_GOVERNANCE_ABI from './daoGovernance.json';

const Contract = new Web3Contract(
  DAO_GOVERNANCE_ABI as Web3ContractAbiItem[],
  config.contracts.dao.governance,
  'DAO Governance',
);

function loadCommonData(): Promise<any> {
  return Contract.batch([
    {
      method: 'isActive',
    },
  ]).then(([isActive]) => ({
    isActive,
  }));
}

function activateSend(from: string): Promise<void> {
  return Contract.send('activate', [], {
    from,
  });
}

export type CreateProposalPayload = {
  title: string;
  description: string;
  targets: string[];
  signatures: string[];
  calldatas: string[];
  values: string[];
};

export type CreateProposalResult = any;

function createProposalSend(
  payload: CreateProposalPayload,
  from: string,
): Promise<Web3EventType<CreateProposalResult>> {
  return Contract.send(
    'propose',
    [payload.targets, payload.values, payload.signatures, payload.calldatas, payload.description, payload.title],
    {
      from,
    },
  ).then((tx: any) => (tx.events as Record<string, any>).ProposalCreated);
}

function cancelProposalSend(proposalId: number, from: string): Promise<void> {
  return Contract.send('cancelProposal', [proposalId], {
    from,
  });
}

function queueProposalForExecutionSend(proposalId: number, from: string, gasPrice: number): Promise<void> {
  return Contract.send('queue', [proposalId], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function executeProposalSend(proposalId: number, from: string): Promise<void> {
  return Contract.send('execute', [proposalId], {
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
  Executed,
}

function getProposalStateCall(proposalId: number): Promise<ProposalState> {
  return Contract.call('state', [proposalId]).then(Number);
}

function getLatestProposalIdCall(address: string): Promise<number> {
  return Contract.call('latestProposalIds', [address]).then(Number);
}

export type ProposalReceipt = {
  hasVoted: boolean;
  votes: number;
  support: boolean;
};

function getProposalReceiptCall(proposalId: number, voterAddress: string): Promise<ProposalReceipt> {
  return Contract.call('getReceipt', [proposalId, voterAddress]);
}

function proposalCastVoteSend(proposalId: number, support: boolean, from: string, gasPrice: number): Promise<void> {
  return Contract.send('castVote', [proposalId, support], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function proposalCancelVoteSend(proposalId: number, from: string, gasPrice: number): Promise<void> {
  return Contract.send('cancelVote', [proposalId], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

export type AbrogationProposal = {
  creator: string;
  createTime: number;
  forVotes: number;
  againstVotes: number;
};

function abrogationProposalCall(proposalId: number): Promise<AbrogationProposal> {
  return Contract.call('abrogationProposals', [proposalId]);
}

export type AbrogationProposalReceipt = {
  hasVoted: boolean;
  votes: number;
  support: boolean;
};

function getAbrogationProposalReceiptCall(
  proposalId: number,
  voterAddress: string,
): Promise<AbrogationProposalReceipt> {
  return Contract.call('getAbrogationProposalReceipt', [proposalId, voterAddress]);
}

function startAbrogationProposalSend(
  proposalId: number,
  description: string,
  from: string,
  gasPrice: number,
): Promise<void> {
  return Contract.send('startAbrogationProposal', [proposalId, description], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function abrogationProposalCastVoteSend(
  proposalId: number,
  support: boolean,
  from: string,
  gasPrice: number,
): Promise<void> {
  return Contract.send('abrogationProposal_castVote', [proposalId, support], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

function abrogationProposalCancelVoteSend(proposalId: number, from: string, gasPrice: number): Promise<void> {
  return Contract.send('abrogationProposal_cancelVote', [proposalId], {
    from,
    gasPrice: getGasValue(gasPrice),
  });
}

export type DAOGovernanceContractData = {
  contract: Web3Contract;
  isActive?: boolean;
};

const InitialState: DAOGovernanceContractData = {
  contract: Contract,
  isActive: undefined,
};

export type DAOGovernanceContract = DAOGovernanceContractData & {
  reload(): void;
  actions: {
    activate(): Promise<void>;
    createProposal(payload: CreateProposalPayload): Promise<Web3EventType<CreateProposalResult>>;
    cancelProposal(proposalId: number): Promise<void>;
    queueProposalForExecution(proposalId: number, gasPrice: number): Promise<void>;
    executeProposal(proposalId: number): Promise<void>;
    getProposalState(proposalId: number): Promise<ProposalState>;
    getLatestProposalId(): Promise<number>;
    getProposalReceipt(proposalId: number): Promise<ProposalReceipt>;
    proposalCastVote(proposalId: number, support: boolean, gasPrice: number): Promise<void>;
    proposalCancelVote(proposalId: number, gasPrice: number): Promise<void>;
    abrogationProposal(proposalId: number): Promise<AbrogationProposal>;
    getAbrogationProposalReceipt(proposalId: number): Promise<AbrogationProposalReceipt>;
    startAbrogationProposal(proposalId: number, description: string, gasPrice: number): Promise<void>;
    abrogationProposalCastVote(proposalId: number, support: boolean, gasPrice: number): Promise<void>;
    abrogationProposalCancelVote(proposalId: number, gasPrice: number): Promise<void>;
  };
};

export function useDAOGovernanceContract(): DAOGovernanceContract {
  const wallet = useWallet();

  const [state, setState] = useMergeState<DAOGovernanceContractData>(InitialState);
  const [reload, version] = useReload();

  React.useEffect(() => {
    setState({
      isActive: undefined,
    });

    loadCommonData().then(setState).catch(Error);
  }, [version, setState]);

  return {
    ...state,
    reload,
    actions: {
      activate(): Promise<void> {
        return wallet.isActive ? activateSend(wallet.account!) : Promise.reject();
      },
      createProposal(payload: CreateProposalPayload): Promise<Web3EventType<CreateProposalResult>> {
        return wallet.isActive ? createProposalSend(payload, wallet.account!) : Promise.reject();
      },
      cancelProposal(proposalId: number): Promise<void> {
        return wallet.isActive ? cancelProposalSend(proposalId, wallet.account!) : Promise.reject();
      },
      queueProposalForExecution(proposalId: number, gasPrice: number): Promise<void> {
        return wallet.isActive
          ? queueProposalForExecutionSend(proposalId, wallet.account!, gasPrice)
          : Promise.reject();
      },
      executeProposal(proposalId: number): Promise<void> {
        return wallet.isActive ? executeProposalSend(proposalId, wallet.account!) : Promise.reject();
      },
      getProposalState(proposalId: number): Promise<ProposalState> {
        return getProposalStateCall(proposalId);
      },
      getLatestProposalId(): Promise<number> {
        return wallet.isActive ? getLatestProposalIdCall(wallet.account!) : Promise.reject();
      },
      getProposalReceipt(proposalId: number): Promise<ProposalReceipt> {
        return wallet.isActive ? getProposalReceiptCall(proposalId, wallet.account!) : Promise.reject();
      },
      proposalCastVote(proposalId: number, support: boolean, gasPrice: number): Promise<void> {
        return wallet.isActive
          ? proposalCastVoteSend(proposalId, support, wallet.account!, gasPrice)
          : Promise.reject();
      },
      proposalCancelVote(proposalId: number, gasPrice: number): Promise<void> {
        return wallet.isActive ? proposalCancelVoteSend(proposalId, wallet.account!, gasPrice) : Promise.reject();
      },
      abrogationProposal(proposalId: number): Promise<AbrogationProposal> {
        return abrogationProposalCall(proposalId);
      },
      getAbrogationProposalReceipt(proposalId: number): Promise<AbrogationProposalReceipt> {
        return wallet.isActive ? getAbrogationProposalReceiptCall(proposalId, wallet.account!) : Promise.reject();
      },
      startAbrogationProposal(proposalId: number, description: string, gasPrice: number): Promise<void> {
        return wallet.isActive
          ? startAbrogationProposalSend(proposalId, description, wallet.account!, gasPrice)
          : Promise.reject();
      },
      abrogationProposalCastVote(proposalId: number, support: boolean, gasPrice: number): Promise<void> {
        return wallet.isActive
          ? abrogationProposalCastVoteSend(proposalId, support, wallet.account!, gasPrice)
          : Promise.reject();
      },
      abrogationProposalCancelVote(proposalId: number, gasPrice: number): Promise<void> {
        return wallet.isActive
          ? abrogationProposalCancelVoteSend(proposalId, wallet.account!, gasPrice)
          : Promise.reject();
      },
    },
  };
}
