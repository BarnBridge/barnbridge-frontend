import React, { createContext, useContext, useEffect, useMemo } from 'react';
import ContractListener from 'web3/components/contract-listener';

import config from 'config';
import { useReload } from 'hooks/useReload';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolHelperContract from 'modules/smart-exposure/contracts/seEPoolHelperContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/wallet';

type SEContextType = {
  ePoolHelperContract: SeEPoolHelperContract;
  ePoolPeripheryContract: SeEPoolPeripheryContract;
};

const ePoolHelperContract = new SeEPoolHelperContract(config.contracts.se.ePoolHelper);
const ePoolPeripheryContract = new SeEPoolPeripheryContract(config.contracts.se.ePoolPeriphery);

const Context = createContext<SEContextType>({
  ePoolHelperContract: ePoolHelperContract,
  ePoolPeripheryContract: ePoolPeripheryContract,
});

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();

  useEffect(() => {
    ePoolHelperContract.setProvider(walletCtx.provider);
    ePoolPeripheryContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    ePoolHelperContract.setAccount(walletCtx.account);
    ePoolPeripheryContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  const value = {
    ePoolHelperContract,
    ePoolPeripheryContract,
  };

  return (
    <Context.Provider value={value}>
      {children}
      <ContractListener contract={ePoolPeripheryContract} />
    </Context.Provider>
  );
};

export const useEPoolContract = (address: string): SeEPoolContract => {
  const walletCtx = useWallet();
  const [reload] = useReload();

  const contract = useMemo(() => {
    const ctr = new SeEPoolContract(address);

    return ctr;
  }, [address]);

  useEffect(() => {
    contract.setProvider(walletCtx.provider);
  }, [contract, walletCtx.provider]);

  useEffect(() => {
    contract.setAccount(walletCtx.account);
  }, [contract, walletCtx.account]);

  useEffect(() => {
    contract.loadCommon().then(reload).catch(Error);
  }, [contract, reload]);

  return contract;
};
