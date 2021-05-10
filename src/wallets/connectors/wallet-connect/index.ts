import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import config from 'config';
import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';

import { WalletConnector } from 'wallets/types';

const WalletConnectConfig: WalletConnector = {
  id: 'walletconnect',
  logo: WalletConnectLogo,
  name: 'WalletConnect',
  factory(chainId: number): AbstractConnector {
    return new WalletConnectConnector({
      rpc: {
        [chainId]: config.web3.rpc.httpsUrl,
      },
      pollingInterval: config.web3.poolingInterval,
      bridge: config.web3.wallets.walletConnect.bridge,
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
