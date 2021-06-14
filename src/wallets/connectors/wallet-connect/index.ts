import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { config } from 'config';
import { DefaultNetwork, getHttpRpcUrl } from 'networks';
import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';

import { BaseWalletConfig } from 'wallets/types';

const WalletConnectConfig: BaseWalletConfig = {
  id: 'walletconnect',
  logo: WalletConnectLogo,
  name: 'WalletConnect',
  factory(chainId: number): AbstractConnector {
    return new WalletConnectConnector({
      rpc: {
        [chainId]: getHttpRpcUrl(),
      },
      pollingInterval: DefaultNetwork.poolingInterval,
      bridge: config.wallets.walletConnectBridge,
      qrcode: true,
    });
  },
  onDisconnect(connector?: WalletConnectConnector): void {
    connector?.close();
  },
  onError(error: Error): Error | undefined {
    return error;
  },
};

export default WalletConnectConfig;
