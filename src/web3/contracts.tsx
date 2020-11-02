import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, getHumanValue, getTokenMeta, ZERO_BIG_NUMBER } from 'web3/utils';
import { useYieldFarmContract, YieldFarmContractType } from 'web3/contracts/yieldFarm';
import { useYieldFarmLPContract, YieldFarmLPContractType } from 'web3/contracts/yieldFarmLP';
import { StakingContractType, useStakingContract } from 'web3/contracts/staking';
import { USDCContractType, USDCTokenMeta, useUSDCContract } from 'web3/contracts/usdc';
import { DAIContractType, DAITokenMeta, useDAIContract } from 'web3/contracts/dai';
import { SUSDContractType, SUSDTokenMeta, useSUSDContract } from 'web3/contracts/susd';
import { UNISWAPTokenMeta, UniswapV2ContractType, useUniswapV2Contract } from 'web3/contracts/uniswapV2';
import { BONDContractType, useBONDContract } from 'web3/contracts/bond';

type OptionalBigNumber = BigNumber | undefined;

export type Web3ContractsType = {
  yf: YieldFarmContractType;
  yflp: YieldFarmLPContractType;
  staking: StakingContractType;
  usdc: USDCContractType;
  dai: DAIContractType;
  susd: SUSDContractType;
  uniswapV2: UniswapV2ContractType;
  bond: BONDContractType;
  aggregated: {
    totalCurrentReward?: BigNumber;
    totalPotentialReward?: BigNumber;
    totalStaked?: BigNumber;
    totalEffectiveStaked?: BigNumber;
    lpStakedValue?: BigNumber;
    lpEffectiveStakedValue?: BigNumber;
    mylpStakedValue?: BigNumber;
    mylpEffectiveStakedValue?: BigNumber;
    bondReward?: BigNumber;
    totalBondReward?: BigNumber;
    bondPrice?: BigNumber;
  };
  getTokenUsdValue(token: string, value?: BigNumber): OptionalBigNumber;
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({} as any);

export function useWeb3Contracts(): Web3ContractsType {
  return React.useContext(Web3ContractsContext);
}

const Web3ContractsProvider: React.FunctionComponent = props => {
  const yfContract = useYieldFarmContract();
  const yflpContract = useYieldFarmLPContract();
  const stakingContract = useStakingContract();
  const daiContract = useDAIContract();
  const usdcContract = useUSDCContract();
  const susdContract = useSUSDContract();
  const bondContract = useBONDContract();
  const uniswapV2Contract = useUniswapV2Contract();

  function getTokenUsdValue(tokenAddr: string, value?: BigNumber): OptionalBigNumber {
    const tokenMeta = getTokenMeta(tokenAddr);

    if (!assertValues(value, tokenMeta)) {
      return undefined;
    }

    let multiplier: OptionalBigNumber;

    switch (tokenMeta?.address) {
      case USDCTokenMeta.address:
        multiplier = yfTokenValue();
        break;
      case DAITokenMeta.address:
        multiplier = yfTokenValue();
        break;
      case SUSDTokenMeta.address:
        multiplier = yfTokenValue();
        break;
      case UNISWAPTokenMeta.address:
        multiplier = yflpTokenValue();
        break;
      default:
        return undefined;
    }

    return getHumanValue(value, tokenMeta.decimals)
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
    const poolSize = yfContract.nextPoolSize;
    const tokenValue = yfTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function yflpStakedValue() {
    const poolSize = yflpContract.nextPoolSize;
    const tokenValue = yflpTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function yfEffectiveStakedValue() {
    const poolSize = yfContract.poolSize;
    const tokenValue = yfTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function yflpEffectiveStakedValue() {
    const poolSize = yflpContract.poolSize;
    const tokenValue = yflpTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function mylpStakedValue() {
    const poolSize = yflpContract.nextEpochStake;
    const tokenValue = yflpTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function mylpEffectiveStakedValue() {
    const poolSize = yflpContract.epochStake;
    const tokenValue = yflpTokenValue();

    if (!assertValues(poolSize, tokenValue)) {
      return undefined;
    }

    return poolSize!.multipliedBy(tokenValue!);
  }

  function totalCurrentReward(): OptionalBigNumber {
    const yfCurrentReward = yfContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yfContract.currentReward;
    const yflpCurrentReward = yflpContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yflpContract.currentReward;

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

    if (!yfStaked) {
      return undefined;
    }

    return (yfStaked ?? ZERO_BIG_NUMBER).plus(yflpStaked ?? ZERO_BIG_NUMBER);
  }

  function totalEffectiveStaked(): OptionalBigNumber {
    const yfStaked = yfEffectiveStakedValue();
    const yflpStaked = yflpEffectiveStakedValue();

    if (!yfStaked) {
      return undefined;
    }

    return (yfStaked ?? ZERO_BIG_NUMBER).plus(yflpStaked ?? ZERO_BIG_NUMBER);
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

  const value = {
    yf: yfContract,
    yflp: yflpContract,
    staking: stakingContract,
    usdc: usdcContract,
    dai: daiContract,
    susd: susdContract,
    bond: bondContract,
    uniswapV2: uniswapV2Contract,
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
      get totalEffectiveStaked(): OptionalBigNumber {
        return totalEffectiveStaked();
      },
      get lpStakedValue(): OptionalBigNumber {
        return yflpStakedValue();
      },
      get lpEffectiveStakedValue(): OptionalBigNumber {
        return yflpEffectiveStakedValue();
      },
      get mylpStakedValue(): OptionalBigNumber {
        return mylpStakedValue();
      },
      get mylpEffectiveStakedValue(): OptionalBigNumber {
        return mylpEffectiveStakedValue();
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
    },
    getTokenUsdValue,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
