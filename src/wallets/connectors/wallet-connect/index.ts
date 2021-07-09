import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';

import { Web3Network } from 'networks/types';
import { BaseWalletConfig } from 'wallets/types';

const WalletConnectConfig: BaseWalletConfig = {
  id: 'walletconnect',
  logo: WalletConnectLogo,
  name: 'WalletConnect',
  factory(network: Web3Network): AbstractConnector {
    return new WalletConnectConnector({
      rpc: {
        [network.meta.chainId]: network.rpc.httpsUrl,
      },
      pollingInterval: network.rpc.poolingInterval,
      bridge: network.config.wallets.walletConnectBridge,
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
