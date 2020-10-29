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
import { assertValues, getHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

export const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();
export const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();
export const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase();
export const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();
export const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase();

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
    totalEffectiveStaked?: BigNumber;
    totalStakedInETH?: BigNumber;
    lpStakedValue?: BigNumber;
    lpEffectiveStakedValue?: BigNumber;
    mylpStakedValue?: BigNumber;
    mylpEffectiveStakedValue?: BigNumber;
    bondReward?: BigNumber;
    totalBondReward?: BigNumber;
    bondPrice?: BigNumber;
  };
  getTokenHumanValue(token: string, value?: BigNumber): OptionalBigNumber;
  getTokenUsdValue(token: string, value?: BigNumber): OptionalBigNumber;
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({} as any);

export function useWeb3Contracts(): Web3ContractsType {
  return React.useContext(Web3ContractsContext);
}

export const STABLE_ICON_SET = [USDCIcon, DAIIcon, SUSDIcon];
export const LP_ICON_SET = [UNISWAPIcon];

export const TOKEN_USDC_KEY = 'USDC';
export const TOKEN_DAI_KEY = 'DAI';
export const TOKEN_SUSD_KEY = 'sUSD';
export const TOKEN_UNISWAP_KEY = 'USDC_BOND_UNI_LP';

export type TokenKeys = 'USDC' | 'DAI' | 'sUSD' | 'USDC_BOND_UNI_LP';

export type TokenInfo = {
  address: string;
  icon: React.ReactNode;
  name: string;
  decimals: number;
};

export const TOKENS_MAP = new Map<TokenKeys, TokenInfo>([
  [TOKEN_USDC_KEY, {
    address: CONTRACT_USDC_ADDR,
    icon: <USDCIcon />,
    name: TOKEN_USDC_KEY,
    decimals: 6,
  }],
  [TOKEN_DAI_KEY, {
    address: CONTRACT_DAI_ADDR,
    icon: <DAIIcon />,
    name: TOKEN_DAI_KEY,
    decimals: 18,
  }],
  [TOKEN_SUSD_KEY, {
    address: CONTRACT_SUSD_ADDR,
    icon: <SUSDIcon />,
    name: TOKEN_SUSD_KEY,
    decimals: 18,
  }],
  [TOKEN_UNISWAP_KEY, {
    address: CONTRACT_UNISWAP_V2_ADDR,
    icon: <UNISWAPIcon />,
    name: TOKEN_UNISWAP_KEY,
    decimals: 18,
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

    switch (token.toLowerCase()) {
      case CONTRACT_USDC_ADDR:
        decimals = usdcContract.decimals;
        break;
      case CONTRACT_DAI_ADDR:
        decimals = daiContract.decimals;
        break;
      case CONTRACT_SUSD_ADDR:
        decimals = susdContract.decimals;
        break;
      case CONTRACT_UNISWAP_V2_ADDR:
        decimals = uniswapV2Contract.decimals;
        break;
      default:
        return undefined;
    }

    if (!assertValues(value, decimals)) {
      return undefined;
    }

    return getHumanValue(value, decimals);
  }

  function getTokenUsdValue(token: string, value?: BigNumber): OptionalBigNumber {
    let decimals: number | undefined;
    let multiplier: OptionalBigNumber;

    switch (token.toLowerCase()) {
      case CONTRACT_USDC_ADDR:
        decimals = usdcContract.decimals;
        multiplier = yfTokenValue();
        break;
      case CONTRACT_DAI_ADDR:
        decimals = daiContract.decimals;
        multiplier = yfTokenValue();
        break;
      case CONTRACT_SUSD_ADDR:
        decimals = susdContract.decimals;
        multiplier = yfTokenValue();
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

  function totalStakedInETH(): OptionalBigNumber {
    const staked = totalStaked();
    const ethValue = ethOracleContract.value;

    if (!assertValues(staked, ethValue)) {
      return undefined;
    }

    return staked!.div(ethValue!);
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
    getTokenHumanValue,
    getTokenUsdValue,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
