import React from 'react';
import Web3 from 'web3';

import { useWindowState } from 'components/providers/window-state';

const CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);
export const WEB3_RPC_WSS_URL = String(process.env.REACT_APP_WEB3_RPC_WSS_URL);
export const WEB3_RPC_HTTPS_URL = String(process.env.REACT_APP_WEB3_RPC_HTTPS_URL);

export const WEB3_WSS_PROVIDER = new Web3.providers.WebsocketProvider(WEB3_RPC_WSS_URL);
export const WEB3_HTTPS_PROVIDER = new Web3.providers.HttpProvider(WEB3_RPC_HTTPS_URL);
export const DEFAULT_CONTRACT_PROVIDER = WEB3_HTTPS_PROVIDER;

export const HttpsWeb3 = new Web3(WEB3_HTTPS_PROVIDER);
export const WssWeb3 = new Web3(WEB3_WSS_PROVIDER);
export const EthWeb3 = HttpsWeb3;
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
  chainId: CHAIN_ID,
  web3: HttpsWeb3,
  blockNumber: undefined,
  networkName: getNetworkName(CHAIN_ID),
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
      return;
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

  return <EthWeb3Context.Provider value={value}>{children}</EthWeb3Context.Provider>;
};

export default EthWeb3Provider;
