import { Contract } from 'web3-eth-contract';
import { BatchRequest } from 'web3-core/types';

export type EthContract = Contract & {
  BatchRequest?: new () => BatchRequest;
  setProvider?: (provider: string) => boolean;
};
