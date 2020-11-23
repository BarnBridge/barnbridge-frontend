import { AbstractConnector } from '@web3-react/abstract-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';

import { WalletConnector } from 'wallets/types';
import { getHttpsRpcUrl } from 'web3/utils';

import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';

const WEB3_POLLING_INTERVAL = Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL);
const WEB3_TREZOR_EMAIL = String(process.env.REACT_APP_WEB3_TREZOR_EMAIL);
const WEB3_TREZOR_APP_URL = String(process.env.REACT_APP_WEB3_TREZOR_APP_URL);

export const TrezorWalletConfig: WalletConnector = {
  id: 'trezor',
  logo: TrezorLogo,
  name: 'Trezor',
  factory(chainId: number): AbstractConnector {
    return new TrezorConnector({
      chainId: chainId,
      url: getHttpsRpcUrl(chainId),
      pollingInterval: WEB3_POLLING_INTERVAL,
      manifestEmail: WEB3_TREZOR_EMAIL,
      manifestAppUrl: WEB3_TREZOR_APP_URL,
      config: {
        networkId: chainId,
      },
    });
  },
  onError(error: Error): Error | undefined {
    if (error.message === 'Cancelled') {
      return;
    } else if (error.message === 'Popup closed') {
      return;
    }

    return error;
  },
};
