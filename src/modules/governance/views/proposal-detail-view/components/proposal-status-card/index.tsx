import React from 'react';
import { format, formatDistance } from 'date-fns';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import Icon, { IconType } from 'components/custom/icon';
import { useProposal } from '../../providers/ProposalProvider';

import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

function getEventIcon(index: number, name: string): IconType {
  if ([
    APIProposalState.EXPIRED,
    APIProposalState.FAILED,
    APIProposalState.CANCELED,
  ].includes(name as any)) {
    return 'circle-cancel';
  }

  if ([
    APIProposalState.CREATED,
    APIProposalState.ACCEPTED,
    APIProposalState.EXECUTED,
  ].includes(name as any)) {
    return 'circle-check';
  }

  if (index === 0) {
    return 'circle-time';
  }

  return 'circle-check';
}

function formatEventTime(name: string, start: number, end: number): string {
  const mStart = new Date(start * 1000);
  const mEnd = end ? new Date(end * 1000) : new Date();
  const now = new Date();

  if ([
    APIProposalState.CREATED,
    APIProposalState.EXPIRED,
    APIProposalState.FAILED,
    APIProposalState.CANCELED,
    APIProposalState.EXECUTED,
    APIProposalState.ACCEPTED,
  ].includes(name as any)) {
    return format(mStart, 'dd MMM yyyy - HH:mm');
  }

  const dist = formatDistance(
    mEnd,
    now,
    {
      addSuffix: true,
      includeSeconds: true,
    },
  );

  return now > mEnd ? `Ended ${dist}` : `Ends ${dist}`;
}

const ProposalStatusCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card>
      <Grid flow="row" gap={24}>
        {proposalCtx.proposal?.history.map((event, index: number) => (
          <Grid key={event.name} flow="col" gap={12}>
            <Icon type={getEventIcon(index, event.name)} width={40} height={40} />
            <Grid flow="row" gap={4}>
              <Paragraph type="p1" semiBold color="grey900">
                {APIProposalStateMap.get(event.name as APIProposalState)}
              </Paragraph>
              <Paragraph type="p2" semiBold color="grey500">
                {formatEventTime(event.name, event.startTimestamp, event.endTimestamp)}
              </Paragraph>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalStatusCard;
