import 'web3/contracts/yieldFarming';

import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import UserRejectedModal from 'web3/components/user-rejected-modal';
import { BONDContract, useBONDContract } from 'web3/contracts/bond';
import { DAOBarnContract, useDAOBarnContract } from 'web3/contracts/daoBarn';
import { DAOGovernanceContract, useDAOGovernanceContract } from 'web3/contracts/daoGovernance';
import { DAORewardContract, useDAORewardContract } from 'web3/contracts/daoReward';
import Web3Contract from 'web3/contracts/web3Contract';
import { YieldFarmContract, useYieldFarmContract } from 'web3/contracts/yieldFarm';
import { YieldFarmBONDContract, useYieldFarmBONDContract } from 'web3/contracts/yieldFarmBOND';
import { YieldFarmLPContract, useYieldFarmLPContract } from 'web3/contracts/yieldFarmLP';

import { BondToken, UniV2Token, UsdcToken } from 'components/providers/known-tokens-provider';
import { useWallet } from 'wallets/wallet';

import { PoolTypes } from 'modules/yield-farming/utils';

export type Web3ContractsData = {
  bond: BONDContract;
  yf: YieldFarmContract;
  yfLP: YieldFarmLPContract;
  yfBOND: YieldFarmBONDContract;
  daoBarn: DAOBarnContract;
  daoReward: DAORewardContract;
  daoGovernance: DAOGovernanceContract;
};

export type Web3Contracts = Web3ContractsData & {
  getPoolUsdPrice(poolType: PoolTypes): BigNumber | undefined;
};

const Web3ContractsContext = React.createContext<Web3Contracts>({} as any);

export function useWeb3Contracts(): Web3Contracts {
  return React.useContext(Web3ContractsContext);
}

const Web3ContractsProvider: React.FC = props => {
  const wallet = useWallet();

  const bondContract = useBONDContract();
  const yfContract = useYieldFarmContract();
  const yfLPContract = useYieldFarmLPContract();
  const yfBONDContract = useYieldFarmBONDContract();

  const daoBarnContract = useDAOBarnContract();
  const daoRewardContract = useDAORewardContract();
  const daoGovernanceContract = useDAOGovernanceContract();

  const [userRejectedVisible, setUserRejectedVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const contracts = [
      bondContract.contract,
      yfContract.contract,
      yfLPContract.contract,
      yfBONDContract.contract,
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
      contract.on('tx:fail', handleError);
    });

    return () => {
      contracts.forEach((contract: Web3Contract) => {
        contract.off('tx:fail', handleError);
      });
    };
  }, [
    bondContract.contract,
    yfContract.contract,
    yfLPContract.contract,
    yfBONDContract.contract,
    daoBarnContract.contract,
    daoRewardContract.contract,
    daoGovernanceContract.contract,
  ]);

  React.useEffect(() => {
    const contracts = [
      bondContract.contract,
      yfContract.contract,
      yfLPContract.contract,
      yfBONDContract.contract,
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
        return UsdcToken.price;
      case PoolTypes.UNILP:
        return UniV2Token.price;
      case PoolTypes.BOND:
        return BondToken.price;
      default:
        return undefined;
    }
  }

  const value = {
    bond: bondContract,
    yf: yfContract,
    yfLP: yfLPContract,
    yfBOND: yfBONDContract,
    daoBarn: daoBarnContract,
    daoReward: daoRewardContract,
    daoGovernance: daoGovernanceContract,
    getPoolUsdPrice,
  };

  return (
    <Web3ContractsContext.Provider value={value}>
      {userRejectedVisible && <UserRejectedModal onCancel={() => setUserRejectedVisible(false)} />}
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
