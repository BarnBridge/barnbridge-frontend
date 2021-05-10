import { AbstractConnector } from '@web3-react/abstract-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';

import config from 'config';
import TrezorLogoDark from 'resources/svg/wallets/trezor-logo-dark.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';

import { WalletConnector } from 'wallets/types';

const TrezorWalletConfig: WalletConnector = {
  id: 'trezor',
  logo: [TrezorLogo, TrezorLogoDark],
  name: 'Trezor',
  factory(chainId: number): AbstractConnector {
    return new TrezorConnector({
      chainId,
      url: config.web3.rpc.httpsUrl,
      pollingInterval: config.web3.poolingInterval,
      manifestEmail: config.web3.wallets.trezor.email,
      manifestAppUrl: config.web3.wallets.trezor.appUrl,
      config: {
        networkId: chainId,
      },
    });
  },
  onError(error: Error): Error | undefined {
    if (error.message === 'Cancelled') {
      return undefined;
    }
    if (error.message === 'Popup closed') {
      return undefined;
    }

    return error;
  },
};

export default TrezorWalletConfig;
