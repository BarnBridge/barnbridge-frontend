import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { notification } from 'antd';

import MetamaskLogoDark from 'resources/svg/wallets/metamask-logo-dark.svg';
import MetamaskLogo from 'resources/svg/wallets/metamask-logo.svg';

import { Web3Network } from 'networks/types';
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

export class MetamaskConnector extends InjectedConnector {
  addChain(...infos: MetamaskAddEthereumChain[]): Promise<Error | null> {
    return this.getProvider().then(provider => {
      return provider.request({
        method: 'wallet_addEthereumChain',
        params: infos,
      });
    });
  }

  switchChain(info: MetamaskSwitchEthereumChain): Promise<Error | null> {
    return this.getProvider().then(provider => {
      return provider.request({
        method: 'wallet_switchEthereumChain',
        params: [info],
      });
    });
  }

  addToken(info: MetamaskWatchAsset): Promise<boolean> {
    return this.getProvider().then(provider => {
      return provider.request({
        method: 'wallet_watchAsset',
        params: info,
      });
    });
  }
}

function handleErrors(error: MetamaskError) {
  switch (error?.code) {
    case -32602:
      notification.error({
        message: error?.message,
      });
      break;
    default:
      break;
  }
}

const MetamaskWalletConfig: BaseWalletConfig = {
  id: 'metamask',
  logo: [MetamaskLogo, MetamaskLogoDark],
  name: 'MetaMask',
  factory(network: Web3Network): AbstractConnector {
    return new MetamaskConnector({
      supportedChainIds: [network.meta.chainId],
    });
  },
  onConnect(connector: AbstractConnector, args?: Record<string, any>) {
    connector?.getProvider().then(provider => {
      provider.addListener('send::error', handleErrors);
    });
  },
  onDisconnect(connector?: AbstractConnector) {
    connector?.getProvider().then(provider => {
      provider.removeListener('send::error', handleErrors);
    });
  },
  onError(error: MetamaskError): Error | undefined {
    switch (error?.code) {
      case -32002:
        return new Error('MetaMask is already processing. Please verify MetaMask extension.');
      default:
        break;
    }

    return undefined;
  },
};

export default MetamaskWalletConfig;
