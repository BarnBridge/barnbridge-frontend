import React, { createContext, useContext, useEffect } from 'react';
import ContractListener from 'web3/components/contract-listener';

import { config } from 'config';
import { useReload } from 'hooks/useReload';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolHelperContract from 'modules/smart-exposure/contracts/seEPoolHelperContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/wallet';

type SEContextType = {
  ePoolContract: SeEPoolContract;
  ePoolHelperContract: SeEPoolHelperContract;
  ePoolPeripheryContract: SeEPoolPeripheryContract;
};

const ePoolContract = new SeEPoolContract(config.contracts.se.ePool);
const ePoolHelperContract = new SeEPoolHelperContract(config.contracts.se.ePoolHelper);
const ePoolPeripheryContract = new SeEPoolPeripheryContract(config.contracts.se.ePoolPeriphery);

const Context = createContext<SEContextType>({
  ePoolContract: ePoolContract,
  ePoolHelperContract: ePoolHelperContract,
  ePoolPeripheryContract: ePoolPeripheryContract,
});

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();

  useEffect(() => {
    ePoolContract.setProvider(walletCtx.provider);
    ePoolHelperContract.setProvider(walletCtx.provider);
    ePoolPeripheryContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    ePoolContract.setAccount(walletCtx.account);
    ePoolHelperContract.setAccount(walletCtx.account);
    ePoolPeripheryContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  useEffect(() => {
    ePoolContract.loadCommon().then(reload).catch(Error);
  }, [reload]);

  const value = {
    ePoolContract,
    ePoolHelperContract,
    ePoolPeripheryContract,
  };

  return (
    <Context.Provider value={value}>
      {children}
      <ContractListener contract={ePoolContract} />
      <ContractListener contract={ePoolPeripheryContract} />
    </Context.Provider>
  );
};
