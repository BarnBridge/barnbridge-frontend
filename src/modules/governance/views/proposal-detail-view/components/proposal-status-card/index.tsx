import React from 'react';
import { format, formatDistance } from 'date-fns';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import Icons, { IconNames } from 'components/custom/icon';
import ExternalLink from 'components/custom/externalLink';
import { useProposal } from '../../providers/ProposalProvider';

import { APIProposalHistoryEntity, APIProposalState, APIProposalStateMap } from 'modules/governance/api';
import { getEtherscanTxUrl } from 'web3/utils';
import { useReload } from 'hooks/useReload';

function getEventIcon(index: number, name: string): IconNames {
  if ([
    APIProposalState.EXPIRED,
    APIProposalState.FAILED,
    APIProposalState.CANCELED,
  ].includes(name as any)) {
    return 'close-circle-outlined';
  }

  if ([
    APIProposalState.CREATED,
    APIProposalState.ACCEPTED,
    APIProposalState.EXECUTED,
  ].includes(name as any)) {
    return 'check-circle-outlined';
  }

  if (index === 0) {
    return 'history-circle-outlined';
  }

  return 'check-circle-outlined';
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

type HistoryEventProps = {
  event: APIProposalHistoryEntity;
}

const HistoryEvent: React.FunctionComponent<HistoryEventProps> = props => {
  const { event } = props;

  const [reload] = useReload();

  React.useEffect(() => {
    const fn = () => {
      if ((Date.now() / 1000) < event.endTimestamp) {
        setTimeout(() => {
          reload();
          fn();
        }, 10000);
      }
    };

    fn();
  }, []);

  return (
    <Paragraph type="p2" semiBold color="grey500">
      {formatEventTime(event.name, event.startTimestamp, event.endTimestamp)}
    </Paragraph>
  );
};

const ProposalStatusCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card>
      <Grid flow="row" gap={24}>
        {proposalCtx.proposal?.history.map((event, index: number) => (
          <Grid key={event.name} flow="col" gap={12}>
            <Icons name={getEventIcon(index, event.name)} width={40} height={40} />
            <Grid flow="row" gap={4}>
              {event.txHash
                ? (
                  <Grid flow="col" gap={8} align="center">
                    <Paragraph type="p1" semiBold color="grey900">
                      {APIProposalStateMap.get(event.name as APIProposalState)}
                    </Paragraph>
                    <ExternalLink href={getEtherscanTxUrl(`0x${event.txHash}`)} style={{ height: '16px' }}>
                      <Icons name="link-outlined" width={16} height={16} />
                    </ExternalLink>
                  </Grid>
                )
                : (
                  <Paragraph type="p1" semiBold color="grey900">
                    {APIProposalStateMap.get(event.name as APIProposalState)}
                  </Paragraph>
                )}

              <HistoryEvent event={event} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalStatusCard;
