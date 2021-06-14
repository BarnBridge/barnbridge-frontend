import { AbstractConnector } from '@web3-react/abstract-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { config } from 'config';
import PortisLogo from 'resources/svg/wallets/portis-logo.svg';

import { BaseWalletConfig } from 'wallets/types';

const PortisWalletConfig: BaseWalletConfig = {
  id: 'portis',
  logo: PortisLogo,
  name: 'Portis',
  factory(chainId: number): AbstractConnector {
    return new PortisConnector({
      dAppId: config.wallets.portisId,
      networks: [chainId],
    });
  },
  onError(error: Error | string): Error | undefined {
    if (typeof error === 'string') {
      if (error === 'User denied login.') {
        return undefined;
      }
    }

    return error as Error;
  },
};

export default PortisWalletConfig;
