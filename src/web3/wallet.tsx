import React from 'react';
import { useSessionStorage } from 'react-use-storage';
import * as Antd from 'antd';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider as EthWeb3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { getHttpsRpcUrl, getNetworkName } from 'web3/utils';
import { AdvancedPromise, createPromise } from 'utils/advancedPromise';

import MetamaskLogo from 'resources/svg/wallets/metamask-logo.svg';
import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';
import CoinbaseWalletLogo from 'resources/svg/wallets/coinbasewallet-logo.svg';
import LedgerLogo from 'resources/svg/wallets/ledger-logo.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';
import PortisLogo from 'resources/svg/wallets/portis-logo.svg';
import UnsupportedChainModal from 'components/unsupported-chain-modal';
import ConnectWalletModal from 'components/connect-wallet-modal';
import InstallMetaMaskModal from 'components/install-metamask-modal';
import LedgerDerivationPathModal from 'components/ledger-deriviation-path-modal';

const WEB3_CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);
const WEB3_POLLING_INTERVAL = Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL);
const WEB3_PORTIS_APP_ID = String(process.env.REACT_APP_WEB3_PORTIS_APP_ID);
const WEB3_WALLET_CONNECT_BRIDGE = String(process.env.REACT_APP_WEB3_WALLET_CONNECT_BRIDGE);
const WEB3_COINBASE_WALLET_APP_NAME = String(process.env.REACT_APP_WEB3_COINBASE_WALLET_APP_NAME);
const WEB3_TREZOR_EMAIL = String(process.env.REACT_APP_WEB3_TREZOR_EMAIL);
const WEB3_TREZOR_APP_URL = String(process.env.REACT_APP_WEB3_TREZOR_APP_URL);

const STORAGE_WALLET_PROVIDER = 'wallet_provider';

export type WalletConnector = {
  id: string;
  name: string;
  logo: string;
  connector: AbstractConnector;
  enabled: boolean;
  promise?: AdvancedPromise<any>;
}

const LedgerWalletConnector: WalletConnector = {
  id: 'ledger',
  name: 'Ledger',
  logo: LedgerLogo,
  connector: new LedgerConnector({
    chainId: WEB3_CHAIN_ID,
    url: getHttpsRpcUrl(WEB3_CHAIN_ID),
    pollingInterval: WEB3_POLLING_INTERVAL,
  }),
  enabled: true,
};

export const WalletConnectors: WalletConnector[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: MetamaskLogo,
    connector: new InjectedConnector({
      supportedChainIds: [WEB3_CHAIN_ID],
    }),
    enabled: true,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: WalletConnectLogo,
    connector: new WalletConnectConnector({
      rpc: {
        [WEB3_CHAIN_ID]: getHttpsRpcUrl(WEB3_CHAIN_ID),
      },
      qrcode: true,
      bridge: WEB3_WALLET_CONNECT_BRIDGE,
      pollingInterval: WEB3_POLLING_INTERVAL,
    }),
    enabled: false,
  },
  LedgerWalletConnector,
  {
    id: 'trezor',
    name: 'Trezor',
    logo: TrezorLogo,
    connector: new TrezorConnector({
      chainId: WEB3_CHAIN_ID,
      url: getHttpsRpcUrl(WEB3_CHAIN_ID),
      pollingInterval: WEB3_POLLING_INTERVAL,
      manifestEmail: WEB3_TREZOR_EMAIL,
      manifestAppUrl: WEB3_TREZOR_APP_URL,
      config: {
        networkId: WEB3_CHAIN_ID,
      },
    }),
    enabled: true,
  },
  {
    id: 'walletlink',
    name: 'Coinbase Wallet',
    logo: CoinbaseWalletLogo,
    connector: new WalletLinkConnector({
      url: getHttpsRpcUrl(WEB3_CHAIN_ID),
      appName: WEB3_COINBASE_WALLET_APP_NAME,
    }),
    enabled: true,
  },
  {
    id: 'portis',
    name: 'Portis',
    logo: PortisLogo,
    connector: new PortisConnector({
      networks: [WEB3_CHAIN_ID],
      dAppId: WEB3_PORTIS_APP_ID,
    }),
    enabled: true,
  },
];

type WalletData = {
  initialized: boolean;
  isActive: boolean;
  networkId: number;
  networkName: string;
  connector?: WalletConnector;
  account?: string;
};

export type Wallet = WalletData & {
  connect: (connectorName: string) => Promise<void>;
  disconnect: () => void;
  showWalletModal: () => void;
};

const WalletContext = React.createContext<Wallet>({
  initialized: false,
  isActive: false,
  networkId: WEB3_CHAIN_ID,
  networkName: getNetworkName(WEB3_CHAIN_ID),
  connector: undefined,
  account: undefined,
  connect: () => Promise.reject(),
  disconnect: () => undefined,
  showWalletModal: () => undefined,
});

export function useWallet(): Wallet {
  return React.useContext(WalletContext);
}

const WalletProvider: React.FunctionComponent = props => {
  const [authProvider, setAuthProvider, remAuthProvider] = useSessionStorage<string | undefined>(STORAGE_WALLET_PROVIDER);

  const web3 = useWeb3React<EthWeb3Provider>();

  const [initialized, setInitialized] = React.useState<boolean>(false);

  const [connectWalletVisible, setConnectWalletVisible] = React.useState<boolean>(false);
  const [unsupportedChainVisible, setUnsupportedChainVisible] = React.useState<boolean>(false);
  const [installMetaMaskVisible, setInstallMetaMaskVisible] = React.useState<boolean>(false);
  const [ledgerDerivationPathVisible, setLedgerDerivationPathVisible] = React.useState<boolean>(false);

  function handleSwitchWallet() {
    setUnsupportedChainVisible(false);
    setConnectWalletVisible(true);
  }

  function handleConnectorSelect(connector: WalletConnector) {
    setConnectWalletVisible(false);
    connect(connector.id).catch(e => e);
  }

  function handleLedgerConnect(derivationPath: string) {
    setLedgerDerivationPathVisible(false);

    const ledgerSubProvider = (LedgerWalletConnector.connector as any).provider?._providers?.[0];

    if (ledgerSubProvider) {
      ledgerSubProvider.setPath(derivationPath);
    } else {
      (LedgerWalletConnector.connector as any).baseDerivationPath = derivationPath;
    }

    LedgerWalletConnector.promise?.resolve();
  }

  const showWalletModal = React.useCallback(() => {
    setConnectWalletVisible(true);
  }, []);

  const disconnect = React.useCallback(() => {
    remAuthProvider();
    web3.deactivate();

    if (authProvider) {
      const walletConnector = WalletConnectors.find(c => c.id === authProvider);

      if (walletConnector) {
        if (walletConnector.id === 'walletlink') {
          (walletConnector.connector as WalletLinkConnector).close();
        }
      }
    }
  }, [web3, authProvider]); // eslint-disable-line react-hooks/exhaustive-deps

  const connect = React.useCallback((connectorId: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const walletConnector = WalletConnectors.find(c => c.id === connectorId);

      if (!walletConnector) {
        return reject();
      }

      const onError = (err: Error) => {
        console.log('-------- ERROR:', { err });

        if (err.name === 'NoEthereumProviderError') {
          setInstallMetaMaskVisible(true);
        } else if (err.name === 'UnsupportedChainIdError') {
          setUnsupportedChainVisible(true);
          disconnect();
        } else if ([
          'TransportError',
          'TransportStatusError',
        ].includes(err.name)) {
          Antd.notification.error({
            message: err.message,
          });
        } else if (walletConnector.id === 'ledger' && [
          'MULTIPLE_OPEN_CONNECTIONS_DISALLOWED',
          'TOO_OLD_LEDGER_FIRMWARE',
        ].includes(err.message)) {
          Antd.notification.error({
            message: err.message,
          });
        } else if (walletConnector.id === 'trezor') {
          if (err.message === 'Cancelled') {
            Antd.notification.error({
              message: 'Trezor connection has been rejected.',
            });
            disconnect();
          }
        }

        reject(err);
      };

      const onSuccess = () => {
        setAuthProvider(walletConnector.id);
        resolve();
      };

      if (walletConnector === LedgerWalletConnector) {
        setLedgerDerivationPathVisible(true);
        LedgerWalletConnector.promise = createPromise();
        await LedgerWalletConnector.promise;
      }

      web3.activate(walletConnector.connector, undefined, true)
        .then(onSuccess)
        .catch(onError);
    });
  }, [web3, disconnect]); // eslint-disable-line react-hooks/exhaustive-deps

  useAsyncEffect(async () => {
    if (authProvider) {
      try {
        const walletConnector = WalletConnectors.find(c => c.id === authProvider);

        if (walletConnector?.connector instanceof InjectedConnector) {
          const connector = walletConnector?.connector as InjectedConnector;

          const isAuthorized = await connector.isAuthorized();

          if (isAuthorized) {
            await connect(walletConnector.id);
          }
        } else if (walletConnector) {
          await connect(walletConnector.id);
        }
      } catch (e) {
        //
      }
    }

    setInitialized(true);
  }, []);

  const value = React.useMemo<Wallet>(() => ({
    initialized,
    get isActive() {
      return web3.active;
    },
    get account() {
      return web3.account ?? undefined;
    },
    get connector() {
      return WalletConnectors.find(c => c.connector === web3.connector);
    },
    get networkId(): number {
      return web3.chainId ?? WEB3_CHAIN_ID;
    },
    get networkName(): string {
      return getNetworkName(web3.chainId);
    },
    showWalletModal,
    connect,
    disconnect,
  }), [
    web3,
    initialized,
    showWalletModal,
    connect,
    disconnect,
  ]);

  return (
    <WalletContext.Provider value={value}>
      <ConnectWalletModal
        visible={connectWalletVisible}
        connectors={WalletConnectors}
        onCancel={() => setConnectWalletVisible(false)}
        onConnectorSelect={handleConnectorSelect} />
      <UnsupportedChainModal
        visible={unsupportedChainVisible}
        onCancel={() => setUnsupportedChainVisible(false)}
        onSwitchWallet={handleSwitchWallet} />
      <InstallMetaMaskModal
        visible={installMetaMaskVisible}
        onCancel={() => setInstallMetaMaskVisible(false)} />
      <LedgerDerivationPathModal
        visible={ledgerDerivationPathVisible}
        onCancel={() => {
          setLedgerDerivationPathVisible(false);
          LedgerWalletConnector.promise?.reject();
        }}
        onConnect={handleLedgerConnect} />
      {props.children}
    </WalletContext.Provider>
  );
};

function getWeb3Library(provider: any): EthWeb3Provider {
  const library = new EthWeb3Provider(provider);
  library.pollingInterval = WEB3_POLLING_INTERVAL;
  return library;
}

const Web3WalletProvider: React.FunctionComponent = props => {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <WalletProvider>
        {props.children}
      </WalletProvider>
    </Web3ReactProvider>
  );
};

export default Web3WalletProvider;
