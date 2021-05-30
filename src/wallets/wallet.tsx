import React, { FC, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import { Web3Provider } from '@ethersproject/providers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { HttpsWeb3, getNetworkName } from 'components/providers/eth-web3-provider';
import config from 'config';
import ConnectWalletModal from 'wallets/components/connect-wallet-modal';
import InstallMetaMaskModal from 'wallets/components/install-metamask-modal';
import UnsupportedChainModal from 'wallets/components/unsupported-chain-modal';
import CoinbaseWalletConfig from 'wallets/connectors/coinbase';
import GnosisSafeConfig from 'wallets/connectors/gnosis-safe';
import LedgerWalletConfig from 'wallets/connectors/ledger';
import MetaMaskWalletConfig from 'wallets/connectors/metamask';
import PortisWalletConfig from 'wallets/connectors/portis';
import TrezorWalletConfig from 'wallets/connectors/trezor';
import WalletConnectConfig from 'wallets/connectors/wallet-connect';

import { WalletConnector } from 'wallets/types';

export const WalletConnectors: WalletConnector[] = [
  MetaMaskWalletConfig,
  LedgerWalletConfig,
  PortisWalletConfig,
  TrezorWalletConfig,
  CoinbaseWalletConfig,
  WalletConnectConfig,
];

type WalletData = {
  initialized: boolean;
  connecting?: WalletConnector;
  isActive: boolean;
  account?: string;
  networkId?: number;
  networkName?: string;
  connector?: WalletConnector;
  provider?: any;
  ethBalance?: BigNumber;
};

export type Wallet = WalletData & {
  showWalletsModal: () => void;
  connect: (connector: WalletConnector, args?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<Wallet>({
  initialized: false,
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
  return useContext(WalletContext);
}

const WalletProvider: FC = props => {
  const web3React = useWeb3React();
  const safeApps = useSafeAppsSDK();

  const [sessionProvider, setSessionProvider, removeSessionProvider] = useSessionStorage<string | undefined>(
    'wallet_provider',
  );

  const [initialized, setInitialized] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<WalletConnector | undefined>(undefined);
  const connectingRef = useRef<WalletConnector | undefined>(connecting);
  connectingRef.current = connecting;
  const [activeConnector, setActiveConnector] = useState<WalletConnector | undefined>();
  const [activeProvider, setActiveProvider] = useState<any | undefined>();
  const [ethBalance, setEthBalance] = useState<BigNumber | undefined>();
  const [walletsModal, setWalletsModal] = useState<boolean>(false);
  const [unsupportedChainModal, setUnsupportedChainModal] = useState<boolean>(false);
  const [installMetaMaskModal, setInstallMetaMaskModal] = useState<boolean>(false);

  const disconnect = useCallback(() => {
    web3React.deactivate();
    activeConnector?.onDisconnect?.(web3React.connector);
    setConnecting(undefined);
    setActiveConnector(undefined);
    setActiveProvider(undefined);
    setEthBalance(undefined);
    removeSessionProvider();
  }, [web3React, activeConnector, removeSessionProvider, setConnecting]);

  const connect = useCallback(
    async (walletConnector: WalletConnector, args?: Record<string, any>): Promise<void> => {
      if (connectingRef.current) {
        return;
      }

      connectingRef.current = walletConnector;
      setConnecting(walletConnector);
      setWalletsModal(false);

      const connector = walletConnector.factory(config.web3.chainId, args);

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

      await web3React.activate(connector, undefined, true).then(onSuccess).catch(onError);

      setConnecting(undefined);
    },
    [web3React, connectingRef, setConnecting, setSessionProvider, disconnect],
  );

  useEffect(() => {
    if (web3React.account) {
      HttpsWeb3.eth
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
    (async () => {
      if (safeApps.connected) {
        await connect(GnosisSafeConfig);
      }
    })();
  }, [safeApps.connected]);

  const value = useMemo<Wallet>(
    () => ({
      initialized,
      connecting,
      isActive: web3React.active,
      account: web3React.account ?? undefined,
      networkId: web3React.chainId,
      networkName: getNetworkName(web3React.chainId),
      connector: activeConnector,
      provider: activeProvider,
      ethBalance,
      showWalletsModal: () => {
        setWalletsModal(true);
      },
      connect,
      disconnect,
    }),
    [web3React, initialized, connecting, activeConnector, activeProvider, ethBalance, disconnect, connect],
  );

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
  library.pollingInterval = config.web3.poolingInterval;
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
