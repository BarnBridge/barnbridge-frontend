import { config, setConfigFor } from 'config';
import { GoerliNetwork } from 'networks/goerli';
import { KovanNetwork } from 'networks/kovan';
import { MainnetNetwork } from 'networks/mainnet';
import { MumbaiNetwork } from 'networks/mumbai';
import { PolygonNetwork } from 'networks/polygon';
import { TestnetNetwork } from 'networks/testnet';

import { NetworkMeta } from 'networks/types';

export const KnownNetworks: NetworkMeta[] = [
  ...(config.env === 'development' ? [KovanNetwork, MumbaiNetwork, GoerliNetwork] : []),
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
