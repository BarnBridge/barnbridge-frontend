import React from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider as EthWeb3Provider } from '@ethersproject/providers';

import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { SquarelinkConnector } from '@web3-react/squarelink-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { getRpcUrl } from 'web3/utils';

import MetamaskLogo from 'resources/svg/wallets/metamask-logo.svg';
import TrustWalletLogo from 'resources/svg/wallets/trustwallet-logo.svg';
import WalletConnectLogo from 'resources/svg/wallets/walletconnect-logo.svg';
import CoinbaseWalletLogo from 'resources/svg/wallets/coinbasewallet-logo.svg';
import LedgerLogo from 'resources/svg/wallets/ledger-logo.svg';
import TrezorLogo from 'resources/svg/wallets/trezor-logo.svg';
import FortmaticLogo from 'resources/svg/wallets/fortmatic-logo.svg';
import PortisLogo from 'resources/svg/wallets/portis-logo.svg';
import SquareLinkLogo from 'resources/svg/wallets/squarelink-logo.svg';
import TorusLogo from 'resources/svg/wallets/torus-logo.svg';
import AuthereumLogo from 'resources/svg/wallets/aethereum-logo.svg';

const CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);
const POLLING_INTERVAL = Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL);

export type Web3Connector = {
  id: string;
  name: string;
  logo: string;
  connector: AbstractConnector;
}

const InjectedWeb3Connector = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
});

export const Web3Connectors: Web3Connector[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: MetamaskLogo,
    connector: InjectedWeb3Connector,
  },
  {
    id: 'trustwallet',
    name: 'TrustWallet',
    logo: TrustWalletLogo,
    connector: InjectedWeb3Connector,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: WalletConnectLogo,
    connector: new WalletConnectConnector({
      rpc: {
        [CHAIN_ID]: getRpcUrl(),
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: POLLING_INTERVAL,
    }),
  },
  {
    id: 'walletlink',
    name: 'Coinbase Wallet',
    logo: CoinbaseWalletLogo,
    connector: new WalletLinkConnector({
      url: getRpcUrl(),
      appName: 'barnbridge',
    }),
  },
  {
    id: 'ledger',
    name: 'Ledger',
    logo: LedgerLogo,
    connector: new LedgerConnector({
      chainId: CHAIN_ID,
      url: getRpcUrl(),
      pollingInterval: POLLING_INTERVAL,
    }),
  },
  {
    id: 'trezor',
    name: 'Trezor',
    logo: TrezorLogo,
    connector: new TrezorConnector({
      chainId: CHAIN_ID,
      url: getRpcUrl(),
      pollingInterval: POLLING_INTERVAL,
      manifestEmail: 'dummy@abc.xyz',
      manifestAppUrl: 'https://8rg3h.csb.app/',
    }),
  },
  {
    id: 'fortmatic',
    name: 'Fortmatic',
    logo: FortmaticLogo,
    connector: new FortmaticConnector({
      chainId: CHAIN_ID,
      apiKey: process.env.REACT_APP_WEB3_FORTMATIC_API_KEY!,
    }),
  },
  {
    id: 'portis',
    name: 'Portis',
    logo: PortisLogo,
    connector: new PortisConnector({
      dAppId: process.env.REACT_APP_WEB3_PORTIS_APP_ID!,
      networks: [1, 100],
    }),
  },
  {
    id: 'squarelink',
    name: 'SquareLink',
    logo: SquareLinkLogo,
    connector: new SquarelinkConnector({
      clientId: process.env.REACT_APP_WEB3_SQUARELINK_CLIENT_ID!,
      networks: [1, 100],
    }),
  },
  {
    id: 'torus',
    name: 'Torus',
    logo: TorusLogo,
    connector: new TorusConnector({
      chainId: CHAIN_ID,
    }),
  },
  {
    id: 'authereum',
    name: 'Authereum',
    logo: AuthereumLogo,
    connector: new AuthereumConnector({
      chainId: CHAIN_ID,
    }),
  },
];

export type Web3ContextType = {
  connectors: Web3Connector[];
  isActive: boolean;
  connector?: Web3Connector;
  account?: string;
  network?: {
    chainId: number;
    name: string;
  };
  tried: boolean;
  connect: (connectorName: string) => Promise<void>;
  disconnect: () => void;
};

const Web3Context = React.createContext<Web3ContextType>({
  connectors: [],
  isActive: false,
  connector: undefined,
  account: undefined,
  network: undefined,
  tried: false,
  connect: () => Promise.resolve(),
  disconnect: () => null,
});

export function useWeb3(): Web3ContextType {
  return React.useContext(Web3Context);
}

const Web3ProviderInner: React.FunctionComponent = props => {
  const web3 = useWeb3React();
  const [tried, setTried] = React.useState<boolean>(false);
  const [network, setNetwork] = React.useState<any | undefined>();

  function connect(connectorId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const web3Connector = Web3Connectors.find(c => c.id === connectorId);

      if (!web3Connector) {
        return reject();
      }

      web3.activate(web3Connector.connector, reject).then(resolve);
    });
  }

  function disconnect() {
    web3.deactivate();
  }

  function activateInjected() {
    InjectedWeb3Connector.isAuthorized()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          return web3.activate(InjectedWeb3Connector, undefined, true)
            .catch(() => {
              setTried(true);
            });
        } else {
          setTried(true);
        }
      });
  }

  React.useEffect(() => {
    activateInjected();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!tried && web3.active) {
      setTried(true);
    }
  }, [tried, web3.active]);

  React.useEffect(() => {
    (web3.library as EthWeb3Provider)
      ?.detectNetwork()
      .then(network => {
        Object.assign(network, {
          name: ({
            1: 'Mainnet',
            4: 'Rinkeby',
          } as any)[network.chainId] ?? network.name,
        });
        setNetwork(network);
      });
  }, [web3.library]);

  const value = {
    get connectors() {
      return [...Web3Connectors];
    },
    get isActive() {
      return web3.active;
    },
    get connector() {
      if (!web3.connector) {
        return undefined;
      }

      return Web3Connectors.find(c => c.connector === web3.connector);
    },
    get account() {
      return web3.account ?? undefined;
    },
    network,
    tried,
    connect,
    disconnect,
  };

  return (
    <Web3Context.Provider value={value}>
      {props.children}
    </Web3Context.Provider>
  );
};

const Web3Provider: React.FunctionComponent = props => {
  function getLibrary(provider: any): EthWeb3Provider {
    const library = new EthWeb3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderInner>
        {props.children}
      </Web3ProviderInner>
    </Web3ReactProvider>
  );
};

export default Web3Provider;
