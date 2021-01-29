import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import Icons from 'components/custom/icon';
import ExternalLink from 'components/custom/externalLink';
import { Paragraph, Small } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';
import ProposalActionCard from '../../../../components/proposal-action-card';

import { APIProposalState } from 'modules/governance/api';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';
import { useWallet } from 'wallets/wallet';

type ProposalDetailsCardState = {
  cancelling: boolean;
};

const InitialState: ProposalDetailsCardState = {
  cancelling: false,
};

const ProposalDetailsCard: React.FunctionComponent = () => {
  const wallet = useWallet();
  const proposalCtx = useProposal();

  const [state, setState] = React.useState<ProposalDetailsCardState>(InitialState);

  const canCancel = (proposalCtx.threshold === false || proposalCtx.proposal?.proposer === wallet.account) && [
    APIProposalState.WARMUP,
    APIProposalState.ACTIVE,
  ].includes(proposalCtx.proposal?.state as any);

  function handleProposalCancel() {
    setState(prevState => ({
      ...prevState,
      cancelling: true,
    }));

    proposalCtx.cancelProposal()
      .then(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
        proposalCtx.reload();
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
      });
  }

  return (
    <Card
      title={(
        <Paragraph type="p1" semiBold color="grey900">Details</Paragraph>
      )}
      noPaddingBody>
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Created by</Small>
            <Grid flow="col" gap={8}>
              <Identicon address={proposalCtx.proposal?.proposer} width={24} height={24} />
              <ExternalLink href={`${getEtherscanAddressUrl(proposalCtx.proposal?.proposer!)}`}>
                <Paragraph type="p1" semiBold color="blue500" loading={!proposalCtx.proposal}>
                  {shortenAddr(proposalCtx.proposal?.proposer)}
                </Paragraph>
              </ExternalLink>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Creator threshold</Small>
            <Grid flow="col" gap={8}>
              {proposalCtx.threshold !== undefined && (
                <>
                  <Icons name={proposalCtx.threshold ? 'check-circle-outlined' : 'close-circle-outlined'} />
                  <Paragraph type="p1" semiBold color="grey900" loading={proposalCtx.proposal === undefined}>
                    {proposalCtx.threshold ? 'Above 1%' : 'Below 1%'}
                  </Paragraph>
                </>
              )}
            </Grid>
          </Grid>
          {canCancel && (
            <Button
              type="default"
              loading={state.cancelling}
              onClick={handleProposalCancel}>Cancel proposal</Button>
          )}
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="grey500">Description</Small>
        <Paragraph type="p1" color="grey900" loading={!proposalCtx.proposal} wrap>
          {proposalCtx.proposal?.description}
        </Paragraph>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="grey500">Actions</Small>
        {proposalCtx.proposal?.targets.map((target: string, index: number) => (
          <ProposalActionCard
            key={index}
            title={`Action ${index + 1}`}
            target={proposalCtx.proposal!.targets[index]}
            signature={proposalCtx.proposal!.signatures[index]}
            callData={proposalCtx.proposal!.calldatas[index]}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
