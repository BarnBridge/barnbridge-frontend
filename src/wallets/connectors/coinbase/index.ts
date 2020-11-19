import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { WalletConnector } from 'wallets/types';
import { getHttpsRpcUrl } from 'web3/utils';

import CoinbaseWalletLogo from 'resources/svg/wallets/coinbase-logo.svg';

const WEB3_COINBASE_WALLET_APP_NAME = String(process.env.REACT_APP_WEB3_COINBASE_WALLET_APP_NAME);

export type CoinbaseWalletArgs = {
  darkMode?: boolean;
};

export const CoinbaseWalletConfig: WalletConnector = {
  id: 'coinbase',
  logo: CoinbaseWalletLogo,
  name: 'Coinbase Wallet',
  factory(chainId: number, args?: CoinbaseWalletArgs): AbstractConnector {
    const darkMode = args?.darkMode ?? false;

    return new WalletLinkConnector({
      url: getHttpsRpcUrl(chainId),
      appName: WEB3_COINBASE_WALLET_APP_NAME,
      appLogoUrl: '',
      darkMode,
    });
  },
  onDisconnect(connector?: WalletLinkConnector): void {
    connector?.close();
  },
  onError(error: Error): Error | undefined {
    const { code } = error as any as { code: number };

    if (code === 4001) { // USER_DENIED_REQUEST_ACCOUNTS
      return;
    }

    return error;
  },
};
