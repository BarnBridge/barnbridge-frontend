import React from 'react';
import BigNumber from 'bignumber.js';
import BOND_ABI from 'web3/abi/bond.json';
import { CONTRACT_DAO_BARN_ADDR } from 'web3/contracts/daoBarn';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contracts/web3Contract';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();

const Contract = new Web3Contract(BOND_ABI as Web3ContractAbiItem[], CONTRACT_BOND_ADDR, 'BOND');

export const BONDTokenMeta: TokenMeta = {
  icon: <Icon key="bond" name="bond-token" />,
  name: 'BOND',
  address: CONTRACT_BOND_ADDR,
  decimals: 18,
};

export const VBONDTokenMeta: TokenMeta = {
  icon: <Icon key="vbond" name="bond-token" />,
  name: 'vBOND',
  address: CONTRACT_BOND_ADDR,
  decimals: 18,
};

type BONDContractData = {
  balance?: BigNumber;
  totalSupply?: BigNumber;
  allowance?: BigNumber;
  barnAllowance?: BigNumber;
};

export type BONDContract = BONDContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(address: string, value: BigNumber): Promise<any>;
};

const InitialData: BONDContractData = {
  balance: undefined,
  allowance: undefined,
  barnAllowance: undefined,
};

export function useBONDContract(): BONDContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<BONDContractData>(InitialData);

  React.useEffect(() => {
    (async () => {
      let totalSupply: BigNumber | undefined;

      [totalSupply] = await Contract.batch([
        {
          method: 'totalSupply',
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
      ]);

      setData(prevState => ({
        ...prevState,
        totalSupply,
      }));
    })();
  }, [reload, wallet.account]);

  React.useEffect(() => {
    (async () => {
      let balance: BigNumber | undefined;
      let allowance: BigNumber | undefined;
      let barnAllowance: BigNumber | undefined;

      if (wallet.account) {
        [balance, allowance, barnAllowance] = await Contract.batch([
          {
            method: 'balanceOf',
            methodArgs: [wallet.account],
            transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
          },
          {
            method: 'allowance',
            methodArgs: [wallet.account, CONTRACT_STAKING_ADDR],
            transform: (value: string) => new BigNumber(value),
          },
          {
            method: 'allowance',
            methodArgs: [wallet.account, CONTRACT_DAO_BARN_ADDR],
            transform: (value: string) => new BigNumber(value),
          },
        ]);
      }

      setData(prevState => ({
        ...prevState,
        balance,
        allowance,
        barnAllowance,
      }));
    })();
  }, [reload, wallet.account]);

  const approveSend = React.useCallback(
    (address: string, value: BigNumber): Promise<any> => {
      if (!wallet.account) {
        return Promise.reject();
      }

      return Contract.send('approve', [address, value], {
        from: wallet.account,
      }).then(reload);
    },
    [reload, wallet.account],
  );

  return React.useMemo(
    () => ({
      ...data,
      contract: Contract,
      reload,
      approveSend,
    }),
    [data, reload, approveSend],
  );
}
