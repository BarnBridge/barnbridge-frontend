import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Grid from 'components/custom/grid';
import ExternalLink from 'components/custom/externalLink';
import { Label, Paragraph, Small } from 'components/custom/typography';

import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { getEtherscanAddressUrl, shortenAddr, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { decodeABIParams } from 'web3/contract';
import { GetReceiptCallResult } from 'web3/contracts/daoGovernance';
import { useWallet } from 'wallets/wallet';
import { APIProposalEntity, fetchProposal } from 'modules/governance/api';
import { useReload } from '../../../../../../hooks/useReload';
import { AbiInterface } from '../../../../../../web3/abiInterface';

export type ProposalProviderState = {
  proposal?: APIProposalEntity;
  forRate?: number;
  againstRate?: number;
  quorum?: number;
  votingPower?: BigNumber;
  receipt?: GetReceiptCallResult;
  threshold?: boolean;
  canceled?: boolean;
};

export type ProposalContextType = ProposalProviderState & {
  reload(): void;
  cancelProposal(): Promise<any>;
  startCancellationProposal(): Promise<any>;
  queueForExecution(): Promise<any>;
  queueForExecution(): Promise<any>;
  executeProposal(): Promise<any>;
};

const InitialState: ProposalProviderState = {};

const ProposalContext = React.createContext<ProposalContextType>({
  ...InitialState,
  reload: () => undefined,
  cancelProposal: () => Promise.reject(),
  startCancellationProposal: () => Promise.reject(),
  queueForExecution: () => Promise.reject(),
  executeProposal: () => Promise.reject(),
});

export function useProposal(): ProposalContextType {
  return React.useContext(ProposalContext);
}

export type ProposalProviderProps = {
  proposalId?: number;
};

export function getActionString(proposal: APIProposalEntity, index: number) {
  const target = proposal.targets[index];
  const signature = proposal.signatures[index];
  const calldata = proposal.calldatas[index];
  const value = proposal.values[index];

  return getActionStringFor(target, signature, calldata, value);
}

export function getActionStringFor(target: string, signature: string, calldata: string, value: string) {
  const functionFragment = AbiInterface.getFunctionFragmentFrom(signature);
  const functionParamValues = AbiInterface.decodeFunctionData(functionFragment, calldata);

  return (
    <Antd.Tooltip title={(
      <Grid flow="row" gap={12}>
        <Grid flow="row" gap={4} align="center">
          <Label type="lb2" bold color="grey900">Contract address:</Label>
          <Small semiBold color="grey500" wrap>{target}</Small>
        </Grid>

        {value !== '0' && (
          <Grid flow="row" gap={4} align="center">
            <Label type="lb2" bold color="grey900">Action value:</Label>
            <Small semiBold color="grey500" wrap>{value}</Small>
          </Grid>
        )}

        <Grid flow="row" gap={4} align="center">
          <Label type="lb2" bold color="grey900">Function signature:</Label>
          <Small semiBold color="grey500" wrap>{signature}</Small>
        </Grid>

        <Grid flow="row" gap={4} align="center">
          <Label type="lb2" bold color="grey900">Function arguments:</Label>
          {functionParamValues.map((param, index) => {
            let paramValue = param;

            if (Array.isArray(paramValue)) {
              paramValue = JSON.stringify(paramValue, null, 2);
            } else if (typeof paramValue?.toString === 'function') {
              paramValue = paramValue.toString();
            } else {
              paramValue = JSON.stringify(paramValue, null, 2);
            }

            const { type } = functionFragment.inputs[index];

            return (
              <Grid key={index} flow="col" gap={8} align="center">
                {index + 1}. | {type} |
                <Small semiBold color="grey500" wrap>
                  {paramValue}
                </Small>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    )}>
      <ExternalLink href={`${getEtherscanAddressUrl(target)}#writeContract`}>
        <Grid flow="col" wrap>
          <Paragraph type="p1" semiBold color="blue500">{shortenAddr(target)}</Paragraph>
          <Paragraph type="p1" color="red500">.{signature}</Paragraph>
        </Grid>
      </ExternalLink>
    </Antd.Tooltip>
  );
}

const ProposalProvider: React.FunctionComponent<ProposalProviderProps> = props => {
  const { proposalId, children } = props;

  const [reload, version] = useReload();
  const history = useHistory();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const [state, setState] = React.useState<ProposalProviderState>(InitialState);

  React.useEffect(() => {
    if (!proposalId) {
      return;
    }

    fetchProposal(proposalId)
      .then(proposal => {
        setState(prevState => ({
          ...prevState,
          proposal,
        }));
      })
      .catch((status: number) => {
        if (status === 404) {
          Antd.notification.error({
            message: `Proposal with id=${proposalId} doesn't exist.`,
          });
        } else {
          Antd.notification.error({
            message: `Failed to fetch proposal with id=${proposalId}. (Status: ${status})`,
          });
        }

        history.push('/governance/proposals');
      });
  }, [proposalId, version]);

  useAsyncEffect(async () => {
    if (!state.proposal) {
      return;
    }

    const { forVotes, againstVotes } = state.proposal;
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
    }));

    const ts = state.proposal.createTime + state.proposal.warmUpDuration;

    web3c.daoBarn.actions.bondStakedAtTs(ts)
      .then(([bondStakedAt]) => {
        let quorum = 0;

        if (bondStakedAt.gt(ZERO_BIG_NUMBER)) {
          quorum = total.multipliedBy(100).div(bondStakedAt).toNumber();
        }

        setState(prevState => ({
          ...prevState,
          quorum,
        }));
      });

    web3c.daoGovernance.actions.cancellationProposals(state.proposal.proposalId)
      .then((result) => {
        if (result?.createTime! > 0) {
          setState(prevState => ({
            ...prevState,
            canceled: true,
          }));
        }
      });

    web3c.daoBarn.actions.votingPower(state.proposal.proposer)
      .then(([votingPower]) => {
        const bondStaked = web3c.daoBarn.bondStaked;

        setState(prevState => ({
          ...prevState,
          threshold: bondStaked?.div(100).isLessThan(votingPower) ?? true,
        }));
      });
  }, [state.proposal?.proposalId]);

  React.useEffect(() => {
    if (!state.proposal || !wallet.account) {
      return;
    }

    const ts = state.proposal.createTime + state.proposal.warmUpDuration;

    web3c.daoBarn.actions.votingPowerAtTs(ts)
      .then(([votingPower]) => {
        setState(prevState => ({
          ...prevState,
          votingPower,
        }));
      });

    web3c.daoGovernance.actions.getReceipt(state.proposal.proposalId)
      .then((result: GetReceiptCallResult) => {
        setState(prevState => ({
          ...prevState,
          receipt: result,
        }));
      });
  }, [state.proposal?.proposalId, wallet.account]);

  function cancelProposal() {
    return proposalId ? web3c.daoGovernance.actions.cancelProposal(proposalId) : Promise.reject();
  }

  function startCancellationProposal() {
    return proposalId ? web3c.daoGovernance.actions.startCancellationProposal(proposalId) : Promise.reject();
  }

  function queueForExecution() {
    return proposalId ? web3c.daoGovernance.actions.queueForExecution(proposalId) : Promise.reject();
  }

  function executeProposal() {
    return proposalId ? web3c.daoGovernance.actions.executeProposal(proposalId) : Promise.reject();
  }

  return (
    <ProposalContext.Provider value={{
      ...state,
      reload,
      cancelProposal,
      startCancellationProposal,
      queueForExecution,
      executeProposal,
    }}>{children}</ProposalContext.Provider>
  );
};

export default ProposalProvider;
