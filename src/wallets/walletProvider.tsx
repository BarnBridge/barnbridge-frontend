import React, { FC, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import SafeProvider, { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import EventEmitter from 'wolfy87-eventemitter';

import { useNetwork } from 'components/providers/networkProvider';
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

import { InvariantContext } from 'utils/context';

import { BaseWalletConfig } from 'wallets/types';

export const WalletConnectors: BaseWalletConfig[] = [
  MetamaskWalletConfig,
  LedgerWalletConfig,
  PortisWalletConfig,
  TrezorWalletConfig,
  CoinbaseWalletConfig,
  WalletConnectConfig,
];

type WalletContextType = {
  initialized: boolean;
  connecting?: BaseWalletConfig;
  isActive: boolean;
  account?: string;
  meta?: BaseWalletConfig;
  connector?: AbstractConnector;
  provider?: any;
  ethBalance?: BigNumber;
  showWalletsModal: () => void;
  connect: (connector: BaseWalletConfig, args?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
  event: EventEmitter;
};

const Context = createContext<WalletContextType>(InvariantContext('Web3WalletProvider'));

export function useWallet(): WalletContextType {
  return useContext(Context);
}

const Web3WalletProvider: FC = props => {
  const { activeNetwork } = useNetwork();
  const web3React = useWeb3React();
  const safeApps = useSafeAppsSDK();

  const [sessionProvider, setSessionProvider, removeSessionProvider] = useSessionStorage<string | undefined>(
    'wallet_provider',
  );

  const event = useMemo(() => new EventEmitter(), []);

  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<BaseWalletConfig | undefined>(undefined);
  const connectingRef = useRef<BaseWalletConfig | undefined>(connecting);
  connectingRef.current = connecting;
  const [activeMeta, setActiveMeta] = useState<BaseWalletConfig | undefined>();
  const [ethBalance, setEthBalance] = useState<BigNumber | undefined>();

  const [connectWalletModal, setConnectWalletModal] = useState<boolean>(false);
  const [unsupportedChainModal, setUnsupportedChainModal] = useState<boolean>(false);
  const [installMetaMaskModal, setInstallMetaMaskModal] = useState<boolean>(false);

  const prevConnectedAccount = useRef(web3React.account);

  if (prevConnectedAccount.current !== web3React.account) {
    prevConnectedAccount.current = web3React.account;
    event.emit('UPDATE_ACCOUNT', web3React.account);
  }

  const disconnect = useCallback(() => {
    web3React.deactivate();
    activeMeta?.onDisconnect?.(web3React.connector);
    setConnecting(undefined);
    setActiveMeta(undefined);
    setEthBalance(undefined);
    removeSessionProvider();
  }, [web3React, activeMeta, removeSessionProvider, setConnecting]);

  const connect = useCallback(
    async (walletConfig: BaseWalletConfig, args?: Record<string, any>): Promise<void> => {
      if (connectingRef.current) {
        return;
      }

      connectingRef.current = walletConfig;
      setConnecting(walletConfig);
      setConnectWalletModal(false);

      const connector = walletConfig.factory(activeNetwork, args);

      function onError(error: Error) {
        console.error('WalletProvider::Connect().onError', { error });

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
      const ethWeb3 = new Web3(web3React.library);

      ethWeb3.eth
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
      if (sessionProvider) {
        const walletConnector = WalletConnectors.find(c => c.id === sessionProvider);

        if (walletConnector) {
          await connect(walletConnector);
        }
      }

      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (safeApps.connected) {
      connect(GnosisSafeConfig).catch(Error);
    }
  }, [safeApps.connected]);

  const value: WalletContextType = {
    initialized,
    connecting,
    isActive: web3React.active,
    account: web3React.account ?? undefined,
    meta: activeMeta,
    connector: web3React.connector,
    provider: web3React.library,
    ethBalance,
    showWalletsModal: () => {
      setConnectWalletModal(true);
    },
    connect,
    disconnect,
    event,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
      {connectWalletModal && <ConnectWalletModal onCancel={() => setConnectWalletModal(false)} />}
      {installMetaMaskModal && <InstallMetaMaskModal onCancel={() => setInstallMetaMaskModal(false)} />}
      {unsupportedChainModal && <UnsupportedChainModal onCancel={() => setUnsupportedChainModal(false)} />}
    </Context.Provider>
  );
};

const WalletProvider: FC = props => {
  const { children } = props;

  return (
    <Web3ReactProvider getLibrary={library => library}>
      <SafeProvider>
        <Web3WalletProvider>{children}</Web3WalletProvider>
      </SafeProvider>
    </Web3ReactProvider>
  );
};

export default WalletProvider;
