import { FC, createContext, useContext } from 'react';

import { useNetwork } from 'components/providers/networkProvider';
import { MainnetNetwork } from 'networks/mainnet';

import { NetworkConfig } from 'networks/types';

export type ConfigContextType = NetworkConfig;

const ConfigContext = createContext<ConfigContextType>({
  ...MainnetNetwork.config,
});

export function useConfig(): ConfigContextType {
  return useContext(ConfigContext);
}

const ConfigProvider: FC = props => {
  const { children } = props;
  const { activeNetwork } = useNetwork();

  const value: ConfigContextType = {
    ...activeNetwork.config,
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
