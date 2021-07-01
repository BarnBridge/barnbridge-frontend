import React, { FC, createContext, useContext, useEffect, useRef } from 'react';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import { useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/walletProvider';

export type ContractManagerType = {
  getContract<T extends Web3Contract>(address: string, factory?: () => T): T;
};

const ContractManagerContext = createContext<ContractManagerType>({
  getContract: () => null as any,
});

export function useContractManager(): ContractManagerType {
  return useContext(ContractManagerContext);
}

export function useContract<T extends Web3Contract>(address: string, factory?: () => T): T {
  const [reload] = useReload();
  const manager = useContractManager();
  const contract = manager.getContract<T>(address, factory);
  contract.on(Web3Contract.UPDATE_DATA, reload);
  return contract;
}

const ContractManagerProvider: FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const web3 = useWeb3();
  const contractsRef = useRef<Map<string, Web3Contract>>(new Map());
  const [reload] = useReload();

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
    getContract,
  };

  return (
    <ContractManagerContext.Provider value={value}>
      {children}
      {Array.from(contractsRef.current).map(([address, contract]) => (
        <ContractListener key={address} contract={contract} />
      ))}
    </ContractManagerContext.Provider>
  );
};

export default ContractManagerProvider;
