import { FC, createContext, useCallback, useContext, useMemo, useState } from 'react';

import Icon, { IconNames } from 'components/custom/icon';
import { Modal } from 'components/custom/modal';
import { Text } from 'components/custom/typography';
import { GoerliNetwork } from 'networks/goerli';
import { KovanNetwork } from 'networks/kovan';
import { MainnetNetwork } from 'networks/mainnet';
import { MumbaiNetwork } from 'networks/mumbai';
import { PolygonNetwork } from 'networks/polygon';
import { TestnetNetwork } from 'networks/testnet';

import { Web3Network } from 'networks/types';

export type NetworkType = {
  networks: Web3Network[];
  defaultNetwork: Web3Network;
  activeNetwork: Web3Network;
  changeNetwork: (networkId: string) => Web3Network | undefined;
  showNetworkSelect: () => void;
};

const NetworkContext = createContext<NetworkType>({
  get networks(): Web3Network[] {
    throw new Error('No NetworkProvider found!');
  },
  get defaultNetwork(): Web3Network {
    throw new Error('No NetworkProvider found!');
  },
  get activeNetwork(): Web3Network {
    throw new Error('No NetworkProvider found!');
  },
  changeNetwork: () => undefined,
  showNetworkSelect: () => undefined,
});

export function useNetwork(): NetworkType {
  return useContext(NetworkContext);
}

const networks: Web3Network[] = (() => {
  switch (process.env.REACT_APP_ENV) {
    case 'development':
      return [KovanNetwork, MumbaiNetwork, GoerliNetwork, MainnetNetwork, PolygonNetwork, TestnetNetwork];
    case 'production':
      return [MainnetNetwork, PolygonNetwork, TestnetNetwork];
    default:
      return [];
  }
})();

const NetworkProvider: FC = props => {
  const { children } = props;

  const initialNetwork = useMemo<Web3Network>(() => {
    let network: Web3Network | undefined;

    try {
      const lsLastNetwork = localStorage.getItem('bb_last_network');

      if (lsLastNetwork) {
        const lastNetwork = lsLastNetwork.toLowerCase();
        network = networks.find(n => n.id === lastNetwork);
      }
    } catch {}

    return network ?? networks[0];
  }, []);

  const [activeNetwork, setActiveNetwork] = useState<Web3Network>(initialNetwork);

  const changeNetwork = useCallback((networkId: string): Web3Network | undefined => {
    showNetworkSelect(false);

    const network = networks.find(n => n.id === networkId);

    if (network) {
      // let canSetNetwork = true;
      //
      // if (network && activeProvider) {
      //   if (activeProvider.isMetaMask && network.metamaskChain) {
      //     try {
      //       const error = await metamask_SwitchEthereumChain(activeProvider, {
      //         chainId: network.metamaskChain.chainId,
      //       });
      //
      //       if (error) {
      //         canSetNetwork = false;
      //       }
      //     } catch (e) {
      //       canSetNetwork = false;
      //
      //       if (e.code === 4902) {
      //         await metamask_AddEthereumChain(activeProvider, network.metamaskChain);
      //       }
      //     }
      //   }
      //
      //   if (canSetNetwork) {
      //     if (storedNetwork !== network.id) {
      //       setStoredNetwork(network.id);
      //       window.location.reload();
      //     }
      //   }
      // }

      setActiveNetwork(network);
      localStorage.setItem('bb_last_network', network.id);
    }

    return network;
  }, []);

  const [networkSelectVisible, showNetworkSelect] = useState(false);

  const value: NetworkType = {
    networks,
    defaultNetwork: networks[0],
    activeNetwork,
    changeNetwork,
    showNetworkSelect: () => {
      showNetworkSelect(true);
    },
  };

  return (
    <NetworkContext.Provider value={value}>
      {children}
      {networkSelectVisible && (
        <Modal heading="Select network" closeHandler={showNetworkSelect}>
          <div className="flex flow-row row-gap-16 p-24">
            {networks.map(network => (
              <button
                key={network.id}
                className="button-ghost-monochrome p-16"
                style={{ height: 'inherit' }}
                onClick={() => {
                  changeNetwork(network.id);
                }}>
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
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
