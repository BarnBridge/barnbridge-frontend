import React from 'react';
import BigNumber from 'bignumber.js';
import { batchCallContract, callContract, createContract } from 'web3/utils';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR);
const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR);
const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR);
const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR);

export type StakingContract = {
  currentEpoch?: number;
  epochEnd?: number;
  dai: {
    poolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  usdc: {
    poolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  susd: {
    poolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
  uniswap_v2: {
    poolSize?: BigNumber;
    balance?: BigNumber;
    epochUserBalance?: BigNumber;
  };
};

const Contract = createContract(
  require('web3/abi/staking.json'),
  String(process.env.REACT_APP_CONTRACT_STAKING_ADDR),
);

const InitialDataState: StakingContract = {
  currentEpoch: undefined,
  epochEnd: undefined,
  dai: {
    poolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  usdc: {
    poolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  susd: {
    poolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
  uniswap_v2: {
    poolSize: undefined,
    balance: undefined,
    epochUserBalance: undefined,
  },
};

export function useStakingContract(account?: string): StakingContract {
  const [data, setData] = React.useState<StakingContract>(InitialDataState);

  React.useEffect(() => {
    (async () => {
      const [currentEpoch, epoch1Start, epochDuration] = await batchCallContract(Contract,
        ['getCurrentEpoch', 'epoch1Start', 'epochDuration']);
      const daiPoolSize = await callContract(Contract, 'getEpochPoolSize',
        [CONTRACT_DAI_ADDR, currentEpoch]);
      const usdcPoolSize = await callContract(Contract, 'getEpochPoolSize',
        [CONTRACT_USDC_ADDR, currentEpoch]);
      const susdPoolSize = await callContract(Contract, 'getEpochPoolSize',
        [CONTRACT_SUSD_ADDR, currentEpoch]);
      const uniswapV2PoolSize = await callContract(Contract, 'getEpochPoolSize',
        [CONTRACT_UNISWAP_V2_ADDR, currentEpoch]);

      setData(prevState => ({
        ...prevState!,
        currentEpoch: Number(currentEpoch),
        epochEnd: (Number(epoch1Start) + (Number(currentEpoch) * Number(epochDuration))) * 1000,
        dai: {
          ...prevState?.dai!,
          poolSize: new BigNumber(daiPoolSize),
        },
        usdc: {
          ...prevState?.usdc!,
          poolSize: new BigNumber(usdcPoolSize),
        },
        susd: {
          ...prevState?.susd!,
          poolSize: new BigNumber(susdPoolSize),
        },
        uniswap_v2: {
          ...prevState?.uniswap_v2!,
          poolSize: new BigNumber(uniswapV2PoolSize),
        },
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account || !data?.currentEpoch) {
      return;
    }

    (async () => {
      const daiBalance = await callContract(Contract, 'balanceOf',
        [account, CONTRACT_DAI_ADDR]);
      const usdcBalance = await callContract(Contract, 'balanceOf',
        [account, CONTRACT_USDC_ADDR]);
      const susdBalance = await callContract(Contract, 'balanceOf',
        [account, CONTRACT_SUSD_ADDR]);
      const uniswapV2Balance = await callContract(Contract, 'balanceOf',
        [account, CONTRACT_UNISWAP_V2_ADDR]);

      const daiEpochUserBalance = await callContract(Contract, 'getEpochUserBalance',
        [account, CONTRACT_DAI_ADDR, data.currentEpoch]);
      const usdcEpochUserBalance = await callContract(Contract, 'getEpochUserBalance',
        [account, CONTRACT_USDC_ADDR, data.currentEpoch]);
      const susdEpochUserBalance = await callContract(Contract, 'getEpochUserBalance',
        [account, CONTRACT_SUSD_ADDR, data.currentEpoch]);
      const uniswapV2EpochUserBalance = await callContract(Contract, 'getEpochUserBalance',
        [account, CONTRACT_UNISWAP_V2_ADDR, data.currentEpoch]);

      setData(prevState => ({
        ...prevState!,
        dai: {
          ...prevState?.dai!,
          balance: new BigNumber(daiBalance),
          epochUserBalance: new BigNumber(daiEpochUserBalance),
        },
        usdc: {
          ...prevState?.usdc!,
          balance: new BigNumber(usdcBalance),
          epochUserBalance: new BigNumber(usdcEpochUserBalance),
        },
        susd: {
          ...prevState?.susd!,
          balance: new BigNumber(susdBalance),
          epochUserBalance: new BigNumber(susdEpochUserBalance),
        },
        uniswap_v2: {
          ...prevState?.uniswap_v2!,
          balance: new BigNumber(uniswapV2Balance),
          epochUserBalance: new BigNumber(uniswapV2EpochUserBalance),
        },
      }));
    })();
  }, [account, data?.currentEpoch]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
}
