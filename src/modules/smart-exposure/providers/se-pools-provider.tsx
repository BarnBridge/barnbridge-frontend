import React, { createContext, useContext, useEffect } from 'react';
import ContractListener from 'web3/components/contract-listener';
import { useContract } from 'web3/components/contractManagerProvider';

import { useConfig } from 'components/providers/configProvider';
import { useReload } from 'hooks/useReload';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import SeEPoolHelperContract from 'modules/smart-exposure/contracts/seEPoolHelperContract';
import SeEPoolPeripheryContract from 'modules/smart-exposure/contracts/seEPoolPeripheryContract';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

type SEContextType = {
  ePoolContract: SeEPoolContract;
  ePoolHelperContract: SeEPoolHelperContract;
  ePoolPeripheryContract: SeEPoolPeripheryContract;
};

const Context = createContext<SEContextType>(InvariantContext<SEContextType>('SEPoolsProvider'));

export function useSEPools(): SEContextType {
  return useContext(Context);
}

export const SEPoolsProvider: React.FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const config = useConfig();
  const [reload] = useReload();

  const ePoolContract = useContract<SeEPoolContract>(config.contracts.se?.ePool!, () => {
    return new SeEPoolContract(config.contracts.se?.ePool!);
  });
  const ePoolPeripheryContract = useContract<SeEPoolPeripheryContract>(config.contracts.se?.ePoolPeriphery!, () => {
    return new SeEPoolPeripheryContract(config.contracts.se?.ePoolPeriphery!);
  });
  const ePoolHelperContract = useContract<SeEPoolHelperContract>(config.contracts.se?.ePoolHelper!, () => {
    return new SeEPoolHelperContract(config.contracts.se?.ePoolHelper!);
  });

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
