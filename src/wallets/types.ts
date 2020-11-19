import { AbstractConnector } from '@web3-react/abstract-connector';

export type WalletConnector = {
  id: string;
  logo: string;
  name: string;
  factory(chainId: number, args?: Record<string, any>): AbstractConnector;
  onConnect?(connector: AbstractConnector, args?: Record<string, any>): void;
  onDisconnect?(connector?: AbstractConnector): void;
  onError?(error: Error): Error | undefined;
};
