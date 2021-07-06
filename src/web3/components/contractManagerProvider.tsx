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
  preRegisterAddress<T extends Web3Contract>(address: string, factory: () => T): void;
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

  function preRegisterAddress<T extends Web3Contract>(address: string, factory: () => T): void {
    let contract: Web3Contract | undefined;

    if (!contractsRef.current.has(address)) {
      contract = factory();
      contract.setProvider(web3.activeProvider);
      contract.setCallProvider(web3.activeProvider);

      if (wallet.account) {
        contract.setAccount(wallet.account);
      }

      contractsRef.current.set(address, contract);
      reload();
    }
  }

  /**
   * @param address - Contract address
   * @param factory - Creates Contract entity in case when contract is not found
   */
  function getContract<T extends Web3Contract>(address: string, factory?: () => T): T {
    let contract: Web3Contract | undefined;

    if (!contractsRef.current.has(address)) {
      contract = factory?.() ?? new Web3Contract([], address, '');

      contract.setProvider(web3.activeProvider);
      contract.setCallProvider(web3.activeProvider);

      if (wallet.account) {
        contract.setAccount(wallet.account);
      }

      contractsRef.current.set(address, contract);
      reload();
    } else {
      contract = contractsRef.current.get(address);
    }

    return contract as T;
  }

  useEffect(() => {
    function onUpdateProvider(provider: any) {
      contractsRef.current.forEach(contract => {
        contract.setProvider(provider);
        contract.setCallProvider(provider);
      });
    }

    function onUpdateAccount(account: string) {
      contractsRef.current.forEach(contract => {
        contract.setAccount(account);
      });
    }

    web3.event.on('UPDATE_PROVIDER', onUpdateProvider);
    wallet.event.on('UPDATE_ACCOUNT', onUpdateAccount);

    return () => {
      web3.event.off('UPDATE_PROVIDER', onUpdateProvider);
      wallet.event.off('UPDATE_ACCOUNT', onUpdateAccount);
    };
  }, []);

  const value: ContractManagerType = {
    preRegisterAddress,
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
