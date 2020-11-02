import React from 'react';
import BigNumber from 'bignumber.js';

import { TokenMeta } from 'web3/types';
import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { useVersion } from 'hooks/useVersion';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';

const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

const Contract = createContract(
  require('web3/abi/usdc.json'),
  CONTRACT_USDC_ADDR,
);

export const USDCTokenMeta: TokenMeta = {
  icon: <USDCIcon key="usdc" />,
  name: 'USDC',
  address: CONTRACT_USDC_ADDR,
  decimals: 6,
};

export type USDCContractType = {
  balance?: BigNumber;
  allowance?: BigNumber;
  approveSend: (value: BigNumber) => Promise<any>;
  reload: () => void;
};

const InitialData: USDCContractType = {
  balance: undefined,
  allowance: undefined,
  approveSend: () => Promise.resolve(),
  reload: () => undefined,
};

export function useUSDCContract(): USDCContractType {
  const { account } = useWeb3();
  const { version, incVersion } = useVersion();

  const [data, setData] = React.useState<USDCContractType>(InitialData);

  React.useEffect(() => {
    if (!assertValues(account)) {
      setData(prevState => ({
        ...prevState,
        balance: undefined,
        allowance: undefined,
      }));

      return;
    }

    (async () => {
      const [balance, allowance] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account] },
        { method: 'allowance', methodArgs: [account, CONTRACT_STAKING_ADDR] },
      ]);

      setData(prevState => ({
        ...prevState,
        balance: getHumanValue(new BigNumber(balance), USDCTokenMeta.decimals),
        allowance: new BigNumber(allowance),
      }));
    })();
  }, [version, account]);

  const approveSend = React.useCallback((value: BigNumber): Promise<any> => {
    if (!assertValues(account)) {
      return Promise.reject();
    }

    return sendContract(Contract, 'approve', [
      CONTRACT_STAKING_ADDR,
      value,
    ], {
      from: account,
    })
      .then(async () => {
        const [allowance] = await batchContract(Contract, [
          { method: 'allowance', methodArgs: [account, CONTRACT_STAKING_ADDR] },
        ]);

        setData(prevState => ({
          ...prevState,
          allowance: new BigNumber(allowance),
        }));
      });
  }, [account]);

  return React.useMemo(() => ({
    ...data,
    approveSend,
    reload: incVersion,
  }), [data, approveSend, incVersion]);
}
