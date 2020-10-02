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
import { getHumanValue } from 'web3/utils';

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
    totalStacked?: BigNumber;
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

  function totalStacked(): BigNumber | undefined {
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
    const a = stakingContract?.dai.poolSize;
    const b = stakingContract?.susd.poolSize;
    const c = stakingContract?.usdc.poolSize;

    if (!a || !b || !c) {
      return undefined;
    }

    const d = new BigNumber(10).pow(daiContract?.decimals || 0);
    const e = new BigNumber(10).pow(susdContract?.decimals || 0);
    const f = new BigNumber(10).pow(usdcContract?.decimals || 0);

    return a.div(d).plus(b.div(e)).plus(c.div(f));
  }

  function poolBalanceDUSShares(): number[] | undefined {
    const a = stakingContract?.dai.poolSize;
    const b = stakingContract?.susd.poolSize;
    const c = stakingContract?.usdc.poolSize;

    if (!a || !b || !c) {
      return undefined;
    }

    const total = poolBalanceDUS();

    if (!total) {
      return undefined;
    }

    return [
      parseFloat(c.multipliedBy(100).div(total).toFormat(3)),
      parseFloat(a.multipliedBy(100).div(total).toFormat(3)),
      parseFloat(b.multipliedBy(100).div(total).toFormat(3)),
    ];
  }

  function myPoolBalanceDUS(): BigNumber | undefined {
    const a = stakingContract?.dai.epochUserBalance;
    const b = stakingContract?.susd.epochUserBalance;
    const c = stakingContract?.usdc.epochUserBalance;

    if (!a || !b || !c) {
      return undefined;
    }

    const d = new BigNumber(10).pow(daiContract?.decimals || 0);
    const e = new BigNumber(10).pow(susdContract?.decimals || 0);
    const f = new BigNumber(10).pow(usdcContract?.decimals || 0);

    return a.div(d).plus(b.div(e)).plus(c.div(f));
  }

  function poolBalanceUB(): BigNumber | undefined {
    const a = stakingContract?.uniswap_v2.poolSize;

    if (!a) {
      return undefined;
    }

    const d = new BigNumber(10).pow(uniswapV2Contract?.decimals || 0);

    return a.div(d);
  }

  function myPoolBalanceUB(): BigNumber | undefined {
    const a = stakingContract?.uniswap_v2.epochUserBalance;

    if (!a) {
      return undefined;
    }

    const d = new BigNumber(10).pow(uniswapV2Contract?.decimals || 0);

    return a.div(d);
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
      get totalStacked(): BigNumber | undefined {
        return totalStacked();
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
