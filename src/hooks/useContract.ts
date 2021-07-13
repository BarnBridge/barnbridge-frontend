import { useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useContractManager } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

// import { getTokenByAddress } from 'components/providers/known-tokens-provider';
import { useWallet } from 'wallets/walletProvider';

import { useReload } from './useReload';

function useDeepCompareMemoize(value: any): typeof value {
  const ref = useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export const useContract = (
  address: string | undefined,
  {
    loadBalance,
    loadCommon,
    loadAllowance,
  }: { loadBalance?: boolean; loadCommon?: boolean; loadAllowance?: string[] } = {},
): Erc20Contract | null => {
  const { provider, account } = useWallet();
  const [reload] = useReload();
  const { getContract } = useContractManager();

  const contract = useMemo(() => {
    if (!address) {
      return null;
    }

    const contract: Erc20Contract = getContract<Erc20Contract>(address, () => {
      return new Erc20Contract([], address);
    }); // (getTokenByAddress(address)?.contract as Erc20Contract) ?? new Erc20Contract([], address);
    contract.on(Web3Contract.UPDATE_DATA, reload);

    return contract;
  }, [address, provider, reload]);

  useEffect(() => {
    if (contract && loadBalance) {
      contract.setAccount(account);
      contract.loadBalance();
    }
  }, [contract, loadBalance, account]);

  useEffect(() => {
    if (contract && loadCommon) {
      contract
        .loadCommon()
        .then(() => reload())
        .catch(Error);
    }
  }, [contract, loadCommon, reload]);

  const memoisedAllowance = useDeepCompareMemoize(loadAllowance);

  useEffect(() => {
    if (contract && memoisedAllowance) {
      if (Array.isArray(memoisedAllowance)) {
        memoisedAllowance.forEach(i => contract.loadAllowance(i));
      } else {
        contract.loadAllowance(memoisedAllowance);
      }
    }
  }, [contract, memoisedAllowance]);

  return contract;
};
