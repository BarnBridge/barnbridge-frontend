import React from 'react';
import BigNumber from 'bignumber.js';
import USDC_ABI from 'web3/abi/usdc.json';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contracts/web3Contract';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

const Contract = new Web3Contract(USDC_ABI as Web3ContractAbiItem[], CONTRACT_USDC_ADDR, 'USDC');

export const USDCTokenMeta: TokenMeta = {
  icon: <Icon key="usdc" name="usdc-token" />,
  name: 'USDC',
  address: CONTRACT_USDC_ADDR,
  decimals: 6,
};

type USDCContractData = {
  balance?: BigNumber;
  allowance?: BigNumber;
};

export type USDCContract = USDCContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(value: BigNumber): Promise<any>;
};

const InitialData: USDCContractData = {
  balance: undefined,
  allowance: undefined,
};

export function useUSDCContract(): USDCContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<USDCContractData>(InitialData);

  React.useEffect(() => {
    (async () => {
      let balance: BigNumber | undefined;
      let allowance: BigNumber | undefined;

      if (wallet.account) {
        [balance, allowance] = await Contract.batch([
          {
            method: 'balanceOf',
            methodArgs: [wallet.account],
            transform: (value: string) => getHumanValue(new BigNumber(value), USDCTokenMeta.decimals),
          },
          {
            method: 'allowance',
            methodArgs: [wallet.account, CONTRACT_STAKING_ADDR],
            transform: (value: string) => new BigNumber(value),
          },
        ]);
      }

      setData(prevState => ({
        ...prevState,
        balance,
        allowance,
      }));
    })();
  }, [reload, wallet.account]);

  const approveSend = React.useCallback(
    (value: BigNumber): Promise<any> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return Contract.send('approve', [CONTRACT_STAKING_ADDR, value], {
        from: wallet.account,
      }).then(reload);
    },
    [reload, Contract, wallet.account],
  );

  return React.useMemo<USDCContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      approveSend,
    }),
    [data, Contract, reload, approveSend],
  );
}
