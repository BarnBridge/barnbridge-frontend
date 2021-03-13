import React from 'react';
import BigNumber from 'bignumber.js';
import DAI_ABI from 'web3/abi/dai.json';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { TokenMeta } from 'web3/types';
import { getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();

const Contract = new Web3Contract(DAI_ABI as Web3ContractAbiItem[], CONTRACT_DAI_ADDR, 'DAI');

export const DAITokenMeta: TokenMeta = {
  icon: <Icon key="dai" name="dai-token" />,
  name: 'DAI',
  address: CONTRACT_DAI_ADDR,
  decimals: 18,
};

type DAIContractData = {
  balance?: BigNumber;
  allowance?: BigNumber;
};

export type DAIContract = DAIContractData & {
  contract: Web3Contract;
  reload(): void;
  approveSend(value: BigNumber): Promise<any>;
};

const InitialData: DAIContractData = {
  balance: undefined,
  allowance: undefined,
};

export function useDAIContract(): DAIContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const [data, setData] = React.useState<DAIContractData>(InitialData);

  React.useEffect(() => {
    (async () => {
      let balance: BigNumber | undefined;
      let allowance: BigNumber | undefined;

      if (wallet.account) {
        [balance, allowance] = await Contract.batch([
          {
            method: 'balanceOf',
            methodArgs: [wallet.account],
            transform: (value: string) => getHumanValue(new BigNumber(value), DAITokenMeta.decimals),
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

  return React.useMemo<DAIContract>(
    () => ({
      ...data,
      contract: Contract,
      reload,
      approveSend,
    }),
    [data, Contract, reload, approveSend],
  );
}
