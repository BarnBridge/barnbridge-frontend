import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import CoinbaseWalletLogo from 'resources/svg/wallets/coinbase-logo.svg';

import { Web3Network } from 'networks/types';
import { BaseWalletConfig } from 'wallets/types';

export type CoinbaseWalletArgs = {
  darkMode?: boolean;
};

const CoinbaseWalletConfig: BaseWalletConfig = {
  id: 'coinbase',
  logo: CoinbaseWalletLogo,
  name: 'Coinbase Wallet',
  factory(network: Web3Network, args?: CoinbaseWalletArgs): AbstractConnector {
    const darkMode = args?.darkMode ?? false;

    return new WalletLinkConnector({
      url: network.rpc.httpsUrl,
      appName: network.config.wallets.coinbaseAppName,
      appLogoUrl: '',
      darkMode,
    });
  },
  onDisconnect(connector?: WalletLinkConnector): void {
    connector?.close();
  },
  onError(error: Error): Error | undefined {
    const { code } = error as any as { code: number };

    if (code === 4001) {
      // USER_DENIED_REQUEST_ACCOUNTS
      return undefined;
    }

    return error;
  },
};

export default CoinbaseWalletConfig;
