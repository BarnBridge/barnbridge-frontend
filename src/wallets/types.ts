import { AbstractConnector } from '@web3-react/abstract-connector';

import { Web3Network } from 'networks/types';

export type BaseWalletConfig = {
  id: string;
  /** @description use string value for all theme image, or tuple [light, dark] to display different theme images */
  logo: string | [string, string];
  name: string;
  factory(network: Web3Network, args?: Record<string, any>): AbstractConnector;
  onConnect?(connector: AbstractConnector, args?: Record<string, any>): void;
  onDisconnect?(connector?: AbstractConnector): void;
  onError?(error: Error): Error | undefined;
};
