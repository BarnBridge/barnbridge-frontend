import React from 'react';

import { assertValues, createContract } from 'web3/utils';

export type CommunityVaultContract = {};

const Contract = createContract(
  require('web3/abi/community_vault.json'),
  String(process.env.REACT_APP_CONTRACT_COMMUNITY_VAULT_ADDR),
);

const InitialDataState: CommunityVaultContract = {};

export function useCommunityVaultContract(account?: string): CommunityVaultContract {
  const [data, setData] = React.useState<CommunityVaultContract>(InitialDataState);

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    if (!assertValues(account)) {
      return;
    }
  }, [account]);

  return data;
}
