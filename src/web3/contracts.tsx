import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, getHumanValue, getTokenMeta, ZERO_BIG_NUMBER } from 'web3/utils';
import Web3Contract from 'web3/contract';
import { BONDContract, useBONDContract } from 'web3/contracts/bond';
import { USDCContract, USDCTokenMeta, useUSDCContract } from 'web3/contracts/usdc';
import { DAIContract, DAITokenMeta, useDAIContract } from 'web3/contracts/dai';
import { SUSDContract, SUSDTokenMeta, useSUSDContract } from 'web3/contracts/susd';
import { UNISWAPContract, UNISWAPTokenMeta, useUNISWAPContract } from 'web3/contracts/uniswap';
import { useYieldFarmContract, YieldFarmContract } from 'web3/contracts/yieldFarm';
import { useYieldFarmLPContract, YieldFarmLPContract } from 'web3/contracts/yieldFarmLP';
import { StakingContract, useStakingContract } from 'web3/contracts/staking';

import UserRejectedModal from 'components/user-rejected-modal';

export type Web3ContractsData = {
  bond: BONDContract;
  usdc: USDCContract;
  dai: DAIContract;
  susd: SUSDContract;
  uniswap: UNISWAPContract;
  yf: YieldFarmContract;
  yflp: YieldFarmLPContract;
  staking: StakingContract;
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
};

export type Web3ContractsMethods = {
  getTokenUsdValue(token: string, value?: BigNumber): BigNumber | undefined;
};

export type Web3Contracts = Web3ContractsData & Web3ContractsMethods;

const Web3ContractsContext = React.createContext<Web3Contracts>({} as any);

export function useWeb3Contracts(): Web3Contracts {
  return React.useContext(Web3ContractsContext);
}

const Web3ContractsProvider: React.FunctionComponent = props => {
  const bondContract = useBONDContract();
  const daiContract = useDAIContract();
  const usdcContract = useUSDCContract();
  const susdContract = useSUSDContract();
  const uniswapContract = useUNISWAPContract();
  const yfContract = useYieldFarmContract();
  const yflpContract = useYieldFarmLPContract();
  const stakingContract = useStakingContract();

  const [userRejectedVisible, setUserRejectedVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const contracts = [
      bondContract.contract,
      daiContract.contract,
      usdcContract.contract,
      susdContract.contract,
      uniswapContract.contract,
      yfContract.contract,
      yflpContract.contract,
      stakingContract.contract,
    ];

    function handleError(err: Error & { code: number }, contract: Web3Contract) {
      if (err.code === 4001) {
        setUserRejectedVisible(true);
      }
    }

    contracts.forEach((contract: Web3Contract) => {
      contract.on('error', handleError);
    });

    return () => {
      contracts.forEach((contract: Web3Contract) => {
        contract.off('error', handleError);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getTokenUsdValue(tokenAddr: string, value?: BigNumber): BigNumber | undefined {
    const tokenMeta = getTokenMeta(tokenAddr);

    if (!assertValues(value, tokenMeta)) {
      return undefined;
    }

    let multiplier: BigNumber | undefined;

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

  function yfTokenValue(): BigNumber | undefined {
    return new BigNumber(1);
  }

  function yflpTokenValue(): BigNumber | undefined {
    const usdcReserve = uniswapContract?.usdcReserve;
    const uniTotalSupply = uniswapContract?.totalSupply;

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

  function totalCurrentReward(): BigNumber | undefined {
    const yfCurrentReward = yfContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yfContract.currentReward;
    const yflpCurrentReward = yflpContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yflpContract.currentReward;

    if (!assertValues(yfCurrentReward, yflpCurrentReward)) {
      return undefined;
    }

    return yfCurrentReward!.plus(yflpCurrentReward!);
  }

  function totalPotentialReward(): BigNumber | undefined {
    const yfPotentialReward = yfContract.potentialReward;
    const yflpPotentialReward = yflpContract.potentialReward;

    if (!assertValues(yfPotentialReward, yflpPotentialReward)) {
      return undefined;
    }

    return yfPotentialReward!.plus(yflpPotentialReward!);
  }

  function totalStaked(): BigNumber | undefined {
    const yfStaked = yfStakedValue();
    const yflpStaked = yflpStakedValue();

    if (!yfStaked) {
      return undefined;
    }

    return (yfStaked ?? ZERO_BIG_NUMBER).plus(yflpStaked ?? ZERO_BIG_NUMBER);
  }

  function totalEffectiveStaked(): BigNumber | undefined {
    const yfStaked = yfEffectiveStakedValue();
    const yflpStaked = yflpEffectiveStakedValue();

    if (!yfStaked) {
      return undefined;
    }

    return (yfStaked ?? ZERO_BIG_NUMBER).plus(yflpStaked ?? ZERO_BIG_NUMBER);
  }

  function bondReward(): BigNumber | undefined {
    const yfbBondReward = yfContract.bondReward;
    const yflpBondReward = yflpContract.bondReward;

    if (!assertValues(yfbBondReward, yflpBondReward)) {
      return undefined;
    }

    return yfbBondReward!.plus(yflpBondReward!);
  }

  function totalBondReward(): BigNumber | undefined {
    const yfTotalRewards = yfContract.totalRewards;
    const yflpTotalRewards = yflpContract.totalRewards;

    if (!assertValues(yfTotalRewards, yflpTotalRewards)) {
      return undefined;
    }

    return yfTotalRewards!.plus(yflpTotalRewards!);
  }

  function bondPrice(): BigNumber | undefined {
    const bondReserve = uniswapContract.bondReserve;
    const usdcReserve = uniswapContract.usdcReserve;

    if (!assertValues(bondReserve, usdcReserve)) {
      return undefined;
    }

    return usdcReserve!.div(bondReserve!);
  }

  const value = {
    bond: bondContract,
    usdc: usdcContract,
    dai: daiContract,
    susd: susdContract,
    uniswap: uniswapContract,
    yf: yfContract,
    yflp: yflpContract,
    staking: stakingContract,
    aggregated: {
      get totalCurrentReward(): BigNumber | undefined {
        return totalCurrentReward();
      },
      get totalPotentialReward(): BigNumber | undefined {
        return totalPotentialReward();
      },
      get totalStaked(): BigNumber | undefined {
        return totalStaked();
      },
      get totalEffectiveStaked(): BigNumber | undefined {
        return totalEffectiveStaked();
      },
      get lpStakedValue(): BigNumber | undefined {
        return yflpStakedValue();
      },
      get lpEffectiveStakedValue(): BigNumber | undefined {
        return yflpEffectiveStakedValue();
      },
      get mylpStakedValue(): BigNumber | undefined {
        return mylpStakedValue();
      },
      get mylpEffectiveStakedValue(): BigNumber | undefined {
        return mylpEffectiveStakedValue();
      },
      get bondReward(): BigNumber | undefined {
        return bondReward();
      },
      get totalBondReward(): BigNumber | undefined {
        return totalBondReward();
      },
      get bondPrice(): BigNumber | undefined {
        return bondPrice();
      },
    },
    getTokenUsdValue,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      <UserRejectedModal
        visible={userRejectedVisible}
        onCancel={() => setUserRejectedVisible(false)}
      />
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
