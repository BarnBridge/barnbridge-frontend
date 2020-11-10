import React from 'react';
import { useSessionStorage } from 'react-use-storage';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Web3Provider as EthWeb3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { getHttpsRpcUrl, getNetworkName, getWSRpcUrl } from 'web3/utils';

import MetamaskLogo from 'resources/svg/wallets/metamask-logo.svg';
import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';
import CoinbaseWalletLogo from 'resources/svg/wallets/coinbasewallet-logo.svg';
import LedgerLogo from 'resources/svg/wallets/ledger-logo.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';
import PortisLogo from 'resources/svg/wallets/portis-logo.svg';

const WEB3_CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);
const WEB3_POLLING_INTERVAL = Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL);
const WEB3_PORTIS_APP_ID = String(process.env.REACT_APP_WEB3_PORTIS_APP_ID);
const STORAGE_WALLET_PROVIDER = 'wallet_provider';

export type WalletConnector = {
  id: string;
  name: string;
  logo: string;
  connector: AbstractConnector;
  enabled: boolean;
}

const InjectedWalletConnector = new InjectedConnector({
  supportedChainIds: [WEB3_CHAIN_ID],
});

export const WalletConnectors: WalletConnector[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: MetamaskLogo,
    connector: InjectedWalletConnector,
    enabled: true,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: WalletConnectLogo,
    connector: new WalletConnectConnector({
      rpc: {
        [WEB3_CHAIN_ID]: getWSRpcUrl(),
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: WEB3_POLLING_INTERVAL,
    }),
    enabled: true,
  },
  {
    id: 'ledger',
    name: 'Ledger',
    logo: LedgerLogo,
    connector: new LedgerConnector({
      chainId: WEB3_CHAIN_ID,
      url: getHttpsRpcUrl(),
      pollingInterval: WEB3_POLLING_INTERVAL,
    }),
    enabled: false,
  },
  {
    id: 'trezor',
    name: 'Trezor',
    logo: TrezorLogo,
    connector: new TrezorConnector({
      chainId: WEB3_CHAIN_ID,
      url: getWSRpcUrl(),
      pollingInterval: WEB3_POLLING_INTERVAL,
      manifestEmail: 'dummy@abc.xyz',
      manifestAppUrl: 'https://8rg3h.csb.app/',
    }),
    enabled: false,
  },
  {
    id: 'walletlink',
    name: 'Coinbase Wallet',
    logo: CoinbaseWalletLogo,
    connector: new WalletLinkConnector({
      url: getWSRpcUrl(),
      appName: 'barnbridge',
    }),
    enabled: false,
  },
  {
    id: 'portis',
    name: 'Portis',
    logo: PortisLogo,
    connector: new PortisConnector({
      dAppId: WEB3_PORTIS_APP_ID,
      networks: [1, 100],
    }),
    enabled: false,
  },
];

type WalletData = {
  initialized: boolean;
  isActive: boolean;
  connector?: WalletConnector;
  account?: string;
  networkId: number;
  networkName: string;
};

type WalletMethods = {
  connect: (connectorName: string) => Promise<void>;
  disconnect: () => void;
};

export type Wallet = WalletData & WalletMethods;

const WalletContext = React.createContext<Wallet>({
  initialized: false,
  isActive: false,
  account: undefined,
  connector: undefined,
  networkId: WEB3_CHAIN_ID,
  networkName: '',
  connect: () => Promise.reject(),
  disconnect: () => undefined,
});

export function useWallet(): Wallet {
  return React.useContext(WalletContext);
}

const WalletProvider: React.FunctionComponent = props => {
  const [authProvider, setAuthProvider, remAuthProvider] = useSessionStorage<string | undefined>(STORAGE_WALLET_PROVIDER);

  const web3 = useWeb3React<EthWeb3Provider>();
  const web3Ref = React.useRef<Web3ReactContextInterface<EthWeb3Provider>>(web3);
  web3Ref.current = web3;

  const [initialized, setInitialized] = React.useState<boolean>(false);

  const connect = React.useCallback((connectorId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const walletConnector = WalletConnectors.find(c => c.id === connectorId);

      if (!walletConnector) {
        return reject();
      }

      web3Ref.current.activate(walletConnector.connector, reject)
        .then(() => setAuthProvider(walletConnector.id))
        .then(resolve);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const disconnect = React.useCallback(() => {
    remAuthProvider();
    web3Ref.current.deactivate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAsyncEffect(async () => {
    if (authProvider) {
      const walletConnector = WalletConnectors.find(c => c.id === authProvider);

      if (walletConnector?.connector instanceof InjectedConnector) {
        const connector = walletConnector?.connector as InjectedConnector;

        try {
          const isAuthorized = await connector.isAuthorized();

          if (isAuthorized) {
            await connect(walletConnector.id);
          }
        } catch (e) {
        }
      }
    }

    setInitialized(true);
  }, []);

  const value = React.useMemo<Wallet>(() => ({
    initialized,
    get isActive() {
      return Boolean(web3Ref.current.active);
    },
    get account() {
      return web3Ref.current.account ?? undefined;
    },
    get connector() {
      return WalletConnectors.find(c => c.connector === web3Ref.current.connector);
    },
    get networkId(): number {
      return web3Ref.current.chainId ?? WEB3_CHAIN_ID;
    },
    get networkName(): string {
      return getNetworkName(web3Ref.current.chainId);
    },
    connect,
    disconnect,
  }), [
    initialized,
    connect,
    disconnect,
  ]);

  return (
    <WalletContext.Provider value={value}>
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
