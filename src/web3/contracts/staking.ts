import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue } from 'web3/utils';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR);
const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR);
const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR);
const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR);

export type StakingContract = {
  currentEpoch?: number;
  epochEnd?: number;
  dai: {
    epochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  usdc: {
    epochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  susd: {
    epochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  uniswap_v2: {
    epochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
};

const InitialDataState: StakingContract = {
  currentEpoch: undefined,
  epochEnd: undefined,
  dai: {
    epochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  usdc: {
    epochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  susd: {
    epochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  uniswap_v2: {
    epochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
};

const Contract = createContract(
  require('web3/abi/staking.json'),
  String(process.env.REACT_APP_CONTRACT_STAKING_ADDR),
);

export function useStakingContract(account?: string): StakingContract {
  const [data, setData] = React.useState<StakingContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [currentEpoch, epoch1Start, epochDuration] = await batchContract(Contract, [
        'getCurrentEpoch',
        'epoch1Start',
        'epochDuration',
      ]);

      const [daiEpochPoolSize, usdcEpochPoolSize, susdEpochPoolSize, uniEpochPoolSize] = await batchContract(Contract, [
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_DAI_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_USDC_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_SUSD_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_UNISWAP_V2_ADDR, currentEpoch] },
      ]);

      setData(prevState => ({
        ...prevState,
        currentEpoch: Number(currentEpoch),
        epochEnd: (Number(epoch1Start) + (Number(currentEpoch) * Number(epochDuration))) * 1000,
        dai: {
          ...prevState.dai,
          epochPoolSize: getHumanValue(new BigNumber(daiEpochPoolSize), 18), // TODO: get decimals from DAI contract
        },
        usdc: {
          ...prevState.usdc,
          epochPoolSize: getHumanValue(new BigNumber(usdcEpochPoolSize), 6), // TODO: get decimals from USDC contract
        },
        susd: {
          ...prevState.susd,
          epochPoolSize: getHumanValue(new BigNumber(susdEpochPoolSize), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          epochPoolSize: getHumanValue(new BigNumber(uniEpochPoolSize), 18), // TODO: get decimals from UNISWAP V2 contract
        },
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!assertValues(account, data.currentEpoch)) {
      return;
    }

    (async () => {
      const [
        daiBalance,
        usdcBalance,
        susdBalance,
        uniBalance,
        daiEpochUserBalance,
        usdcEpochUserBalance,
        susdEpochUserBalance,
        uniEpochUserBalance,
      ] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account, CONTRACT_DAI_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_USDC_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_SUSD_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_DAI_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_USDC_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_SUSD_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch] },
      ]);

      setData(prevState => ({
        ...prevState,
        dai: {
          ...prevState.dai,
          balance: getHumanValue(new BigNumber(daiBalance), 18), // TODO: get decimals from DAI contract
          epochUserBalance: getHumanValue(new BigNumber(daiEpochUserBalance), 18), // TODO: get decimals from DAI contract
        },
        usdc: {
          ...prevState.usdc,
          balance: getHumanValue(new BigNumber(usdcBalance), 6), // TODO: get decimals from USDC contract
          epochUserBalance: getHumanValue(new BigNumber(usdcEpochUserBalance), 6), // TODO: get decimals from USDC contract
        },
        susd: {
          ...prevState.susd,
          balance: getHumanValue(new BigNumber(susdBalance), 18), // TODO: get decimals from SUSD contract
          epochUserBalance: getHumanValue(new BigNumber(susdEpochUserBalance), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          balance: getHumanValue(new BigNumber(uniBalance), 18), // TODO: get decimals from UNISWAP V2 contract
          epochUserBalance: getHumanValue(new BigNumber(uniEpochUserBalance), 18), // TODO: get decimals from UNISWAP V2 contract
        },
      }));
    })();
  }, [account, data.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
}
