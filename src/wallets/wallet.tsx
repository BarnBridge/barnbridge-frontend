import React, { FC, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import { Web3Provider } from '@ethersproject/providers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { DefaultWeb3, useEthWeb3 } from 'components/providers/eth-web3-provider';
import ConnectWalletModal from 'wallets/components/connect-wallet-modal';
import InstallMetaMaskModal from 'wallets/components/install-metamask-modal';
import UnsupportedChainModal from 'wallets/components/unsupported-chain-modal';
import CoinbaseWalletConfig from 'wallets/connectors/coinbase';
import GnosisSafeConfig from 'wallets/connectors/gnosis-safe';
import LedgerWalletConfig from 'wallets/connectors/ledger';
import MetamaskWalletConfig from 'wallets/connectors/metamask';
import PortisWalletConfig from 'wallets/connectors/portis';
import TrezorWalletConfig from 'wallets/connectors/trezor';
import WalletConnectConfig from 'wallets/connectors/wallet-connect';

import { BaseWalletConfig } from 'wallets/types';

export const WalletConnectors: BaseWalletConfig[] = [
  MetamaskWalletConfig,
  LedgerWalletConfig,
  PortisWalletConfig,
  TrezorWalletConfig,
  CoinbaseWalletConfig,
  WalletConnectConfig,
];

type WalletData = {
  initialized: boolean;
  connecting?: BaseWalletConfig;
  isActive: boolean;
  account?: string;
  meta?: BaseWalletConfig;
  connector?: AbstractConnector;
  provider?: any;
  ethBalance?: BigNumber;
};

export type Wallet = WalletData & {
  showWalletsModal: () => void;
  connect: (connector: BaseWalletConfig, args?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<Wallet>({
  initialized: false,
  connecting: undefined,
  isActive: false,
  account: undefined,
  connector: undefined,
  provider: undefined,
  showWalletsModal: () => undefined,
  connect: () => Promise.reject(),
  disconnect: () => undefined,
});

export function useWallet(): Wallet {
  return useContext(WalletContext);
}

const WalletProvider: FC = props => {
  const web3React = useWeb3React();
  const ethWeb3 = useEthWeb3();
  const safeApps = useSafeAppsSDK();

  const [sessionProvider, setSessionProvider, removeSessionProvider] = useSessionStorage<string | undefined>(
    'wallet_provider',
  );

  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<BaseWalletConfig | undefined>(undefined);
  const connectingRef = useRef<BaseWalletConfig | undefined>(connecting);
  connectingRef.current = connecting;
  const [activeMeta, setActiveMeta] = useState<BaseWalletConfig | undefined>();
  const [ethBalance, setEthBalance] = useState<BigNumber | undefined>();
  const [walletsModal, setWalletsModal] = useState<boolean>(false);
  const [unsupportedChainModal, setUnsupportedChainModal] = useState<boolean>(false);
  const [installMetaMaskModal, setInstallMetaMaskModal] = useState<boolean>(false);

  const disconnect = useCallback(() => {
    web3React.deactivate();
    activeMeta?.onDisconnect?.(web3React.connector);
    setConnecting(undefined);
    setActiveMeta(undefined);
    ethWeb3.setActiveProvider(undefined);
    setEthBalance(undefined);
    removeSessionProvider();
    ethWeb3.selectNetwork();
  }, [web3React, activeMeta, removeSessionProvider, setConnecting]);

  const connect = useCallback(
    async (walletConfig: BaseWalletConfig, args?: Record<string, any>): Promise<void> => {
      if (connectingRef.current || !ethWeb3.activeNetwork) {
        return;
      }

      connectingRef.current = walletConfig;
      setConnecting(walletConfig);
      setWalletsModal(false);

      const connector = walletConfig.factory(ethWeb3.activeNetwork.chainId, args);

      function onError(error: Error) {
        console.error('Wallet::Connect().onError', { error });

        if (error instanceof NoEthereumProviderError) {
          setInstallMetaMaskModal(true);
          disconnect();
        } else if (error instanceof UnsupportedChainIdError) {
          setUnsupportedChainModal(true);
          disconnect();
        } else {
          const err = walletConfig.onError?.(error);

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

        walletConfig.onConnect?.(connector, args);
        connector.getProvider().then(ethWeb3.setActiveProvider);
        setActiveMeta(walletConfig);
        setSessionProvider(walletConfig.id);
      }

      await web3React.activate(connector, undefined, true).then(onSuccess).catch(onError);

      setConnecting(undefined);
    },
    [web3React, connectingRef, setConnecting, setSessionProvider, disconnect],
  );

  useEffect(() => {
    if (web3React.account) {
      DefaultWeb3.eth
        .getBalance(web3React.account)
        .then(value => {
          setEthBalance(value ? new BigNumber(value) : undefined);
        })
        .catch(Error);
    } else {
      setEthBalance(undefined);
    }
  }, [web3React.account]);

  useEffect(() => {
    (async () => {
      let resetNetwork = true;

      if (sessionProvider) {
        const walletConnector = WalletConnectors.find(c => c.id === sessionProvider);

        if (walletConnector) {
          if (walletConnector === MetamaskWalletConfig) {
            resetNetwork = false;
          }

          await connect(walletConnector);
        }
      }

      if (resetNetwork) {
        ethWeb3.selectNetwork();
      }

      setInitialized(true);
    })();
  }, [ethWeb3.activeNetwork]);

  useEffect(() => {
    (async () => {
      if (safeApps.connected) {
        await connect(GnosisSafeConfig);
      }
    })();
  }, [safeApps.connected]);

  const value: Wallet = {
    initialized,
    connecting,
    isActive: web3React.active,
    account: web3React.account ?? undefined,
    meta: activeMeta,
    connector: web3React.connector,
    provider: ethWeb3.activeProvider,
    ethBalance,
    showWalletsModal: () => {
      setWalletsModal(true);
    },
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {walletsModal && <ConnectWalletModal onCancel={() => setWalletsModal(false)} />}
      {installMetaMaskModal && <InstallMetaMaskModal onCancel={() => setInstallMetaMaskModal(false)} />}
      {unsupportedChainModal && <UnsupportedChainModal onCancel={() => setUnsupportedChainModal(false)} />}
      {props.children}
    </WalletContext.Provider>
  );
};

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12_000;
  return library;
}

const Web3WalletProvider: FC = props => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>{props.children}</WalletProvider>
    </Web3ReactProvider>
  );
};

export default Web3WalletProvider;
