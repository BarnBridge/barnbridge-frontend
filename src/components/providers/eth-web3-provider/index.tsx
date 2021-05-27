import React from 'react';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import Web3 from 'web3';

import { useWindowState } from 'components/providers/window-state';
import config from 'config';

export const HttpsWeb3Provider = new Web3.providers.HttpProvider(config.web3.rpc.httpsUrl);
export const WssWeb3Provider = new Web3.providers.WebsocketProvider(config.web3.rpc.wssUrl);
export const MainnetHttpsWeb3Provider = new Web3.providers.HttpProvider(
  'https://mainnet.infura.io/v3/6c58700fe84943eb83c4cd5c23dff3d8',
);
export const DEFAULT_WEB3_PROVIDER = HttpsWeb3Provider;

export const HttpsWeb3 = new Web3(HttpsWeb3Provider);
export const WssWeb3 = new Web3(WssWeb3Provider);
export const DEFAULT_WEB3 = HttpsWeb3;

export const WEB3_ERROR_VALUE = 3.9638773911973445e75;

export function getNetworkName(chainId: number | undefined): string {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 4:
      return 'Rinkeby';
    case 42:
      return 'Kovan';
    default:
      return '-';
  }
}

export type EthWeb3ContextType = {
  chainId: number;
  web3: Web3;
  blockNumber?: number;
  networkName: string;
};

const InitialContextValue = {
  chainId: config.web3.chainId,
  web3: HttpsWeb3,
  blockNumber: undefined,
  networkName: getNetworkName(config.web3.chainId),
};

const EthWeb3Context = React.createContext<EthWeb3ContextType>(InitialContextValue);

export function useEthWeb3(): EthWeb3ContextType {
  return React.useContext(EthWeb3Context);
}

const EthWeb3Provider: React.FC = props => {
  const { children } = props;

  const windowState = useWindowState();
  const [blockNumber, setBlockNumber] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (!windowState.isVisible) {
      return undefined;
    }

    WssWeb3.eth
      .getBlockNumber()
      .then(value => {
        if (value) {
          setBlockNumber(value);
        }
      })
      .catch(Error);

    const subscription = WssWeb3.eth.subscribe('newBlockHeaders');

    subscription
      .on('data', blockHeader => {
        if (blockHeader && blockHeader.number) {
          setBlockNumber(blockHeader.number);
        }
      })
      .on('error', () => {
        setTimeout(() => {
          subscription.subscribe();
        }, 1_000);
      });

    return () => {
      subscription.unsubscribe?.();
    };
  }, [windowState.isVisible]);

  const value = React.useMemo(
    () => ({
      ...InitialContextValue,
      blockNumber,
    }),
    [blockNumber],
  );

  return (
    <EthWeb3Context.Provider value={value}>
      <SafeProvider>{children}</SafeProvider>
    </EthWeb3Context.Provider>
  );
};

export default EthWeb3Provider;
