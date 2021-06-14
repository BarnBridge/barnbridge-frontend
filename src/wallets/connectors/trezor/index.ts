import { AbstractConnector } from '@web3-react/abstract-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';

import { config } from 'config';
import { DefaultNetwork, getHttpRpcUrl } from 'networks';
import TrezorLogoDark from 'resources/svg/wallets/trezor-logo-dark.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';

import { BaseWalletConfig } from 'wallets/types';

const TrezorWalletConfig: BaseWalletConfig = {
  id: 'trezor',
  logo: [TrezorLogo, TrezorLogoDark],
  name: 'Trezor',
  factory(chainId: number): AbstractConnector {
    return new TrezorConnector({
      chainId,
      url: getHttpRpcUrl(),
      pollingInterval: DefaultNetwork.poolingInterval,
      manifestEmail: config.wallets.trezorEmail,
      manifestAppUrl: config.wallets.trezorAppUrl,
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
