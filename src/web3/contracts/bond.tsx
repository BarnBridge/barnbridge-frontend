import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';
import { useWallet } from 'web3/wallet';
import Web3Contract from 'web3/contract';

import { ReactComponent as BONDIcon } from 'resources/svg/tokens/bond.svg';

const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();

export const BONDTokenMeta: TokenMeta = {
  icon: <BONDIcon key="bond" />,
  name: 'BOND',
  address: CONTRACT_BOND_ADDR,
  decimals: 18,
};

type BONDContractData = {
  balance?: BigNumber;
};

export type BONDContract = BONDContractData & {
  contract: Web3Contract;
  reload(): void;
};

const InitialData: BONDContractData = {
  balance: undefined,
};

export function useBONDContract(): BONDContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/bond.json'),
      CONTRACT_BOND_ADDR,
      'BOND',
    );
  }, []);

  const [data, setData] = React.useState<BONDContractData>(InitialData);

  useAsyncEffect(async () => {
    let balance: BigNumber | undefined = undefined;

    if (wallet.account) {
      [balance] = await contract.batch([
        {
          method: 'balanceOf',
          methodArgs: [wallet.account],
          transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
        },
      ]);
    }

    setData(prevState => ({
      ...prevState,
      balance,
    }));
  }, [reload, contract, wallet.account]);

  return React.useMemo(() => ({
    ...data,
    contract,
    reload,
  }), [data, contract, reload]);
}
