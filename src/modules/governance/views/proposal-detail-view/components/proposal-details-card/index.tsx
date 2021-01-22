import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import Icon from 'components/custom/icon';
import { Label, Paragraph, Small } from 'components/custom/typography';
import { getActionString, useProposal } from '../../providers/ProposalProvider';

import { APIProposalState } from 'modules/governance/api';
import { shortenAddr } from 'web3/utils';
import { useWallet } from 'wallets/wallet';

import s from './styles.module.scss';

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

  const canCancel = (proposalCtx.threshold === false || proposalCtx.proposal?.proposer === wallet.account) && ![
    APIProposalState.CANCELED,
    APIProposalState.EXECUTED,
    APIProposalState.FAILED,
    APIProposalState.EXPIRED,
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
      className={s.component}
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
              <Paragraph type="p1" semiBold color="blue500" loading={!proposalCtx.proposal}>
                {shortenAddr(proposalCtx.proposal?.proposer)}
              </Paragraph>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Creator threshold</Small>
            <Grid flow="col" gap={8}>
              {proposalCtx.threshold !== undefined && (
                <>
                  <Icon type={proposalCtx.threshold ? 'circle-check' : 'circle-cancel'} />
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
        <Paragraph type="p1" color="grey900" loading={!proposalCtx.proposal}>
          {proposalCtx.proposal?.description}
        </Paragraph>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="grey500">Actions</Small>
        {proposalCtx.proposal?.targets.map((target: string, index: number) => (
          <Grid key={index} flow="col" gap={12}>
            <Label type="lb2" semiBold color="grey500" className={s.actionNumber}>{index + 1}</Label>
            {getActionString(proposalCtx.proposal!, index)}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
