import React from 'react';
import BigNumber from 'bignumber.js';

import { TokenMeta } from 'web3/types';
import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { useVersion } from 'hooks/useVersion';

import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

export const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

const Contract = createContract(
  require('web3/abi/uniswap_v2.json'),
  CONTRACT_UNISWAP_V2_ADDR,
);

export const UNISWAPTokenMeta: TokenMeta = {
  icon: <UNISWAPIcon key="uniswap" />,
  name: 'USDC_BOND_UNI_LP',
  address: CONTRACT_UNISWAP_V2_ADDR,
  decimals: 18,
};

export type UniswapV2ContractType = {
  totalSupply?: BigNumber;
  usdcReserve?: BigNumber;
  bondReserve?: BigNumber;
  balance?: BigNumber;
  allowance?: BigNumber;
  lastBlockTime?: number;
  approveSend: (value: BigNumber) => Promise<any>;
  reload: () => void;
};

const InitialData: UniswapV2ContractType = {
  totalSupply: undefined,
  usdcReserve: undefined,
  bondReserve: undefined,
  balance: undefined,
  allowance: undefined,
  lastBlockTime: undefined,
  approveSend: () => Promise.resolve(),
  reload: () => undefined,
};

export function useUniswapV2Contract(): UniswapV2ContractType {
  const { account } = useWeb3();
  const { version, incVersion } = useVersion();

  const [data, setData] = React.useState<UniswapV2ContractType>(InitialData);

  React.useEffect(() => {
    (async () => {
      const [totalSupply, reserves, token0, token1] = await batchContract(Contract, [
        'totalSupply',
        'getReserves',
        'token0',
        'token1',
      ]);

      let usdcReserve: BigNumber;
      let bondReserve: BigNumber;

      if (String(token0).toLowerCase() === USDCTokenMeta.address) {
        usdcReserve = new BigNumber(reserves[0]);
        bondReserve = new BigNumber(reserves[1]);
      } else if (String(token1).toLowerCase() === USDCTokenMeta.address) {
        usdcReserve = new BigNumber(reserves[1]);
        bondReserve = new BigNumber(reserves[0]);
      }

      setData(prevState => ({
        ...prevState,
        totalSupply: getHumanValue(new BigNumber(totalSupply), UNISWAPTokenMeta.decimals),
        usdcReserve: getHumanValue(usdcReserve, USDCTokenMeta.decimals),
        bondReserve: getHumanValue(bondReserve, BONDTokenMeta.decimals),
        lastBlockTime: reserves ? Number(reserves[2]) * 1000 : 0,
      }));
    })();
  }, []);

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
        balance: getHumanValue(new BigNumber(balance), UNISWAPTokenMeta.decimals),
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
