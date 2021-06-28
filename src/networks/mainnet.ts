import { NetworkMeta } from 'networks/types';

export const MainnetNetwork: NetworkMeta = {
  id: 'mainnet',
  chainId: 1,
  name: 'Ethereum Mainnet',
  logo: 'mainnet-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://etherscan.com',
  explorerApiUrl: 'https://api.etherscan.io',
  rpcUrls: ['https://mainnet.infura.io/v3', 'wss://mainnet.infura.io/ws/v3'],
  metamaskChain: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartYieldReward: true,
    smartExposure: true,
    smartAlpha: true,
  },
};
