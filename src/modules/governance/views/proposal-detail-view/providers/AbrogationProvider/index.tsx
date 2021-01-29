import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { useReload } from 'hooks/useReload';
import { ZERO_BIG_NUMBER } from 'web3/utils';
import { GetReceiptCallResult } from 'web3/contracts/daoGovernance';
import { APIAbrogationEntity, fetchAbrogation } from 'modules/governance/api';
import { useWeb3Contracts } from '../../../../../../web3/contracts';

export type AbrogationProviderState = {
  abrogation?: APIAbrogationEntity;
  forRate?: number;
  againstRate?: number;
  acceptanceThreshold?: number;
  votingPower?: BigNumber;
  receipt?: GetReceiptCallResult;
};

export type AbrogationContextType = AbrogationProviderState & {
  reload(): void;
};

const InitialState: AbrogationProviderState = {};

const AbrogationContext = React.createContext<AbrogationContextType>({
  ...InitialState,
  reload: () => undefined,
});

export function useAbrogation(): AbrogationContextType {
  return React.useContext(AbrogationContext);
}

export type AbrogationProviderProps = {
  proposalId?: number;
};

const AbrogationProvider: React.FunctionComponent<AbrogationProviderProps> = props => {
  const { proposalId, children } = props;

  const [reload, version] = useReload();
  const history = useHistory();
  const web3c = useWeb3Contracts();

  const [state, setState] = React.useState<AbrogationProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposalId) {
      return;
    }

    fetchAbrogation(proposalId)
      .then(abrogation => {
        setState(prevState => ({
          ...prevState,
          abrogation,
        }));
      })
      .catch((status: number) => {
        if (status === 404) {
          Antd.notification.error({
            message: `Proposal with id=${proposalId} doesn't exist.`,
          });
        } else {
          Antd.notification.error({
            message: `Failed to fetch proposal abrogation with id=${proposalId}. (Status: ${status})`,
          });
        }

        history.push(`/governance/proposals/${proposalId}`);
      });
  }, [proposalId, version]);

  useAsyncEffect(async () => {
    setState(prevState => ({
      ...prevState,
      forRate: undefined,
      againstRate: undefined,
      acceptanceThreshold: undefined,
    }));

    if (!state.abrogation) {
      return;
    }

    const { forVotes, againstVotes } = state.abrogation;
    const total = forVotes.plus(againstVotes);

    let forRate = 0;
    let againstRate = 0;

    if (total.gt(ZERO_BIG_NUMBER)) {
      forRate = forVotes.multipliedBy(100).div(total).toNumber();
      againstRate = againstVotes.multipliedBy(100).div(total).toNumber();
    }

    setState(prevState => ({
      ...prevState,
      forRate,
      againstRate,
      acceptanceThreshold: 51,
    }));
  }, [state.abrogation]);

  return (
    <AbrogationContext.Provider value={{
      ...state,
      reload,
    }}>{children}</AbrogationContext.Provider>
  );
};

export default AbrogationProvider;
