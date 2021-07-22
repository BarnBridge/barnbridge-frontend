import React, { FC, createContext, useContext, useEffect, useRef } from 'react';
import { AbiItem } from 'web3-utils';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export type ContractManagerType = {
  getContract<T extends Web3Contract>(address: string, factory?: () => T): T;
};

const Context = createContext<ContractManagerType>(InvariantContext('ContractManagerProvider'));

export function useContractManager(): ContractManagerType {
  return useContext(Context);
}

export function useContract<T extends Web3Contract>(address: string, factory?: () => T): T {
  const [reload] = useReload();
  const manager = useContractManager();
  const contract = manager.getContract<T>(address, factory);
  contract.on(Web3Contract.UPDATE_DATA, reload);
  return contract;
}

export function useErc20Contract(address: string, abi: AbiItem[] = []): Erc20Contract | undefined {
  const [reload] = useReload();
  const manager = useContractManager();

  if (!address) {
    return undefined; /// TODO: re-think
  }

  const contract = manager.getContract<Erc20Contract>(address, () => new Erc20Contract(abi, address));
  contract.on(Web3Contract.UPDATE_DATA, reload);
  return contract;
}

const ContractManagerProvider: FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const web3 = useWeb3();
  const contractsRef = useRef<Map<string, Web3Contract>>(new Map());
  const [reload] = useReload();

  const web3ProviderRef = useRef(web3.activeProvider);

  if (web3ProviderRef.current !== web3.activeProvider) {
    web3ProviderRef.current = web3.activeProvider;

    contractsRef.current.forEach(contract => {
      contract.setCallProvider(web3.activeProvider);
    });
  }

  const walletProviderRef = useRef(wallet.provider);

  if (walletProviderRef.current !== wallet.provider) {
    walletProviderRef.current = wallet.provider;

    contractsRef.current.forEach(contract => {
      contract.setProvider(wallet.provider);
    });
  }

  const walletAccountRef = useRef(wallet.account);

  if (walletAccountRef.current !== wallet.account) {
    walletAccountRef.current = wallet.account;

    contractsRef.current.forEach(contract => {
      contract.setAccount(wallet.account);
    });
  }

  /**
   * @param address - Contract address
   * @param factory - Creates Contract entity in case when contract is not found
   */
  function getContract<T extends Web3Contract>(address: string, factory?: () => T): T {
    let contract: Web3Contract | undefined;

    if (!contractsRef.current.has(address)) {
      contract = factory?.() ?? new Web3Contract([], address, '');

      contract.setCallProvider(web3.activeProvider);
      contract.setProvider(wallet.provider);
      contract.setAccount(wallet.account);

      contractsRef.current.set(address, contract);
      reload();
    } else {
      contract = contractsRef.current.get(address);
    }

    return contract as T;
  }

  const value: ContractManagerType = {
    getContract,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {Array.from(contractsRef.current).map(([address, contract]) => (
        <ContractListener key={address} contract={contract} />
      ))}
    </Context.Provider>
  );
};

export default ContractManagerProvider;
