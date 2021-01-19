import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import Icon from 'components/custom/icon';
import { Label, Paragraph, Small } from 'components/custom/typography';
import { getActionString, useProposal } from '../../providers/ProposalProvider';

import { shortenAddr } from 'web3/utils';

import s from './styles.module.scss';

const ProposalDetailsCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card title="Details" className={s.component}>
      <Grid flow="col" gap={32} justify="space-between" className={s.row}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Created by</Small>
            <Grid flow="col" gap={8}>
              <Identicon address={proposalCtx.proposal?.proposer} width={24} height={24} />
              <Paragraph type="p1" semiBold loading={!proposalCtx.proposal}>
                {shortenAddr(proposalCtx.proposal?.proposer)}
              </Paragraph>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Creator threshold</Small>
            <Grid flow="col" gap={8}>
              {proposalCtx.threshold ? (
                <>
                  <Icon type="circle-check" />
                  <Paragraph type="p1" semiBold loading={proposalCtx.proposal === undefined}>
                    Above 1%
                  </Paragraph>
                </>
              ) : (
                <>
                  <Icon type="circle-cancel" />
                  <Paragraph type="p1" semiBold loading={proposalCtx.proposal === undefined}>
                    Below 1%
                  </Paragraph>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        {proposalCtx.threshold === false && (
          <Button
            type="default"
            onClick={() => proposalCtx.cancelProposal()}>Cancel proposal</Button>
        )}
      </Grid>

      <Grid flow="row" gap={16} className={s.row}>
        <Small semiBold color="grey500">Description</Small>
        <Paragraph type="p1" color="grey900" loading={!proposalCtx.proposal}>
          {proposalCtx.proposal?.description}
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={16} className={s.row}>
        <Small semiBold color="grey500">Actions</Small>
        {proposalCtx.proposal?.targets.map((target: string, index: number) => {
          return (
            <Grid key={index} flow="col" gap={12}>
              <Label type="lb2" semiBold color="grey500" className={s.actionNumber}>{index + 1}</Label>
              <Paragraph key={target} type="p1">
                {getActionString(proposalCtx.proposal!, index)}
              </Paragraph>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
