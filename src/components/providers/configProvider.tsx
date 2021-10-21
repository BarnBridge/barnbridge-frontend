import { FC, createContext, useContext } from 'react';

import { useNetwork } from 'components/providers/networkProvider';

import { InvariantContext } from 'utils/context';

import { NetworkConfig } from 'networks/types';

export type ConfigContextType = NetworkConfig & {
  links: {
    website: string;
    discord: string;
    twitter: string;
    whitepaper: string;
    docs: string;
    github: string;
    uniswapLiquidity: string;
    uniswapSwap: string;
  };
};

const Context = createContext<ConfigContextType>(InvariantContext('ConfigProvider'));

export function useConfig(): ConfigContextType {
  return useContext(Context);
}

const ConfigProvider: FC = props => {
  const { children } = props;
  const { activeNetwork } = useNetwork();

  const config = activeNetwork.config;
  const value: ConfigContextType = {
    ...activeNetwork.config,
    links: {
      website: 'http://www.barnbridge.com',
      discord: 'https://discord.com/invite/FfEhsVk',
      twitter: 'https://twitter.com/barn_bridge',
      whitepaper: 'https://github.com/BarnBridge/BarnBridge-Whitepaper',
      docs: 'https://docs.barnbridge.com/',
      github: 'https://github.com/BarnBridge',
      uniswapLiquidity: `https://app.uniswap.org/#/add/v2/${config.tokens?.bond}/${config.tokens?.usdc}`,
      uniswapSwap: `https://app.uniswap.org/#/swap?use=V2&inputCurrency=${config.tokens?.bond}&outputCurrency=${config.tokens?.usdc}`,
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ConfigProvider;
