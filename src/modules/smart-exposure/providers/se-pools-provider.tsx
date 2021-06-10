import React, { createContext, useContext, useEffect, useMemo } from 'react';
import ContractListener from 'web3/components/contract-listener';

import config from 'config';
import { useReload } from 'hooks/useReload';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/wallet';

type SEContextType = {
  // pools: any[];
  ePoolContract?: SeEPoolContract;
  ePoolPeripheryContract?: SeEPoolPeripheryContract;
};

const Context = createContext<SEContextType>({
  // pools: [],
  ePoolContract: undefined,
  ePoolPeripheryContract: undefined,
});

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();
  // const [pools, setPools] = useState([]);

  const ePoolContract = useMemo(
    () =>
      new SeEPoolContract(
        config.contracts.se.ePool,
        // '0x984b81e730b6a4f1b90c3cb77caed8dff38143f2'
      ),
    [],
  );
  const ePoolPeripheryContract = useMemo(
    () =>
      new SeEPoolPeripheryContract(
        config.contracts.se.ePoolPeriphery,
        // '0xd3361db31ee22db5ea8cb37e60532c6a8e29e7c1'
      ),
    [],
  );

  useEffect(() => {
    ePoolContract.setProvider(walletCtx.provider);
    ePoolPeripheryContract.setProvider(walletCtx.provider);
  }, [ePoolContract, ePoolPeripheryContract, walletCtx.provider]);

  useEffect(() => {
    ePoolContract.setAccount(walletCtx.account);
    ePoolPeripheryContract.setAccount(walletCtx.account);
  }, [ePoolContract, ePoolPeripheryContract, walletCtx.account]);

  useEffect(() => {
    ePoolContract.loadCommon().then(reload).catch(Error);
  }, [ePoolContract, reload]);

  const value = {
    // pools,
    ePoolContract,
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
