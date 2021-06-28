import { NetworkMeta } from 'networks/types';

export const GoerliNetwork: NetworkMeta = {
  id: 'goerli',
  chainId: 5,
  name: 'Ethereum Goerli',
  logo: 'testnet-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://goerli.etherscan.com',
  explorerApiUrl: 'https://api-goerli.etherscan.io',
  rpcUrls: ['https://goerli.infura.io/v3', 'wss://goerli.infura.io/ws/v3'],
  metamaskChain: {
    chainId: '0x5',
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartExposure: true,
  },
};
