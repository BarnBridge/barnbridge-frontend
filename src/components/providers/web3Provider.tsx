import { FC, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import EventEmitter from 'wolfy87-eventemitter';

import { useGeneral } from 'components/providers/generalProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export const MainnetHttpsWeb3Provider = new Web3.providers.HttpProvider(
  'https://mainnet.infura.io/v3/6c58700fe84943eb83c4cd5c23dff3d8',
);

export const WEB3_ERROR_VALUE = 3.9638773911973445e75;

export type Web3ContextType = {
  web3: Web3;
  blockNumber: number | undefined;
  activeProvider: any;
  tryCall(to: string, from: string, data: string, value: string): any;
  getEtherscanTxUrl(txHash?: string): string | undefined;
  getEtherscanAddressUrl(address?: string): string | undefined;
  event: EventEmitter;
};

const Context = createContext<Web3ContextType>(InvariantContext<Web3ContextType>('Web3Provider'));

export function useWeb3(): Web3ContextType {
  return useContext(Context);
}

const Web3Provider: FC = props => {
  const { children } = props;

  const { windowState } = useGeneral();
  const { activeNetwork } = useNetwork();
  const wallet = useWallet();

  const event = useMemo(() => new EventEmitter(), []);

  const [blockNumber, setBlockNumber] = useState<number | undefined>();

  const httpsWeb3 = useMemo(() => {
    const url = `${activeNetwork.rpc.httpsUrl}/${activeNetwork.rpc.key}`;
    const provider = new Web3.providers.HttpProvider(url);
    return new Web3(provider);
  }, [activeNetwork]);

  const wssWeb3 = useMemo(() => {
    const url = `${activeNetwork.rpc.wssUrl}/${activeNetwork.rpc.key}`;
    const provider = new Web3.providers.WebsocketProvider(url);
    return new Web3(provider);
  }, [activeNetwork]);

  const activeProvider = useMemo(() => {
    return wallet.isActive ? wallet.provider : httpsWeb3; //??
  }, [wallet.isActive, wallet.provider, httpsWeb3]);

  const web3 = useMemo(() => {
    return new Web3(activeProvider);
  }, [activeProvider]);

  const prevActiveProvider = useRef(activeProvider);

  if (prevActiveProvider.current !== activeProvider) {
    prevActiveProvider.current = activeProvider;
    event.emit('UPDATE_PROVIDER', activeProvider);
  }

  function tryCall(to: string, from: string, data: string, value: string): any {
    return web3.eth.call({
      to,
      from,
      data,
      value,
    });
  }

  useEffect(() => {
    if (!windowState.isVisible) {
      return undefined;
    }

    wssWeb3.eth
      .getBlockNumber()
      .then(value => {
        if (value) {
          setBlockNumber(value);
        }
      })
      .catch(Error);

    const subscription = wssWeb3.eth.subscribe('newBlockHeaders');

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

  function getEtherscanTxUrl(txHash?: string): string | undefined {
    return txHash ? `${activeNetwork.explorer.url}/tx/${txHash}` : undefined;
  }

  function getEtherscanAddressUrl(address?: string): string | undefined {
    return address ? `${activeNetwork.explorer.url}/address/${address}` : undefined;
  }

  const value = {
    web3,
    blockNumber,
    activeProvider,
    tryCall,
    getEtherscanTxUrl,
    getEtherscanAddressUrl,
    event,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Web3Provider;
