import React from 'react';
import BigNumber from 'bignumber.js';

import { TokenMeta } from 'web3/types';
import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { useVersion } from 'hooks/useVersion';

import { ReactComponent as BONDIcon } from 'resources/svg/tokens/bond.svg';

const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();

const Contract = createContract(
  require('web3/abi/bond.json'),
  CONTRACT_BOND_ADDR,
);

export const BONDTokenMeta: TokenMeta = {
  icon: <BONDIcon key="bond" />,
  name: 'BOND',
  address: CONTRACT_BOND_ADDR,
  decimals: 18,
};

export type BONDContractType = {
  balance?: BigNumber;
  reload: () => void;
};

const InitialData: BONDContractType = {
  balance: undefined,
  reload: () => undefined,
};

export function useBONDContract(): BONDContractType {
  const { account } = useWeb3();
  const { version, incVersion } = useVersion();

  const [data, setData] = React.useState<BONDContractType>(InitialData);

  React.useEffect(() => {
    if (!assertValues(account)) {
      setData(prevState => ({
        ...prevState,
        balance: undefined,
      }));

      return;
    }

    (async () => {
      const [balance] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account] },
      ]);

      setData(prevState => ({
        ...prevState,
        balance: getHumanValue(new BigNumber(balance), BONDTokenMeta.decimals),
      }));
    })();
  }, [version, account]);

  return React.useMemo(() => ({
    ...data,
    reload: incVersion,
  }), [data, incVersion]);
}
