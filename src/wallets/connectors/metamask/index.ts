import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import { DefaultNetwork, KnownNetworks } from 'networks';
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

export type MetamaskSwitchEthereumChain = {
  chainId: string;
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

export function metamask_AddEthereumChain(provider: any, ...infos: MetamaskAddEthereumChain[]): Promise<Error | null> {
  return provider.request({
    method: 'wallet_addEthereumChain',
    params: infos,
  });
}

export function metamask_SwitchEthereumChain(provider: any, info: MetamaskSwitchEthereumChain): Promise<Error | null> {
  return provider.request({
    method: 'wallet_switchEthereumChain',
    params: [info],
  });
}

export function metamask_AddToken(provider: any, info: MetamaskWatchAsset): Promise<boolean> {
  return provider.request({
    method: 'wallet_watchAsset',
    params: info,
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
  onConnect(connector: AbstractConnector, args?: Record<string, any>) {
    connector.getProvider().then(ethereum => {
      ethereum.on('chainChanged', (chainId: number) => {
        const network = KnownNetworks.find(kn => kn.chainId === Number(chainId)) ?? DefaultNetwork;

        if (network) {
          localStorage.setItem('bb_last_network', `"${network.id}"`);
          window.location.reload();
        }
      });
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
