import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Paragraph, Small } from 'components/custom/typography';
import ExternalLink from 'components/custom/externalLink';
import { useProposal } from '../../providers/ProposalProvider';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import s from './styles.module.scss';

const ProposalDetailsCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card title="Details" className={s.component}>
      <Grid flow="col" gap={32} justify="space-between" className={s.row}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Created by</Small>
            <Paragraph type="p1" semiBold loading={!proposalCtx.proposal}>
              {shortenAddr(proposalCtx.proposal?.proposer)}
            </Paragraph>
          </Grid>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Creator threshold</Small>
            <Paragraph type="p1" semiBold loading={proposalCtx.proposal === undefined}>
              {proposalCtx.threshold === true && 'Above 1%'}
              {proposalCtx.threshold === false && 'Below 1%'}
            </Paragraph>
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
            <Paragraph key={target} type="p1">
              <Antd.Tooltip title={shortenAddr(target)}>
                <ExternalLink href={`${getEtherscanAddressUrl(target)}#writeContract`}>Contract</ExternalLink>
              </Antd.Tooltip>
              {/*.{/(\w+)\((.*)\)/gm.exec(proposal.signatures[index])?.[1]}({proposal.values[index]})*/}
            </Paragraph>
          );
        })}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
