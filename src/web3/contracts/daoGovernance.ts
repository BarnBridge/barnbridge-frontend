import React from 'react';

import { useReload } from 'hooks/useReload';
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

  const contract = React.useMemo<Web3Contract>(() => {
    return new Web3Contract(
      require('web3/abi/dao_governance.json'),
      CONTRACT_DAO_GOVERNANCE_ADDR,
      'DAO Governance',
    );
  }, []);

  const [data] = React.useState<DAOGovernanceContractData>(InitialData);

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
