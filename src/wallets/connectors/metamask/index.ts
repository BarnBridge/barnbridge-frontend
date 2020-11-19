import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import { WalletConnector } from 'wallets/types';

import MetaMaskLogo from 'resources/svg/wallets/metamask-logo.svg';

type MetaMaskError = Error & {
  code: number;
};

export const MetaMaskWalletConfig: WalletConnector = {
  id: 'metamask',
  logo: MetaMaskLogo,
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
  },
};
