import { AbstractConnector } from '@web3-react/abstract-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';

import TrezorLogoDark from 'resources/svg/wallets/trezor-logo-dark.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';

import { Web3Network } from 'networks/types';
import { BaseWalletConfig } from 'wallets/types';

const TrezorWalletConfig: BaseWalletConfig = {
  id: 'trezor',
  logo: [TrezorLogo, TrezorLogoDark],
  name: 'Trezor',
  factory(network: Web3Network): AbstractConnector {
    return new TrezorConnector({
      chainId: network.meta.chainId,
      url: network.rpc.httpsUrl,
      pollingInterval: network.rpc.poolingInterval,
      manifestEmail: network.config.wallets.trezorEmail,
      manifestAppUrl: network.config.wallets.trezorAppUrl,
      config: {
        networkId: network.meta.chainId,
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
