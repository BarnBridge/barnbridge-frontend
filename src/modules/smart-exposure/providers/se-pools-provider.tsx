import React, { createContext, useContext, useEffect } from 'react';
import { useContract } from 'web3/components/contractManagerProvider';

import { useConfig } from 'components/providers/configProvider';
import { useReload } from 'hooks/useReload';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolHelperContract from 'modules/smart-exposure/contracts/seEPoolHelperContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

type SEContextType = {
  ePoolHelperContract: SeEPoolHelperContract;
  ePoolPeripheryContract: SeEPoolPeripheryContract;
};

const Context = createContext<SEContextType>(InvariantContext('SEPoolsProvider'));

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const config = useConfig();

  const ePoolPeripheryContract = useContract<SeEPoolPeripheryContract>(config.contracts.se?.ePoolPeriphery!, () => {
    return new SeEPoolPeripheryContract(config.contracts.se?.ePoolPeriphery!);
  });
  const ePoolHelperContract = useContract<SeEPoolHelperContract>(config.contracts.se?.ePoolHelper!, () => {
    return new SeEPoolHelperContract(config.contracts.se?.ePoolHelper!);
  });

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

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useEPoolContract = (address: string): SeEPoolContract => {
  const [reload] = useReload();

  const contract = useContract<SeEPoolContract>(address, () => {
    return new SeEPoolContract(address);
  });

  useEffect(() => {
    contract.loadCommon().then(reload).catch(Error);
  }, [contract, reload]);

  return contract;
};
