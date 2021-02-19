import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { getHumanValue } from 'web3/utils';
import Web3Contract from 'web3/contract';
import useMergeState from 'hooks/useMergeState';

const CONTRACT_SY_CONTROLLER_ADDR = String(
  process.env.REACT_APP_CONTRACT_SY_CONTROLLER_ADDR,
).toLowerCase();

type SYControllerContractData = {
  juniorFee?: BigNumber;
};

export type SYControllerContract = SYControllerContractData & {
  contract: Web3Contract;
  reload(): void;
};

const InitialData: SYControllerContractData = {};

const Contract = new Web3Contract(
  require('web3/abi/sy_controller.json'),
  CONTRACT_SY_CONTROLLER_ADDR,
  'SY_CONTROLLER',
);

const DECIMALS_1 = 18;

export function useSYControllerContract(): SYControllerContract {
  const [reload] = useReload();

  const [state, setState] = useMergeState<SYControllerContractData>(InitialData);

  useAsyncEffect(async () => {
    let juniorFee: BigNumber | undefined;

    [juniorFee] = await Contract.batch([
      {
        method: 'FEE_BUY_JUNIOR_TOKEN',
        transform: (value: string) => new BigNumber(value),
        // transform: (value: string) =>
        //   getHumanValue(new BigNumber(value), DECIMALS_1),
      },
    ]);

    setState({
      juniorFee,
    });
  }, [reload]);

  return React.useMemo<SYControllerContract>(
    () => ({
      ...state,
      contract: Contract,
      reload,
    }),
    [state, Contract, reload],
  );
}
