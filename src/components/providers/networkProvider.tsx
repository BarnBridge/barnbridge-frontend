import { FC, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';

import Icon, { IconNames } from 'components/custom/icon';
import { Modal } from 'components/custom/modal';
import { Text } from 'components/custom/typography';
import { isDevelopmentMode, isProductionMode } from 'components/providers/configProvider';
import { GoerliNetwork } from 'networks/goerli';
import { KovanNetwork } from 'networks/kovan';
import { MainnetNetwork } from 'networks/mainnet';
import { MumbaiNetwork } from 'networks/mumbai';
import { TestnetNetwork } from 'networks/testnet';

import { InvariantContext } from 'utils/context';

import { Web3Network } from 'networks/types';

export type NetworkType = {
  networks: Web3Network[];
  defaultNetwork: Web3Network;
  activeNetwork: Web3Network;
  changeNetwork: (networkId: string) => Web3Network | undefined;
  showNetworkSelect: () => void;
};

const Context = createContext<NetworkType>(InvariantContext('NetworkProvider'));

export function useNetwork(): NetworkType {
  return useContext(Context);
}

const networks: Web3Network[] = (() => {
  if (isDevelopmentMode) {
    return [KovanNetwork, MumbaiNetwork, GoerliNetwork, MainnetNetwork, TestnetNetwork];
  }

  if (isProductionMode) {
    return [MainnetNetwork, TestnetNetwork];
  }

  return [];
})();

const NetworkProvider: FC = props => {
  const { children } = props;

  const [lastNetwork, setLastNetwork] = useSessionStorage<string | undefined>('bb_last_network');

  const initialNetwork = useMemo<Web3Network>(() => {
    let network: Web3Network | undefined;

    try {
      // const lsLastNetwork = localStorage.getItem('bb_last_network');
      const lsLastNetwork = lastNetwork;

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
      setLastNetwork(network.id);
      // localStorage.setItem('bb_last_network', network.id);
      window.location.reload();
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
    <Context.Provider value={value}>
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
    </Context.Provider>
  );
};

export default NetworkProvider;
