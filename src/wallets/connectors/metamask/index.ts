import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import MetamaskLogoDark from 'resources/svg/wallets/metamask-logo-dark.svg';
import MetamaskLogo from 'resources/svg/wallets/metamask-logo.svg';

import { BaseWalletConfig } from 'wallets/types';

type MetamaskError = Error & {
  code: number;
};

export type MetamaskAddEthereumChain = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

export type MetamaskWatchAsset = {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  };
};

export function metamask_AddEthereumChain(provider: any, params: MetamaskAddEthereumChain[]): Promise<Error | null> {
  return provider.request({
    method: 'wallet_addEthereumChain',
    params,
  });
}

export function metamask_AddToken(provider: any, params: MetamaskWatchAsset): Promise<boolean> {
  return provider.request({
    method: 'wallet_watchAsset',
    params,
  });
}

const MetamaskWalletConfig: BaseWalletConfig = {
  id: 'metamask',
  logo: [MetamaskLogo, MetamaskLogoDark],
  name: 'MetaMask',
  factory(chainId: number): AbstractConnector {
    return new InjectedConnector({
      supportedChainIds: [chainId],
    });
  },
  onError(error: MetamaskError): Error | undefined {
    if (error.code === -32002) {
      return new Error('MetaMask is already processing. Please verify MetaMask extension.');
    }

    return undefined;
  },
};

export default MetamaskWalletConfig;
