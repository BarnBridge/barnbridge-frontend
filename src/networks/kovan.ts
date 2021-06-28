import { NetworkMeta } from 'networks/types';

export const KovanNetwork: NetworkMeta = {
  id: 'kovan',
  chainId: 42,
  name: 'Ethereum Kovan',
  logo: 'testnet-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://kovan.etherscan.com',
  explorerApiUrl: 'https://api-kovan.etherscan.io',
  rpcUrls: ['https://kovan.infura.io/v3', 'wss://kovan.infura.io/ws/v3'],
  metamaskChain: {
    chainId: '0x2a',
    chainName: 'Kovan Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://kovan.infura.io/v3'],
    blockExplorerUrls: ['https://kovan.etherscan.io'],
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
