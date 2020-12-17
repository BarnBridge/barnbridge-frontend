import React from 'react';
import BigNumber from 'bignumber.js';

import { useReload } from 'hooks/useReload';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useWallet } from 'wallets/wallet';
import Web3Contract from 'web3/contract';

const CONTRACT_DAO_GOVERNANCE_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase();

type DAOGovernanceContractData = {};

export type DAOGovernanceContract = DAOGovernanceContractData & {
  contract: Web3Contract;
  reload(): void;
};

const InitialData: DAOGovernanceContractData = {};

export function useDAOGovernanceContract(): DAOGovernanceContract {
  const [reload] = useReload();
  const wallet = useWallet();

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/dao_governance.json'),
      CONTRACT_DAO_GOVERNANCE_ADDR,
      'DAO Governance',
    );
  }, []);

  const [data, setData] = React.useState<DAOGovernanceContractData>(InitialData);

  return React.useMemo<DAOGovernanceContract>(() => ({
    ...data,
    contract,
    reload,
  }), [
    data,
    contract,
    reload,
  ]);
}
