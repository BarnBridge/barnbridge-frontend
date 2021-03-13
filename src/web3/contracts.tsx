import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import UserRejectedModal from 'web3/components/user-rejected-modal';
import Web3Contract from 'web3/contract';
import { BONDContract, BONDTokenMeta, useBONDContract } from 'web3/contracts/bond';
import { DAIContract, DAITokenMeta, useDAIContract } from 'web3/contracts/dai';
import { DAOBarnContract, useDAOBarnContract } from 'web3/contracts/daoBarn';
import { DAOGovernanceContract, useDAOGovernanceContract } from 'web3/contracts/daoGovernance';
import { DAORewardContract, useDAORewardContract } from 'web3/contracts/daoReward';
import { StakingContract, useStakingContract } from 'web3/contracts/staking';
import { SUSDContract, SUSDTokenMeta, useSUSDContract } from 'web3/contracts/susd';
import { UNISWAPContract, UNISWAPTokenMeta, useUNISWAPContract } from 'web3/contracts/uniswap';
import { USDCContract, USDCTokenMeta, useUSDCContract } from 'web3/contracts/usdc';
import { YieldFarmContract, useYieldFarmContract } from 'web3/contracts/yieldFarm';
import { YieldFarmBONDContract, useYieldFarmBONDContract } from 'web3/contracts/yieldFarmBOND';
import { YieldFarmLPContract, useYieldFarmLPContract } from 'web3/contracts/yieldFarmLP';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import { useWallet } from 'wallets/wallet';

import { PoolTypes } from 'modules/yield-farming/utils';

export type Web3ContractsData = {
  bond: BONDContract;
  usdc: USDCContract;
  dai: DAIContract;
  susd: SUSDContract;
  uniswap: UNISWAPContract;
  yf: YieldFarmContract;
  yfLP: YieldFarmLPContract;
  yfBOND: YieldFarmBONDContract;
  staking: StakingContract;
  daoBarn: DAOBarnContract;
  daoReward: DAORewardContract;
  daoGovernance: DAOGovernanceContract;
  aggregated: {
    yfStakedValue?: BigNumber;
    yfEffectiveStakedValue?: BigNumber;
    yfLPStakedValue?: BigNumber;
    myLPStakedValue?: BigNumber;
    yfLPEffectiveStakedValue?: BigNumber;
    myLPEffectiveStakedValue?: BigNumber;
    yfBONDStakedValue?: BigNumber;
    myBONDStakedValue?: BigNumber;
    yfBONDEffectiveStakedValue?: BigNumber;
    myBondEffectiveStakedValue?: BigNumber;
    totalStaked?: BigNumber;
    totalEffectiveStaked?: BigNumber;
    totalCurrentReward?: BigNumber;
    totalPotentialReward?: BigNumber;
    totalBondReward?: BigNumber;
    bondReward?: BigNumber;
    bondLockedPrice?: BigNumber;
  };
};

export type Web3Contracts = Web3ContractsData & {
  getPoolUsdPrice(poolType: PoolTypes): BigNumber | undefined;
  getTokenUsdPrice(tokenAddress: string): BigNumber | undefined;
};

const Web3ContractsContext = React.createContext<Web3Contracts>({} as any);

export function useWeb3Contracts(): Web3Contracts {
  return React.useContext(Web3ContractsContext);
}

const Web3ContractsProvider: React.FC = props => {
  const wallet = useWallet();
  const bondContract = useBONDContract();
  const daiContract = useDAIContract();
  const usdcContract = useUSDCContract();
  const susdContract = useSUSDContract();
  const uniswapContract = useUNISWAPContract();
  const yfContract = useYieldFarmContract();
  const yfLPContract = useYieldFarmLPContract();
  const yfBONDContract = useYieldFarmBONDContract();
  const stakingContract = useStakingContract();
  const daoBarnContract = useDAOBarnContract();
  const daoRewardContract = useDAORewardContract();
  const daoGovernanceContract = useDAOGovernanceContract();

  const [userRejectedVisible, setUserRejectedVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const contracts = [
      bondContract.contract,
      daiContract.contract,
      usdcContract.contract,
      susdContract.contract,
      uniswapContract.contract,
      yfContract.contract,
      yfLPContract.contract,
      yfBONDContract.contract,
      stakingContract.contract,
      daoBarnContract.contract,
      daoRewardContract.contract,
      daoGovernanceContract.contract,
    ];

    function handleError(err: Error & { code: number }, contract: Web3Contract, { method }: any) {
      console.error(`${contract.name}:${method}`, { error: err });

      if (err.code === 4001) {
        setUserRejectedVisible(true);
      } else {
        Antd.notification.error({
          message: err.message,
        });
      }
    }

    contracts.forEach((contract: Web3Contract) => {
      contract.on('tx:failure', handleError);
    });

    return () => {
      contracts.forEach((contract: Web3Contract) => {
        contract.off('tx:failure', handleError);
      });
    };
  }, [
    bondContract.contract,
    daiContract.contract,
    usdcContract.contract,
    susdContract.contract,
    uniswapContract.contract,
    yfContract.contract,
    yfLPContract.contract,
    yfBONDContract.contract,
    stakingContract.contract,
    daoBarnContract.contract,
    daoRewardContract.contract,
    daoGovernanceContract.contract,
  ]);

  React.useEffect(() => {
    const contracts = [
      bondContract.contract,
      daiContract.contract,
      usdcContract.contract,
      susdContract.contract,
      uniswapContract.contract,
      yfContract.contract,
      yfLPContract.contract,
      yfBONDContract.contract,
      stakingContract.contract,
      daoBarnContract.contract,
      daoRewardContract.contract,
      daoGovernanceContract.contract,
    ];

    contracts.forEach(contract => {
      contract.setProvider(wallet.provider);
    });
  }, [wallet.provider]);

  function getPoolUsdPrice(poolType: PoolTypes): BigNumber | undefined {
    switch (poolType) {
      case PoolTypes.STABLE:
        return uniswapContract.stablePrice;
      case PoolTypes.UNILP:
        return uniswapContract.unilpPrice;
      case PoolTypes.BOND:
        return uniswapContract.bondPrice;
      default:
        return undefined;
    }
  }

  function getTokenUsdPrice(tokenAddress: string): BigNumber | undefined {
    switch (tokenAddress) {
      case USDCTokenMeta.address:
      case DAITokenMeta.address:
      case SUSDTokenMeta.address:
        return getPoolUsdPrice(PoolTypes.STABLE);
      case UNISWAPTokenMeta.address:
        return getPoolUsdPrice(PoolTypes.UNILP);
      case BONDTokenMeta.address:
        return getPoolUsdPrice(PoolTypes.BOND);
      default:
        return undefined;
    }
  }

  function yfStakedValue() {
    const poolSize = yfContract.nextPoolSize;
    const price = uniswapContract.stablePrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function yfEffectiveStakedValue() {
    const { poolSize } = yfContract;
    const price = uniswapContract.stablePrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function yfLPStakedValue() {
    const poolSize = yfLPContract.nextPoolSize;
    const price = uniswapContract.unilpPrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function myLPStakedValue() {
    const epochStake = yfLPContract.nextEpochStake;
    const price = uniswapContract.unilpPrice;

    if (epochStake === undefined || price === undefined) {
      return undefined;
    }

    return epochStake.multipliedBy(price);
  }

  function yfLPEffectiveStakedValue() {
    const { poolSize } = yfLPContract;
    const price = uniswapContract.unilpPrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function myLPEffectiveStakedValue() {
    const { epochStake } = yfLPContract;
    const price = uniswapContract.unilpPrice;

    if (epochStake === undefined || price === undefined) {
      return undefined;
    }

    return epochStake.multipliedBy(price);
  }

  function yfBONDStakedValue() {
    const poolSize = yfBONDContract.nextPoolSize;
    const price = uniswapContract.bondPrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function myBONDStakedValue() {
    const epochStake = yfBONDContract.nextEpochStake;
    const price = uniswapContract.bondPrice;

    if (epochStake === undefined || price === undefined) {
      return undefined;
    }

    return epochStake.multipliedBy(price);
  }

  function yfBONDEffectiveStakedValue() {
    const { poolSize } = yfBONDContract;
    const price = uniswapContract.bondPrice;

    if (poolSize === undefined || price === undefined) {
      return undefined;
    }

    return poolSize.multipliedBy(price);
  }

  function myBondEffectiveStakedValue() {
    const { epochStake } = yfBONDContract;
    const price = uniswapContract.bondPrice;

    if (epochStake === undefined || price === undefined) {
      return undefined;
    }

    return epochStake.multipliedBy(price);
  }

  function bondLockedPrice() {
    const { bondStaked } = daoBarnContract;
    const price = uniswapContract.bondPrice;

    if (bondStaked === undefined || price === undefined) {
      return undefined;
    }

    return bondStaked.multipliedBy(price);
  }

  function totalStaked(): BigNumber | undefined {
    const yfStaked = yfStakedValue();
    const yfLPStaked = yfLPStakedValue();
    const yfBONDStaked = yfBONDStakedValue();

    if (yfStaked === undefined || yfLPStaked === undefined || yfBONDStaked === undefined) {
      return undefined;
    }

    let total = ZERO_BIG_NUMBER;

    if (yfContract.isEnded === false) {
      total = total.plus(yfStaked);
    }

    if (yfLPContract.isEnded === false) {
      total = total.plus(yfLPStaked);
    }

    if (yfBONDContract.isEnded === false) {
      total = total.plus(yfBONDStaked);
    }

    return total;
  }

  function totalEffectiveStaked(): BigNumber | undefined {
    const yfStaked = yfEffectiveStakedValue();
    const yfLPStaked = yfLPEffectiveStakedValue();
    const yfBONDStaked = yfBONDEffectiveStakedValue();

    if (yfStaked === undefined || yfLPStaked === undefined || yfBONDStaked === undefined) {
      return undefined;
    }

    let total = ZERO_BIG_NUMBER;

    if (yfContract.isEnded === false) {
      total = total.plus(yfStaked);
    }

    if (yfLPContract.isEnded === false) {
      total = total.plus(yfLPStaked);
    }

    if (yfBONDContract.isEnded === false) {
      total = total.plus(yfBONDStaked);
    }

    return total;
  }

  function totalCurrentReward(): BigNumber | undefined {
    const yfReward = yfContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yfContract.currentReward;
    const yfLPReward = yfLPContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yfLPContract.currentReward;
    const yfBONDReward = yfBONDContract.currentEpoch === 0 ? ZERO_BIG_NUMBER : yfBONDContract.currentReward;

    if (yfReward === undefined || yfLPReward === undefined || yfBONDReward === undefined) return undefined;

    return yfReward.plus(yfLPReward).plus(yfBONDReward);
  }

  function totalPotentialReward(): BigNumber | undefined {
    const yfReward = yfContract.potentialReward;
    const yfLPReward = yfLPContract.potentialReward;
    const yfBONDReward = yfBONDContract.potentialReward;

    if (yfReward === undefined || yfLPReward === undefined || yfBONDReward === undefined) return undefined;

    let total = ZERO_BIG_NUMBER;

    if (yfContract.isEnded === false) {
      total = total.plus(yfReward);
    }

    if (yfLPContract.isEnded === false) {
      total = total.plus(yfLPReward);
    }

    if (yfBONDContract.isEnded === false) {
      total = total.plus(yfBONDReward);
    }

    return total;
  }

  function totalBondReward(): BigNumber | undefined {
    const yfTotalReward = yfContract.totalReward;
    const yfLPTotalReward = yfLPContract.totalReward;
    const yfBONDTotalReward = yfBONDContract.totalReward;

    if (yfTotalReward === undefined || yfLPTotalReward === undefined || yfBONDTotalReward === undefined)
      return undefined;

    return yfTotalReward.plus(yfLPTotalReward).plus(yfBONDTotalReward);
  }

  function bondReward(): BigNumber | undefined {
    const yfReward = yfContract.bondReward;
    const yfLPReward = yfLPContract.bondReward;
    const yfBONDReward = yfBONDContract.bondReward;

    if (yfReward === undefined || yfLPReward === undefined || yfBONDReward === undefined) return undefined;

    return yfReward.plus(yfLPReward).plus(yfBONDReward);
  }

  const value = {
    bond: bondContract,
    usdc: usdcContract,
    dai: daiContract,
    susd: susdContract,
    uniswap: uniswapContract,
    yf: yfContract,
    yfLP: yfLPContract,
    yfBOND: yfBONDContract,
    staking: stakingContract,
    daoBarn: daoBarnContract,
    daoReward: daoRewardContract,
    daoGovernance: daoGovernanceContract,
    aggregated: {
      get yfStakedValue(): BigNumber | undefined {
        return yfStakedValue();
      },
      get yfEffectiveStakedValue(): BigNumber | undefined {
        return yfEffectiveStakedValue();
      },
      get yfLPStakedValue(): BigNumber | undefined {
        return yfLPStakedValue();
      },
      get myLPStakedValue(): BigNumber | undefined {
        return myLPStakedValue();
      },
      get yfLPEffectiveStakedValue(): BigNumber | undefined {
        return yfLPEffectiveStakedValue();
      },
      get myLPEffectiveStakedValue(): BigNumber | undefined {
        return myLPEffectiveStakedValue();
      },
      get yfBONDStakedValue(): BigNumber | undefined {
        return yfBONDStakedValue();
      },
      get myBONDStakedValue(): BigNumber | undefined {
        return myBONDStakedValue();
      },
      get yfBONDEffectiveStakedValue(): BigNumber | undefined {
        return yfBONDEffectiveStakedValue();
      },
      get myBondEffectiveStakedValue(): BigNumber | undefined {
        return myBondEffectiveStakedValue();
      },
      get totalStaked(): BigNumber | undefined {
        return totalStaked();
      },
      get totalEffectiveStaked(): BigNumber | undefined {
        return totalEffectiveStaked();
      },
      get totalCurrentReward(): BigNumber | undefined {
        return totalCurrentReward();
      },
      get totalPotentialReward(): BigNumber | undefined {
        return totalPotentialReward();
      },
      get totalBondReward(): BigNumber | undefined {
        return totalBondReward();
      },
      get bondReward(): BigNumber | undefined {
        return bondReward();
      },
      get bondLockedPrice(): BigNumber | undefined {
        return bondLockedPrice();
      },
    },
    getPoolUsdPrice,
    getTokenUsdPrice,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      {userRejectedVisible && <UserRejectedModal onCancel={() => setUserRejectedVisible(false)} />}
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
