export type Web3EventType<T extends Record<string, any>> = {
  event: string;
  id: string;
  address: string;
  blockHash: string;
  blockNumber: number;
  raw: {
    data: string;
  };
  returnValues: T;
  signature: string;
  transactionHash: string;
};
