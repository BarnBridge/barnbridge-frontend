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
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  usdc: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  susd: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
  uniswap_v2: {
    epochPoolSize?: BigNumber;
    nextEpochPoolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
    nextEpochUserBalance?: BigNumber;
  };
};

const InitialDataState: StakingContract = {
  currentEpoch: undefined,
  epochEnd: undefined,
  dai: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  usdc: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  susd: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
  },
  uniswap_v2: {
    epochPoolSize: undefined,
    nextEpochPoolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
    nextEpochUserBalance: undefined,
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

      const [
        daiEpochPoolSize,
        daiNextEpochPoolSize,
        usdcEpochPoolSize,
        usdcNextEpochPoolSize,
        susdEpochPoolSize,
        susdNextEpochPoolSize,
        uniEpochPoolSize,
        uniNextEpochPoolSize,
      ] = await batchContract(Contract, [
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_DAI_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_DAI_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_USDC_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_USDC_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_SUSD_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_SUSD_ADDR, currentEpoch + 1] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_UNISWAP_V2_ADDR, currentEpoch] },
        { method: 'getEpochPoolSize', methodArgs: [CONTRACT_UNISWAP_V2_ADDR, currentEpoch + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        currentEpoch: Number(currentEpoch),
        epochEnd: (Number(epoch1Start) + (Number(currentEpoch) * Number(epochDuration))) * 1000,
        dai: {
          ...prevState.dai,
          epochPoolSize: getHumanValue(new BigNumber(daiEpochPoolSize), 18), // TODO: get decimals from DAI contract
          nextEpochPoolSize: getHumanValue(new BigNumber(daiNextEpochPoolSize), 18), // TODO: get decimals from DAI contract
        },
        usdc: {
          ...prevState.usdc,
          epochPoolSize: getHumanValue(new BigNumber(usdcEpochPoolSize), 6), // TODO: get decimals from USDC contract
          nextEpochPoolSize: getHumanValue(new BigNumber(usdcNextEpochPoolSize), 6), // TODO: get decimals from USDC contract
        },
        susd: {
          ...prevState.susd,
          epochPoolSize: getHumanValue(new BigNumber(susdEpochPoolSize), 18), // TODO: get decimals from SUSD contract
          nextEpochPoolSize: getHumanValue(new BigNumber(susdNextEpochPoolSize), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          epochPoolSize: getHumanValue(new BigNumber(uniEpochPoolSize), 18), // TODO: get decimals from UNISWAP V2 contract
          nextEpochPoolSize: getHumanValue(new BigNumber(uniNextEpochPoolSize), 18), // TODO: get decimals from UNISWAP V2 contract
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
        daiNextEpochUserBalance,
        usdcEpochUserBalance,
        usdcNextEpochUserBalance,
        susdEpochUserBalance,
        susdNextEpochUserBalance,
        uniEpochUserBalance,
        uniNextEpochUserBalance,
      ] = await batchContract(Contract, [
        { method: 'balanceOf', methodArgs: [account, CONTRACT_DAI_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_USDC_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_SUSD_ADDR] },
        { method: 'balanceOf', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_DAI_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_DAI_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_USDC_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_USDC_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_SUSD_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_SUSD_ADDR, data.currentEpoch! + 1] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch] },
        { method: 'getEpochUserBalance', methodArgs: [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch! + 1] },
      ]);

      setData(prevState => ({
        ...prevState,
        dai: {
          ...prevState.dai,
          balance: getHumanValue(new BigNumber(daiBalance), 18), // TODO: get decimals from DAI contract
          epochUserBalance: getHumanValue(new BigNumber(daiEpochUserBalance), 18), // TODO: get decimals from DAI contract
          nextEpochUserBalance: getHumanValue(new BigNumber(daiNextEpochUserBalance), 18), // TODO: get decimals from DAI contract
        },
        usdc: {
          ...prevState.usdc,
          balance: getHumanValue(new BigNumber(usdcBalance), 6), // TODO: get decimals from USDC contract
          epochUserBalance: getHumanValue(new BigNumber(usdcEpochUserBalance), 6), // TODO: get decimals from USDC contract
          nextEpochUserBalance: getHumanValue(new BigNumber(usdcNextEpochUserBalance), 6), // TODO: get decimals from USDC contract
        },
        susd: {
          ...prevState.susd,
          balance: getHumanValue(new BigNumber(susdBalance), 18), // TODO: get decimals from SUSD contract
          epochUserBalance: getHumanValue(new BigNumber(susdEpochUserBalance), 18), // TODO: get decimals from SUSD contract
          nextEpochUserBalance: getHumanValue(new BigNumber(susdNextEpochUserBalance), 18), // TODO: get decimals from SUSD contract
        },
        uniswap_v2: {
          ...prevState.uniswap_v2,
          balance: getHumanValue(new BigNumber(uniBalance), 18), // TODO: get decimals from UNISWAP V2 contract
          epochUserBalance: getHumanValue(new BigNumber(uniEpochUserBalance), 18), // TODO: get decimals from UNISWAP V2 contract
          nextEpochUserBalance: getHumanValue(new BigNumber(uniNextEpochUserBalance), 18), // TODO: get decimals from UNISWAP V2 contract
        },
      }));
    })();
  }, [account, data.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
}
