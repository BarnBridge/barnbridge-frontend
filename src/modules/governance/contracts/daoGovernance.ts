import { AbiItem } from 'web3-utils';
import Web3Contract, { AbiTuple, createAbiItem } from 'web3/web3Contract';

export type ProposalReceipt = {
  hasVoted: boolean;
  votes: number;
  support: boolean;
};

export type AbrogationProposal = {
  creator: string;
  createTime: number;
  forVotes: number;
  againstVotes: number;
};

export type AbrogationProposalReceipt = {
  hasVoted: boolean;
  votes: number;
  support: boolean;
};

const DaoGovernanceABI: AbiItem[] = [
  // call
  createAbiItem('isActive', [], ['bool']),
  createAbiItem('state', ['uint256'], ['uint8']),
  createAbiItem('latestProposalIds', ['address'], ['uint256']),
  createAbiItem('getReceipt', ['uint256', 'address'], [new AbiTuple(['bool', 'uint256', 'bool'])]),
  createAbiItem('abrogationProposals', ['uint256'], ['address', 'uint256', 'string', 'uint256', 'uint256']),
  createAbiItem('getAbrogationProposalReceipt', ['uint256', 'address'], [new AbiTuple(['bool', 'uint256', 'bool'])]),
  // send
  createAbiItem('activate', [], []),
  createAbiItem('propose', ['address[]', 'uint256[]', 'string[]', 'bytes[]', 'string', 'string'], ['uint256']),
  createAbiItem('cancelProposal', ['uint256'], []),
  createAbiItem('queue', ['uint256'], []),
  createAbiItem('execute', ['uint256'], []),
  createAbiItem('castVote', ['uint256', 'bool'], []),
  createAbiItem('cancelVote', ['uint256'], []),
  createAbiItem('startAbrogationProposal', ['uint256', 'string'], []),
  createAbiItem('abrogationProposal_castVote', ['uint256', 'bool'], []),
  createAbiItem('abrogationProposal_cancelVote', ['uint256'], []),
];

class DaoGovernanceContract extends Web3Contract {
  constructor(address: string) {
    super(DaoGovernanceABI, address, 'DAO Governance');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {});
  }

  // common data
  isActive?: boolean;

  async loadCommonData(): Promise<void> {
    const [isActive] = await this.batch([{ method: 'isActive' }]);

    this.isActive = Boolean(isActive);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadUserData(): Promise<void> {
    this.assertAccount();

    this.emit(Web3Contract.UPDATE_DATA);
  }

  getState(proposalId: number): Promise<number> {
    return this.call('state', [proposalId]).then(value => Number(value));
  }

  getLatestProposalIds(address: string): Promise<number> {
    return this.call('latestProposalIds', [address]).then(value => Number(value));
  }

  getReceipt(proposalId: number, voterAddress: string): Promise<ProposalReceipt> {
    return this.call('getReceipt', [proposalId, voterAddress]).then(value => ({
      hasVoted: Boolean(value[0]),
      votes: Number(value[1]),
      support: Boolean(value[2]),
    }));
  }

  getAbrogationProposals(proposalId: number): Promise<AbrogationProposal> {
    return this.call('abrogationProposals', [proposalId]).then(value => ({
      creator: value[0],
      createTime: Number(value[1]),
      description: value[2],
      forVotes: Number(value[3]),
      againstVotes: Number(value[4]),
    }));
  }

  getAbrogationProposalReceipt(proposalId: number, voterAddress: string): Promise<AbrogationProposalReceipt> {
    return this.call('getAbrogationProposalReceipt', [proposalId, voterAddress]).then(value => ({
      hasVoted: Boolean(value[0]),
      votes: Number(value[1]),
      support: Boolean(value[2]),
    }));
  }

  activate(gasPrice?: number): Promise<void> {
    return this.send('activate', [], {}, gasPrice);
  }

  propose(
    title: string,
    description: string,
    targets: string[],
    values: string[],
    signatures: string[],
    calldatas: string[],
    gasPrice?: number,
  ): Promise<number> {
    return this.send('propose', [targets, values, signatures, calldatas, description, title], {}, gasPrice);
  }

  cancelProposal(proposalId: number, gasPrice?: number): Promise<void> {
    return this.send('cancelProposal', [proposalId], {}, gasPrice);
  }

  queue(proposalId: number, gasPrice?: number): Promise<void> {
    return this.send('queue', [proposalId], {}, gasPrice);
  }

  execute(proposalId: number, gasPrice?: number): Promise<void> {
    return this.send('execute', [proposalId], {}, gasPrice);
  }

  castVote(proposalId: number, support: boolean, gasPrice?: number): Promise<void> {
    return this.send('castVote', [proposalId, support], {}, gasPrice);
  }

  cancelVote(proposalId: number, gasPrice?: number): Promise<void> {
    return this.send('cancelVote', [proposalId], {}, gasPrice);
  }

  startAbrogationProposal(proposalId: number, description: string, gasPrice?: number): Promise<void> {
    return this.send('startAbrogationProposal', [proposalId, description], {}, gasPrice);
  }

  abrogationProposalCastVote(proposalId: number, support: boolean, gasPrice?: number): Promise<void> {
    return this.send('abrogationProposal_castVote', [proposalId, support], {}, gasPrice);
  }

  abrogationProposalCancelVote(proposalId: number, gasPrice?: number): Promise<void> {
    return this.send('abrogationProposal_cancelVote', [proposalId], {}, gasPrice);
  }
}

export default DaoGovernanceContract;
