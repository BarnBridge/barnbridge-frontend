import { config, setConfigFor } from 'config';
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
};

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
};

export const PolygonNetwork: NetworkMeta = {
  id: 'polygon',
  chainId: 137,
  name: 'Polygon',
  logo: 'polygon-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://explorer-mainnet.maticvigil.com',
  explorerApiUrl: 'https://api.etherscan.io',
  rpcUrls: ['https://rpc-mainnet.maticvigil.com', 'wss://rpc-mainnet.maticvigil.com'],
  metamaskChain: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
};

export const TestnetNetwork: NetworkMeta = {
  id: 'testnet',
  chainId: 42,
  name: 'Ethereum Testnet (Kovan)',
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
};

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
};

export const KnownNetworks: NetworkMeta[] = [
  ...(config.env === 'development' ? [KovanNetwork] : []),
  MainnetNetwork,
  PolygonNetwork,
  TestnetNetwork,
];

export let DefaultNetwork = KnownNetworks[0];

(() => {
  let lastNetwork: string | undefined;

  try {
    lastNetwork = JSON.parse(localStorage.getItem('bb_last_network') ?? '');
  } catch {}

  lastNetwork = lastNetwork ?? DefaultNetwork.id;

  if (lastNetwork === 'polygon') {
    lastNetwork = MainnetNetwork.id;
  }
  const network = KnownNetworks.find(kn => kn.id === lastNetwork);
  const newConfig = setConfigFor(network!.id.toUpperCase());

  const rpcUrl = `${network!.rpcUrls[0]}/${newConfig.web3.rpcKey}`;
  const { setProviderByUrl } = require('components/providers/eth-web3-provider');
  setProviderByUrl(rpcUrl);
})();

export function getHttpRpcUrl(): string {
  return `${DefaultNetwork.rpcUrls[0]}/${config.web3.rpcKey}`;
}

export function getWsRpcUrl(): string {
  return `${DefaultNetwork.rpcUrls[1]}/${config.web3.rpcKey}`;
}

export function getEtherscanTxUrl(txHash?: string): string | undefined {
  return txHash ? `${DefaultNetwork.explorerUrl}/tx/${txHash}` : undefined;
}

export function getEtherscanAddressUrl(address?: string): string | undefined {
  return address ? `${DefaultNetwork.explorerUrl}/address/${address}` : undefined;
}

export function getEtherscanABIUrl(address: string): string | undefined {
  return address
    ? `${DefaultNetwork.explorerUrl}/api?module=contract&action=getabi&address=${address}&apikey=${config.web3.etherscanKey}`
    : undefined;
}

export function getEtherscanGasUrl(): string {
  return `${DefaultNetwork.explorerUrl}//api?module=gastracker&action=gasoracle&apikey=${config.web3.etherscanKey}`;
}
