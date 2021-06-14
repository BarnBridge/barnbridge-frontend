import { AbstractConnector } from '@web3-react/abstract-connector';

export type BaseWalletConfig = {
  id: string;
  /** @description use string value for all theme image, or tuple [light, dark] to display different theme images */
  logo: string | [string, string];
  name: string;
  factory(chainId: number, args?: Record<string, any>): AbstractConnector;
  onConnect?(connector: AbstractConnector, args?: Record<string, any>): void;
  onDisconnect?(connector?: AbstractConnector): void;
  onError?(error: Error): Error | undefined;
};
