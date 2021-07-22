import { FC, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import EventEmitter from 'wolfy87-eventemitter';

import Icon, { IconNames } from 'components/custom/icon';
import { Modal } from 'components/custom/modal';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/generalProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { MainnetNetwork } from 'networks/mainnet';
import { MetamaskConnector } from 'wallets/connectors/metamask';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export const MainnetHttpsWeb3Provider = new Web3.providers.HttpProvider(MainnetNetwork.rpc.httpsUrl);

export const WEB3_ERROR_VALUE = 3.9638773911973445e75;

export type Web3ContextType = {
  event: EventEmitter;
  blockNumber: number | undefined;
  activeProvider: any;
  showNetworkSelect: () => void;
  tryCall(to: string, from: string, data: string, value: string): any;
  getEtherscanTxUrl(txHash?: string): string | undefined;
  getEtherscanAddressUrl(address?: string): string | undefined;
};

const Context = createContext<Web3ContextType>(InvariantContext('Web3Provider'));

export function useWeb3(): Web3ContextType {
  return useContext(Context);
}

const Web3Provider: FC = props => {
  const { children } = props;

  const { windowState } = useGeneral();
  const { networks, activeNetwork, changeNetwork, findNetwork, findNetworkByChainId, defaultNetwork } = useNetwork();
  const wallet = useWallet();

  const event = useMemo(() => new EventEmitter(), []);

  const [blockNumber, setBlockNumber] = useState<number | undefined>();
  const [networkSelectVisible, showNetworkSelect] = useState(false);

  const httpsWeb3 = useMemo(() => {
    const provider = new Web3.providers.HttpProvider(activeNetwork.rpc.httpsUrl);
    return new Web3(provider);
  }, [activeNetwork]);

  const wssWeb3 = useMemo(() => {
    const provider = new Web3.providers.WebsocketProvider(activeNetwork.rpc.wssUrl);
    return new Web3(provider);
  }, [activeNetwork]);

  function tryCall(to: string, from: string, data: string, value: string): any {
    return httpsWeb3.eth.call({
      to,
      from,
      data,
      value,
    });
  }

  useEffect(() => {
    if (wallet.connector instanceof MetamaskConnector) {
      wallet.connector.getProvider().then(provider => {
        provider.on('chainChanged', (chainId: number) => {
          const network = findNetworkByChainId(Number(chainId)) ?? defaultNetwork;
          changeNetwork(network.id);
        });
      });
    }
  }, [wallet.connector]);

  const switchNetwork = useCallback(
    async (networkId: string) => {
      const network = findNetwork(networkId);

      if (!network) {
        return;
      }

      let canSetNetwork = true;

      if (wallet.connector instanceof MetamaskConnector && network.metamaskChain) {
        try {
          const error = await wallet.connector.switchChain({
            chainId: network.metamaskChain.chainId,
          });

          if (error) {
            canSetNetwork = false;
          }
        } catch (e) {
          canSetNetwork = false;

          if (e.code === 4902) {
            await wallet.connector.addChain(network.metamaskChain);
          }
        }
      }

      if (canSetNetwork) {
        changeNetwork(network.id);
      }
    },
    [wallet.connector],
  );

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

  const value: Web3ContextType = {
    event,
    blockNumber,
    activeProvider: httpsWeb3,
    showNetworkSelect: () => {
      showNetworkSelect(true);
    },
    tryCall,
    getEtherscanTxUrl,
    getEtherscanAddressUrl,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {networkSelectVisible && (
        <Modal
          heading={
            <Text type="h3" weight="bold" color="primary">
              Select network
            </Text>
          }
          closeHandler={showNetworkSelect}>
          <div className="flex flow-row row-gap-16 p-24">
            {networks.map(network => (
              <button
                key={network.id}
                className="button-ghost-monochrome p-16"
                style={{ height: 'inherit' }}
                onClick={() => switchNetwork(network.id)}>
                <Icon name={network.meta.logo as IconNames} width={40} height={40} className="mr-12" />
                <div className="flex flow-row align-start">
                  <Text type="p1" weight="semibold" color="primary">
                    {network.meta.name}
                  </Text>
                  {network === activeNetwork && (
                    <Text type="small" weight="semibold" color="secondary">
                      Connected
                    </Text>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </Context.Provider>
  );
};

export default Web3Provider;
