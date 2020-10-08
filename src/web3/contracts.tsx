import React, { FunctionComponent } from 'react';
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
import { assertValues, getHumanValue } from 'web3/utils';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();
const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();
const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase();
const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();
const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

type OptionalBigNumber = BigNumber | undefined;

export type Web3ContractsType = {
  yf: YieldFarmContract;
  yflp: YieldFarmLPContract;
  staking: StakingContract;
  dai: DAIContract;
  usdc: USDCContract;
  susd: SUSDContract;
  bond: BONDContract;
  uniswapV2: UniswapV2Contract;
  ethOracle: EthOracleContract;
  aggregated: {
    totalCurrentReward?: BigNumber;
    totalPotentialReward?: BigNumber;
    totalStaked?: BigNumber;
    totalStakedInETH?: BigNumber;
    bondReward?: BigNumber;
    totalBondReward?: BigNumber;
    bondPrice?: BigNumber;
    poolBalanceUDS?: BigNumber;
    effectivePoolBalanceUDS?: BigNumber;
    poolBalanceUDSShares?: number[] | undefined;
    myPoolBalanceUDS?: BigNumber;
    myEffectivePoolBalanceUDS?: BigNumber;
    poolBalanceUNI?: BigNumber;
    effectivePoolBalanceUNI?: BigNumber;
    myPoolBalanceUNI?: BigNumber;
    myEffectivePoolBalanceUNI?: BigNumber;
  };
  getTokenHumanValue(token: string, value?: BigNumber): OptionalBigNumber;
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({} as any);

export function useWeb3Contracts(): Web3ContractsType {
  return React.useContext(Web3ContractsContext);
}

export type TokenInfo = {
  address: string;
  icon: React.FunctionComponent;
};

export const UDS_TOKENS = new Map<string, TokenInfo>([
  ['USDC', {
    address: CONTRACT_USDC_ADDR,
    icon: USDCIcon,
  }],
  ['DAI', {
    address: CONTRACT_DAI_ADDR,
    icon: DAIIcon,
  }],
  ['sUSD', {
    address: CONTRACT_SUSD_ADDR,
    icon: SUSDIcon,
  }],
]);

export const LP_TOKENS = new Map<string, TokenInfo>([
  ['USDC_BOND_UNI_LP', {
    address: CONTRACT_UNISWAP_V2_ADDR,
    icon: SUSDIcon,
  }],
]);

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

  function getTokenHumanValue(token: string, value?: BigNumber): OptionalBigNumber {
    let decimals: number | undefined;
    let multiplier: OptionalBigNumber;

    switch (token.toLowerCase()) {
      case CONTRACT_DAI_ADDR:
        decimals = daiContract.decimals;
        break;
      case CONTRACT_USDC_ADDR:
        decimals = usdcContract.decimals;
        break;
      case CONTRACT_SUSD_ADDR:
        decimals = susdContract.decimals;
        break;
      case CONTRACT_BOND_ADDR:
        decimals = bondContract.decimals;
        break;
      case CONTRACT_UNISWAP_V2_ADDR:
        decimals = uniswapV2Contract.decimals;
        multiplier = yflpTokenValue();
        break;
      default:
        return undefined;
    }

    if (!assertValues(value, decimals)) {
      return undefined;
    }

    return getHumanValue(value, decimals)
      ?.multipliedBy(multiplier ?? 1);
  }

  function yfTokenValue(): OptionalBigNumber {
    return new BigNumber(1);
  }

  function yflpTokenValue(): OptionalBigNumber {
    const usdcReserve = uniswapV2Contract?.usdcReserve;
    const uniTotalSupply = uniswapV2Contract?.totalSupply;

    if (!assertValues(usdcReserve, uniTotalSupply)) {
      return undefined;
    }

    return usdcReserve!
      .div(uniTotalSupply!)
      .multipliedBy(2);
  }

  function yfStakedValue() {
    const poolSize = yfContract.poolSize;
    const tokenValue = yfTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function yflpStakedValue() {
    const poolSize = yflpContract.poolSize;
    const tokenValue = yflpTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function totalCurrentReward(): OptionalBigNumber {
    const yfCurrentReward = yfContract.currentReward;
    const yflpCurrentReward = yflpContract.currentReward;

    if (!assertValues(yfCurrentReward, yflpCurrentReward)) {
      return undefined;
    }

    return yfCurrentReward!.plus(yflpCurrentReward!);
  }

  function totalPotentialReward(): OptionalBigNumber {
    const yfPotentialReward = yfContract.potentialReward;
    const yflpPotentialReward = yflpContract.potentialReward;

    if (!assertValues(yfPotentialReward, yflpPotentialReward)) {
      return undefined;
    }

    return yfPotentialReward!.plus(yflpPotentialReward!);
  }

  function totalStaked(): OptionalBigNumber {
    const yfStaked = yfStakedValue();
    const yflpStaked = yflpStakedValue();

    if (!assertValues(yfStaked, yflpStaked)) {
      return undefined;
    }

    return yfStaked!.plus(yflpStaked!);
  }

  function totalStakedInETH(): OptionalBigNumber {
    const staked = totalStaked();
    const ethValue = ethOracleContract.value;

    if (!assertValues(staked, ethValue)) {
      return undefined;
    }

    return staked!.div(ethValue!);
  }

  function bondReward(): OptionalBigNumber {
    const yfbBondReward = yfContract.bondReward;
    const yflpBondReward = yflpContract.bondReward;

    if (!assertValues(yfbBondReward, yflpBondReward)) {
      return undefined;
    }

    return yfbBondReward!.plus(yflpBondReward!);
  }

  function totalBondReward(): OptionalBigNumber {
    const yfTotalRewards = yfContract.totalRewards;
    const yflpTotalRewards = yflpContract.totalRewards;

    if (!assertValues(yfTotalRewards, yflpTotalRewards)) {
      return undefined;
    }

    return yfTotalRewards!.plus(yflpTotalRewards!);
  }

  function bondPrice(): OptionalBigNumber {
    const bondReserve = uniswapV2Contract.bondReserve;
    const usdcReserve = uniswapV2Contract.usdcReserve;

    if (!assertValues(bondReserve, usdcReserve)) {
      return undefined;
    }

    return usdcReserve!.div(bondReserve!);
  }

  function poolBalanceUDS(): OptionalBigNumber {
    // const usdcPoolSize = stakingContract.usdc.epochPoolSize;
    // const daiPoolSize = stakingContract.dai.epochPoolSize;
    // const susdPoolSize = stakingContract.susd.epochPoolSize;
    //
    // if (!assertValues(usdcPoolSize, daiPoolSize, susdPoolSize)) {
    //   return undefined;
    // }
    //
    // return usdcPoolSize!
    //   .plus(daiPoolSize!)
    //   .plus(susdPoolSize!);
    //
    return yfContract.nextPoolSize;
  }

  function effectivePoolBalanceUDS(): OptionalBigNumber {
    return yfContract.poolSize;
  }

  function poolBalanceUDSShares(): number[] | undefined {
    const usdcPoolSize = stakingContract.usdc.epochPoolSize;
    const daiPoolSize = stakingContract.dai.epochPoolSize;
    const susdPoolSize = stakingContract.susd.epochPoolSize;
    const totalBalance = poolBalanceUDS();

    if (!assertValues(usdcPoolSize, daiPoolSize, susdPoolSize, totalBalance)) {
      return undefined;
    }

    return [
      usdcPoolSize!.multipliedBy(100).div(totalBalance!).toNumber(),
      daiPoolSize!.multipliedBy(100).div(totalBalance!).toNumber(),
      susdPoolSize!.multipliedBy(100).div(totalBalance!).toNumber(),
    ];
  }

  function myPoolBalanceUDS(): OptionalBigNumber {
    // const usdcEpochUserBalance = stakingContract.usdc.epochUserBalance;
    // const daiEpochUserBalance = stakingContract.dai.epochUserBalance;
    // const susdEpochUserBalance = stakingContract.susd.epochUserBalance;
    //
    // if (!assertValues(usdcEpochUserBalance, daiEpochUserBalance, susdEpochUserBalance)) {
    //   return undefined;
    // }
    //
    // return usdcEpochUserBalance!
    //   .plus(daiEpochUserBalance!)
    //   .plus(susdEpochUserBalance!);
    return yfContract.nextEpochStake;
  }

  function myEffectivePoolBalanceUDS(): OptionalBigNumber {
    return yfContract.epochStake;
  }

  function poolBalanceUNI(): OptionalBigNumber {
    // const uniEpochPoolSize = stakingContract.uniswap_v2.epochPoolSize;
    //
    // if (!assertValues(uniEpochPoolSize)) {
    //   return undefined;
    // }
    //
    // return uniEpochPoolSize;
    return yflpContract.nextPoolSize;
  }

  function effectivePoolBalanceUNI(): OptionalBigNumber {
    return yflpContract.poolSize;
  }

  function myPoolBalanceUNI(): OptionalBigNumber {
    // const uniEpochPoolSize = stakingContract.uniswap_v2.epochPoolSize;
    //
    // if (!assertValues(uniEpochPoolSize)) {
    //   return undefined;
    // }
    //
    // return uniEpochPoolSize;

    return yflpContract.nextEpochStake;
  }

  function myEffectivePoolBalanceUNI(): OptionalBigNumber {
    return yflpContract.epochStake;
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
      get totalCurrentReward(): OptionalBigNumber {
        return totalCurrentReward();
      },
      get totalPotentialReward(): OptionalBigNumber {
        return totalPotentialReward();
      },
      get totalStaked(): OptionalBigNumber {
        return totalStaked();
      },
      get totalStakedInETH(): OptionalBigNumber {
        return totalStakedInETH();
      },
      get bondReward(): OptionalBigNumber {
        return bondReward();
      },
      get totalBondReward(): OptionalBigNumber {
        return totalBondReward();
      },
      get bondPrice(): OptionalBigNumber {
        return bondPrice();
      },
      get poolBalanceUDS(): OptionalBigNumber {
        return poolBalanceUDS();
      },
      get effectivePoolBalanceUDS(): OptionalBigNumber {
        return effectivePoolBalanceUDS();
      },
      get poolBalanceUDSShares(): number[] | undefined {
        return poolBalanceUDSShares();
      },
      get myPoolBalanceUDS(): OptionalBigNumber {
        return myPoolBalanceUDS();
      },
      get myEffectivePoolBalanceUDS(): OptionalBigNumber {
        return myEffectivePoolBalanceUDS();
      },
      get poolBalanceUNI(): OptionalBigNumber {
        return poolBalanceUNI();
      },
      get effectivePoolBalanceUNI(): OptionalBigNumber {
        return effectivePoolBalanceUNI();
      },
      get myPoolBalanceUNI(): OptionalBigNumber {
        return myPoolBalanceUNI();
      },
      get myEffectivePoolBalanceUNI(): OptionalBigNumber {
        return myEffectivePoolBalanceUNI();
      },
    },
    getTokenHumanValue,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
