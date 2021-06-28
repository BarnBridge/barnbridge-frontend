import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

export type NetworkMeta = {
  id: string;
  chainId: number;
  name: string;
  logo: string;
  poolingInterval: number;
  explorerUrl: string;
  explorerApiUrl: string;
  rpcUrls: [string, string];
  metamaskChain?: MetamaskAddEthereumChain;
  features: {
    yieldFarming?: boolean;
    dao?: boolean;
    smartYield?: boolean;
    smartYieldReward?: boolean;
    smartExposure?: boolean;
    smartAlpha?: boolean;
    faucets?: boolean;
  };
};
