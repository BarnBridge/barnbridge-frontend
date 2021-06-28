import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use-storage';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import Web3 from 'web3';
import { HttpProvider } from 'web3-core';

import Icon, { IconNames } from 'components/custom/icon';
import { Modal } from 'components/custom/modal';
import { Text } from 'components/custom/typography';
import { useWindowState } from 'components/providers/window-state';
import { config } from 'config';
import { DefaultNetwork, KnownNetworks, NetworkMeta } from 'networks';
import { metamask_AddEthereumChain, metamask_SwitchEthereumChain } from 'wallets/connectors/metamask';

export const MainnetHttpsWeb3Provider = new Web3.providers.HttpProvider(
  'https://mainnet.infura.io/v3/6c58700fe84943eb83c4cd5c23dff3d8',
);

export const WssWeb3Provider = new Web3.providers.WebsocketProvider(
  `wss://mainnet.infura.io/ws/v3/${config.web3.rpcKey}`,
);
export const WssWeb3 = new Web3(WssWeb3Provider);

export const WEB3_ERROR_VALUE = 3.9638773911973445e75;

export let DefaultWeb3Provider: HttpProvider;
export let DefaultWeb3: Web3;

export function setProviderByUrl(rpcUrl: string) {
  DefaultWeb3Provider = new Web3.providers.HttpProvider(rpcUrl);
  DefaultWeb3 = new Web3(DefaultWeb3Provider);
}

export type EthWeb3ContextType = {
  web3: Web3;
  blockNumber?: number;
  activeNetwork?: NetworkMeta;
  activeProvider?: any;
  selectNetwork: (networkId?: string) => void;
  showNetworkSelect: () => void;
  setActiveProvider: (provider: any) => void;
  getTxUrl: (txHash: string) => string | undefined;
  getAccountUrl: (account: string) => string | undefined;
};

const Context = createContext<EthWeb3ContextType>({
  web3: DefaultWeb3!,
  blockNumber: undefined,
  activeNetwork: undefined,
  activeProvider: undefined,
  selectNetwork: () => undefined,
  showNetworkSelect: () => undefined,
  setActiveProvider: () => undefined,
  getTxUrl: () => undefined,
  getAccountUrl: () => undefined,
});

export function useEthWeb3(): EthWeb3ContextType {
  return useContext(Context);
}

const EthWeb3Provider: FC = props => {
  const { children } = props;

  const windowState = useWindowState();
  const [storedNetwork, setStoredNetwork] = useLocalStorage('bb_last_network', DefaultNetwork.id);
  const [blockNumber, setBlockNumber] = useState<number | undefined>();
  const [activeNetwork, setNetwork] = useState<NetworkMeta | undefined>();
  const [activeProvider, setActiveProvider] = useState<any>(DefaultWeb3Provider);
  const [networkSelectVisible, showNetworkSelect] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const network = KnownNetworks.find(ntw => ntw.id === storedNetwork);

    if (network) {
      setNetwork(network);
    }
  }, [storedNetwork]);

  async function selectNetwork(networkId: string = DefaultNetwork.id) {
    const network = KnownNetworks.find(ntw => ntw.id === networkId);

    let canSetNetwork = true;

    if (network && activeProvider) {
      if (activeProvider.isMetaMask && network.metamaskChain) {
        try {
          const error = await metamask_SwitchEthereumChain(activeProvider, {
            chainId: network.metamaskChain.chainId,
          });

          if (error) {
            canSetNetwork = false;
          }
        } catch (e) {
          canSetNetwork = false;

          if (e.code === 4902) {
            await metamask_AddEthereumChain(activeProvider, network.metamaskChain);
          }
        }
      }

      if (canSetNetwork) {
        if (storedNetwork !== network.id) {
          setStoredNetwork(network.id);
          window.location.reload();
        }
      }
    }
  }

  function getTxUrl(txHash?: string): string | undefined {
    if (!txHash || !activeNetwork?.explorerUrl) {
      return;
    }

    return `${activeNetwork.explorerUrl}/tx/${txHash}`;
  }

  function getAccountUrl(address?: string): string | undefined {
    if (!address || !activeNetwork?.explorerUrl) {
      return;
    }

    return `${activeNetwork.explorerUrl}/address/${address}`;
  }

  const value = {
    web3: DefaultWeb3,
    blockNumber,
    activeNetwork,
    activeProvider,
    selectNetwork,
    showNetworkSelect: () => {
      showNetworkSelect(true);
    },
    setActiveProvider: (provider: any) => {
      setActiveProvider(provider);
    },
    getTxUrl,
    getAccountUrl,
  };

  return (
    <Context.Provider value={value}>
      <SafeProvider>{children}</SafeProvider>
      {networkSelectVisible && (
        <Modal heading="Select network" closeHandler={showNetworkSelect}>
          <div className="flex flow-row row-gap-16 p-24">
            {KnownNetworks.map(network => (
              <button
                key={network.id}
                className="button-ghost-monochrome p-16"
                style={{ height: 'inherit' }}
                onClick={() => {
                  showNetworkSelect(false);
                  selectNetwork(network.id);
                }}>
                <Icon name={network.logo as IconNames} width={40} height={40} className="mr-12" />
                <div className="flex flow-row align-start">
                  <Text type="p1" weight="semibold" color="primary">
                    {network.name}
                  </Text>
                  {activeNetwork?.id === network.id && (
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

export default EthWeb3Provider;
