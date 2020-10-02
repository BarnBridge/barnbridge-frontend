import React from 'react';
import BigNumber from 'bignumber.js';

import { useWeb3 } from 'web3/provider';
import { useYieldFarmContract, YieldFarmContract } from 'web3/contracts/yieldFarm';
import { useYieldFarmLPContract, YieldFarmLPContract } from 'web3/contracts/yieldFarmLP';
import { StakingContract, useStakingContract } from 'web3/contracts/staking';
import { DAIContract, useDAIContract } from 'web3/contracts/dai';
import { USDCContract, useUSDCContract } from 'web3/contracts/usdc';
import { SUSDContract, useSUSDContract } from 'web3/contracts/susd';
import { BONDContract, useBONDContract } from 'web3/contracts/bond';
import { UniswapV2Contract, useUniswapV2Contract } from 'web3/contracts/uniswapV2';
import { EthOracleContract, useETHOracleContract } from 'web3/contracts/ethOracle';
import { assertValues, getExponentValue, getHumanValue } from 'web3/utils';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();
const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();
const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase();
const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();
const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

export type Web3ContractsType = {
  yf?: YieldFarmContract;
  yflp?: YieldFarmLPContract;
  staking?: StakingContract;
  dai?: DAIContract;
  usdc?: USDCContract;
  susd?: SUSDContract;
  bond?: BONDContract;
  uniswapV2?: UniswapV2Contract;
  ethOracle?: EthOracleContract;
  aggregated: {
    currentReward?: BigNumber;
    potentialReward?: BigNumber;
    lpTokenValue?: BigNumber;
    totalStaked?: BigNumber;
    bondReward?: BigNumber;
    totalBondReward?: BigNumber;
    poolBalanceDUS?: BigNumber;
    poolBalanceDUSShares?: number[];
    myPoolBalanceDUS?: BigNumber;
    poolBalanceUB?: BigNumber;
    myPoolBalanceUB?: BigNumber;
  };
  getContractByToken(token: string): any | undefined;
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({
  aggregated: {},
  getContractByToken: () => undefined,
});

export function useWeb3Contracts(): Web3ContractsType {
  return React.useContext(Web3ContractsContext);
}

const Web3ContractsProvider: React.FunctionComponent = props => {
  const { account } = useWeb3();

  const yfContract = useYieldFarmContract(account);
  const yflpContract = useYieldFarmLPContract(account);
  const stakingContract = useStakingContract(account);
  const daiContract = useDAIContract(account);
  const usdcContract = useUSDCContract(account);
  const susdContract = useSUSDContract(account);
  const bondContract = useBONDContract(account);
  const uniswapV2Contract = useUniswapV2Contract(account);
  const ethOracleContract = useETHOracleContract();

  function getContractByToken(token: string): any | undefined {
    switch (token.toLowerCase()) {
      case CONTRACT_DAI_ADDR:
        return daiContract;
      case CONTRACT_USDC_ADDR:
        return usdcContract;
      case CONTRACT_SUSD_ADDR:
        return susdContract;
      case CONTRACT_BOND_ADDR:
        return bondContract;
      case CONTRACT_UNISWAP_V2_ADDR:
        return uniswapV2Contract;
      default:
        return undefined;
    }
  }

  function currentReward(): BigNumber {
    const yfReward = yfContract?.currentReward ?? new BigNumber(0);
    const yflpReward = yflpContract?.currentReward ?? new BigNumber(0);

    return yfReward.plus(yflpReward);
  }

  function potentialReward(): BigNumber | undefined {
    if (!yfContract || !yflpContract) {
      return undefined;
    }

    const yf_pr = !yfContract.poolSize?.eq(0) ? yfContract.epochStake
      ?.div(yfContract.poolSize!)
      ?.multipliedBy(yfContract.epochReward!) : new BigNumber(0);

    const yflp_pr = !yflpContract.poolSize?.eq(0) ? yflpContract.epochStake
      ?.div(yflpContract.poolSize!)
      ?.multipliedBy(yflpContract.epochReward!) : new BigNumber(0);

    return yf_pr?.plus(yflp_pr!);
  }

  function lpTokenValue(): BigNumber | undefined {
    const ubReserve = uniswapV2Contract?.reserves?.[0];
    const ubTotalSupply = uniswapV2Contract?.totalSupply;
    const usdcDecimals = usdcContract?.decimals;

    if (!ubReserve || !ubTotalSupply || !usdcDecimals) {
      return undefined;
    }

    return getHumanValue(ubReserve, usdcDecimals)
      ?.div(ubTotalSupply)
      .multipliedBy(2);
  }

  function totalStaked(): BigNumber | undefined {
    const yfPoolSize = yfContract?.poolSize;
    const yflpPoolSize = yflpContract?.poolSize;
    const tokenValue = lpTokenValue();

    if (!yfPoolSize || !yflpPoolSize || !tokenValue) {
      return undefined;
    }

    return yfPoolSize.plus(yflpPoolSize.multipliedBy(tokenValue));
  }

  function bondReward(): BigNumber | undefined {
    const yfEpochReward = yfContract?.epochReward;
    const yfPrevEpoch = (yfContract?.currentEpoch || 1) - 1;
    const yflpEpochReward = yflpContract?.epochReward;
    const yflpPrevEpoch = (yflpContract?.currentEpoch || 1) - 1;

    if (!yfEpochReward || !yflpEpochReward) {
      return undefined;
    }

    return yfEpochReward.multipliedBy(yfPrevEpoch)
      .plus(yflpEpochReward.multipliedBy(yflpPrevEpoch));
  }

  function totalBondReward(): BigNumber | undefined {
    const yfBondRewards = yfContract?.bondRewards;
    const yflpBondRewards = yflpContract?.bondRewards;

    if (!yfBondRewards || !yflpBondRewards) {
      return undefined;
    }

    return yfBondRewards.plus(yflpBondRewards);
  }

  function poolBalanceDUS(): BigNumber | undefined {
    const daiPoolSize = stakingContract?.dai.poolSize;
    const daiDecimals = daiContract?.decimals;

    const usdcPoolSize = stakingContract?.usdc.poolSize;
    const usdcDecimals = usdcContract?.decimals;

    const susdPoolSize = stakingContract?.susd.poolSize;
    const susdDecimals = susdContract?.decimals;

    if (!assertValues(
      daiPoolSize,
      daiDecimals,
      usdcPoolSize,
      usdcDecimals,
      susdPoolSize,
      susdDecimals,
    )) {
      return undefined;
    }

    const daiBalance = daiPoolSize!.div(getExponentValue(daiDecimals));
    const usdcBalance = usdcPoolSize!.div(getExponentValue(usdcDecimals));
    const susdBalance = susdPoolSize!.div(getExponentValue(susdDecimals));

    return daiBalance.plus(usdcBalance).plus(susdBalance);
  }

  function poolBalanceDUSShares(): number[] | undefined {
    const daiPoolSize = stakingContract?.dai.poolSize;
    const usdcPoolSize = stakingContract?.usdc.poolSize;
    const susdPoolSize = stakingContract?.susd.poolSize;

    if (!daiPoolSize || !usdcPoolSize || !susdPoolSize) {
      return undefined;
    }

    const total = poolBalanceDUS();

    if (!total) {
      return undefined;
    }

    return [
      parseFloat(daiPoolSize.multipliedBy(100).div(total).toFormat(3)),
      parseFloat(usdcPoolSize.multipliedBy(100).div(total).toFormat(3)),
      parseFloat(susdPoolSize.multipliedBy(100).div(total).toFormat(3)),
    ];
  }

  function myPoolBalanceDUS(): BigNumber | undefined {
    const daiEpochUserBalance = stakingContract?.dai.epochUserBalance;
    const daiDecimals = daiContract?.decimals;

    const usdcEpochUserBalance = stakingContract?.usdc.epochUserBalance;
    const usdcDecimals = usdcContract?.decimals;

    const susdEpochUserBalance = stakingContract?.susd.epochUserBalance;
    const susdDecimals = susdContract?.decimals;

    if (!assertValues(
      daiEpochUserBalance,
      daiDecimals,
      usdcEpochUserBalance,
      usdcDecimals,
      susdEpochUserBalance,
      susdDecimals,
    )) {
      return undefined;
    }

    const daiBalance = daiEpochUserBalance!.div(getExponentValue(daiDecimals));
    const usdcBalance = usdcEpochUserBalance!.div(getExponentValue(usdcDecimals));
    const susdBalance = susdEpochUserBalance!.div(getExponentValue(susdDecimals));

    return daiBalance.plus(usdcBalance).plus(susdBalance);
  }

  function poolBalanceUB(): BigNumber | undefined {
    const uniswapV2PoolSize = stakingContract?.uniswap_v2.poolSize;
    const uniswapV2Decimals = uniswapV2Contract?.decimals;

    if (!assertValues(uniswapV2PoolSize, uniswapV2Decimals)) {
      return undefined;
    }

    return uniswapV2PoolSize!.div(getExponentValue(uniswapV2Decimals));
  }

  function myPoolBalanceUB(): BigNumber | undefined {
    const uniswapV2EpochUserBalance = stakingContract?.uniswap_v2.poolSize;
    const uniswapV2Decimals = uniswapV2Contract?.decimals;

    if (!assertValues(uniswapV2EpochUserBalance, uniswapV2Decimals)) {
      return undefined;
    }

    return uniswapV2EpochUserBalance!.div(getExponentValue(uniswapV2Decimals));
  }

  const value = {
    yf: yfContract,
    yflp: yflpContract,
    staking: stakingContract,
    usdc: usdcContract,
    dai: daiContract,
    susd: susdContract,
    bond: bondContract,
    uniswapV2: uniswapV2Contract,
    ethOracle: ethOracleContract,
    aggregated: {
      get currentReward(): BigNumber {
        return currentReward();
      },
      get potentialReward(): BigNumber | undefined {
        return potentialReward();
      },
      get lpTokenValue(): BigNumber | undefined {
        return lpTokenValue();
      },
      get totalStaked(): BigNumber | undefined {
        return totalStaked();
      },
      get bondReward(): BigNumber | undefined {
        return bondReward();
      },
      get totalBondReward(): BigNumber | undefined {
        return totalBondReward();
      },
      get poolBalanceDUS(): BigNumber | undefined {
        return poolBalanceDUS();
      },
      get poolBalanceDUSShares(): number[] | undefined {
        return poolBalanceDUSShares();
      },
      get myPoolBalanceDUS(): BigNumber | undefined {
        return myPoolBalanceDUS();
      },
      get poolBalanceUB(): BigNumber | undefined {
        return poolBalanceUB();
      },
      get myPoolBalanceUB(): BigNumber | undefined {
        return myPoolBalanceUB();
      },
    },
    getContractByToken,
  };

  console.log(value);

  return (
    <Web3ContractsContext.Provider value={value}>
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
