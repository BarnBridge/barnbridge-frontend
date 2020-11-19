import { AbstractConnector } from '@web3-react/abstract-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { WalletConnector } from 'wallets/types';

import PortisLogo from 'resources/svg/wallets/portis-logo.svg';

const WEB3_PORTIS_APP_ID = String(process.env.REACT_APP_WEB3_PORTIS_APP_ID);

export const PortisWalletConfig: WalletConnector = {
  id: 'portis',
  logo: PortisLogo,
  name: 'Portis',
  factory(chainId: number): AbstractConnector {
    return new PortisConnector({
      dAppId: WEB3_PORTIS_APP_ID,
      networks: [chainId],
    });
  },
  onError(error: Error | String): Error | undefined {
    if (typeof error === 'string') {
      if (error === 'User denied login.') {
        return;
      }
    }

    return error as Error;
  },
};
