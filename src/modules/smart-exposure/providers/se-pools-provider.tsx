import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/wallet';

type SEContextType = {
  pools: any[];
  ePoolContract?: SeEPoolContract;
  ePoolPeripheryContract?: SeEPoolPeripheryContract;
};

const Context = createContext<SEContextType>({
  pools: [],
  ePoolContract: undefined,
  ePoolPeripheryContract: undefined,
});

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();

  const [pools, setPools] = useState([]);
  const ePoolContract = useMemo(() => new SeEPoolContract('0x984b81e730b6a4f1b90c3cb77caed8dff38143f2'), []);
  const ePoolPeripheryContract = useMemo(
    () => new SeEPoolPeripheryContract('0xd3361db31ee22db5ea8cb37e60532c6a8e29e7c1'),
    [],
  );

  useEffect(() => {
    ePoolContract.setProvider(walletCtx.provider);
    ePoolPeripheryContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    ePoolContract.setAccount(walletCtx.account);
    ePoolPeripheryContract.setAccount(walletCtx.account);
  }, [walletCtx.account]);

  useEffect(() => {
    ePoolContract.loadCommon().catch(Error);
  }, []);

  const value = {
    pools,
    ePoolContract,
    ePoolPeripheryContract,
  };

  console.log(value);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
