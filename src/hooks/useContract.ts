import { useEffect, useMemo } from 'react';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { getTokenByAddress } from 'components/providers/known-tokens-provider';
import { useWallet } from 'wallets/wallet';

import { useReload } from './useReload';

export const useContract = (
  address: string,
  {
    loadBalance,
    loadCommon,
    loadAllowance,
  }: { loadBalance?: boolean; loadCommon?: boolean; loadAllowance?: string } = {},
): Erc20Contract => {
  const wallet = useWallet();
  const [reload] = useReload();

  const contract = useMemo(() => {
    const contract: Erc20Contract =
      (getTokenByAddress(address)?.contract as Erc20Contract) ?? new Erc20Contract([], address);
    contract.setProvider(wallet.provider);
    contract.on(Web3Contract.UPDATE_DATA, reload);

    return contract;
  }, [reload, address, wallet.provider]);

  useEffect(() => {
    if (loadBalance) {
      contract.setAccount(wallet.account);
      contract.loadBalance();
    }
  }, [contract, loadBalance, wallet.account]);

  useEffect(() => {
    if (loadCommon) {
      contract
        .loadCommon()
        .then(() => reload())
        .catch(Error);
    }
  }, [contract, loadCommon, reload]);

  useEffect(() => {
    if (loadAllowance) {
      contract.loadAllowance(loadAllowance);
    }
  }, [contract, loadAllowance]);

  return contract;
};
