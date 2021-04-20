import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import MetaMaskLogoDark from 'resources/svg/wallets/metamask-logo-dark.svg';
import MetaMaskLogo from 'resources/svg/wallets/metamask-logo.svg';

import { WalletConnector } from 'wallets/types';

type MetaMaskError = Error & {
  code: number;
};

const MetaMaskWalletConfig: WalletConnector = {
  id: 'metamask',
  logo: [MetaMaskLogo, MetaMaskLogoDark],
  name: 'MetaMask',
  factory(chainId: number): AbstractConnector {
    return new InjectedConnector({
      supportedChainIds: [chainId],
    });
  },
  onError(error: MetaMaskError): Error | undefined {
    if (error.code === -32002) {
      return new Error('MetaMask is already processing. Please verify MetaMask extension.');
    }

    return undefined;
  },
};

export default MetaMaskWalletConfig;
