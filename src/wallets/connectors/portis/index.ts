import { AbstractConnector } from '@web3-react/abstract-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import PortisLogo from 'resources/svg/wallets/portis-logo.svg';

import { Web3Network } from 'networks/types';
import { BaseWalletConfig } from 'wallets/types';

const PortisWalletConfig: BaseWalletConfig = {
  id: 'portis',
  logo: PortisLogo,
  name: 'Portis',
  factory(network: Web3Network): AbstractConnector {
    return new PortisConnector({
      dAppId: network.config.wallets.portisId,
      networks: [network.meta.chainId],
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
