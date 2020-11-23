import React from 'react';
import * as Antd from 'antd';
import { useSessionStorage } from 'react-use-storage';
import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useRefState } from 'hooks/useRefState';

import { getNetworkName } from 'web3/utils';
import { WalletConnector } from 'wallets/types';
import { CoinbaseWalletConfig } from 'wallets/connectors/coinbase';
import { LedgerWalletConfig } from 'wallets/connectors/ledger';
import { MetaMaskWalletConfig } from 'wallets/connectors/metamask';
import { PortisWalletConfig } from 'wallets/connectors/portis';
import { TrezorWalletConfig } from 'wallets/connectors/trezor';
import { WalletConnectConfig } from 'wallets/connectors/wallet-connect';

import ConnectWalletModal from 'components/connect-wallet-modal';
import InstallMetaMaskModal from 'components/install-metamask-modal';
import UnsupportedChainModal from 'components/unsupported-chain-modal';

const WEB3_CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);
const WEB3_POLLING_INTERVAL = Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL);

export const WalletConnectors: WalletConnector[] = [
  MetaMaskWalletConfig,
  WalletConnectConfig,
  LedgerWalletConfig,
  TrezorWalletConfig,
  CoinbaseWalletConfig,
  PortisWalletConfig,
];

type WalletData = {
  connecting?: WalletConnector;
  isActive: boolean;
  account?: string;
  networkId?: number;
  networkName?: string;
  connector?: WalletConnector;
  provider?: any;
};

export type Wallet = WalletData & {
  showWalletsModal: () => void;
  connect: (connector: WalletConnector, args?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = React.createContext<Wallet>({
  connecting: undefined,
  isActive: false,
  account: undefined,
  networkId: undefined,
  networkName: undefined,
  connector: undefined,
  provider: undefined,
  showWalletsModal: () => undefined,
  connect: () => Promise.reject(),
  disconnect: () => undefined,
});

export function useWallet(): Wallet {
  return React.useContext(WalletContext);
}

const WalletProvider: React.FunctionComponent = props => {
  const web3React = useWeb3React();

  const [
    sessionProvider,
    setSessionProvider,
    removeSessionProvider,
  ] = useSessionStorage<string | undefined>('wallet_provider');

  const [connecting, setConnecting, connectingRef] = useRefState<WalletConnector | undefined>(undefined);
  const [activeConnector, setActiveConnector] = React.useState<WalletConnector | undefined>(undefined);
  const [activeProvider, setActiveProvider] = React.useState<any | undefined>(undefined);

  const [walletsModal, setWalletsModal] = React.useState<boolean>(false);
  const [unsupportedChainModal, setUnsupportedChainModal] = React.useState<boolean>(false);
  const [installMetaMaskModal, setInstallMetaMaskModal] = React.useState<boolean>(false);

  const disconnect = React.useCallback(() => {
    web3React.deactivate();
    activeConnector?.onDisconnect?.(web3React.connector);
    setConnecting(undefined);
    setActiveConnector(undefined);
    setActiveProvider(undefined);
    removeSessionProvider();
  }, [
    web3React,
    activeConnector,
    removeSessionProvider,
    setConnecting,
  ]);

  const connect = React.useCallback(async (walletConnector: WalletConnector, args?: Record<string, any>): Promise<void> => {
    if (connectingRef.current) {
      return;
    }

    connectingRef.current = walletConnector;
    setConnecting(walletConnector);
    setWalletsModal(false);

    const connector = walletConnector.factory(WEB3_CHAIN_ID, args);

    function onError(error: Error) {
      console.error('Wallet::Connect().onError', { error });

      if (error instanceof NoEthereumProviderError) {
        setInstallMetaMaskModal(true);
        disconnect();
      } else if (error instanceof UnsupportedChainIdError) {
        setUnsupportedChainModal(true);
        disconnect();
      } else {
        const err = walletConnector.onError?.(error);

        if (err) {
          Antd.notification.error({
            message: err.message,
          });
        }
      }
    }

    function onSuccess() {
      if (!connectingRef.current) {
        return;
      }

      walletConnector.onConnect?.(connector, args);
      connector.getProvider().then(setActiveProvider);
      setActiveConnector(walletConnector);
      setSessionProvider(walletConnector.id);
    }

    await web3React.activate(connector, undefined, true)
      .then(onSuccess)
      .catch(onError);

    setConnecting(undefined);
  }, [
    web3React,
    connectingRef,
    setConnecting,
    setSessionProvider,
    disconnect,
  ]);

  useAsyncEffect(async () => {
    if (sessionProvider) {
      const walletConnector = WalletConnectors.find(c => c.id === sessionProvider);

      if (walletConnector) {
        await connect(walletConnector);
      }
    }
  }, []);

  const value = React.useMemo<Wallet>(() => ({
    connecting,
    isActive: web3React.active,
    account: web3React.account ?? undefined,
    networkId: web3React.chainId,
    networkName: getNetworkName(web3React.chainId),
    connector: activeConnector,
    provider: activeProvider,
    showWalletsModal: () => {
      setWalletsModal(true);
    },
    connect,
    disconnect,
  }), [
    web3React,
    connecting,
    activeConnector,
    activeProvider,
    disconnect,
    connect,
  ]);

  return (
    <WalletContext.Provider value={value}>
      <ConnectWalletModal
        visible={walletsModal}
        onCancel={() => setWalletsModal(false)} />
      <InstallMetaMaskModal
        visible={installMetaMaskModal}
        onCancel={() => setInstallMetaMaskModal(false)} />
      <UnsupportedChainModal
        visible={unsupportedChainModal}
        onCancel={() => setUnsupportedChainModal(false)} />
      {props.children}
    </WalletContext.Provider>
  );
};

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = WEB3_POLLING_INTERVAL;
  return library;
}

const Web3WalletProvider: React.FunctionComponent = props => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        {props.children}
      </WalletProvider>
    </Web3ReactProvider>
  );
};

export default Web3WalletProvider;
