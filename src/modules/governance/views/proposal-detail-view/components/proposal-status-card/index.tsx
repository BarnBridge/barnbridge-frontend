import React from 'react';
import formatDistance from 'date-fns/formatDistance';

import { ExplorerTxLink } from 'components/button';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

import { useProposal } from '../../providers/ProposalProvider';

import { formatDateTime } from 'utils/date';

function getEventIcon(index: number, name: string): React.ReactNode {
  if (
    [APIProposalState.EXPIRED, APIProposalState.FAILED, APIProposalState.CANCELED, APIProposalState.ABROGATED].includes(
      name as any,
    )
  ) {
    return <Icon name="close-circle-outlined" width={40} height={40} color="red" />;
  }

  if ([APIProposalState.CREATED, APIProposalState.ACCEPTED, APIProposalState.EXECUTED].includes(name as any)) {
    return <Icon name="check-circle-outlined" width={40} height={40} color="green" />;
  }

  if (index === 0) {
    return <Icon name="history-circle-outlined" width={40} height={40} color="blue" />;
  }

  return <Icon name="check-circle-outlined" width={40} height={40} color="green" />;
}

function formatEventTime(name: string, start: number, end: number): string {
  const mStart = new Date(start * 1_000);
  const now = new Date();

  if (
    [
      APIProposalState.CREATED,
      APIProposalState.EXPIRED,
      APIProposalState.FAILED,
      APIProposalState.CANCELED,
      APIProposalState.EXECUTED,
      APIProposalState.QUEUED,
      APIProposalState.ACCEPTED,
      APIProposalState.ABROGATED,
    ].includes(name as any)
  ) {
    return formatDateTime(mStart);
  }

  if (end > 0) {
    const mEnd = new Date(end * 1_000);

    if (mEnd <= now) {
      return `Ended at ${formatDateTime(mEnd)}`;
    }

    const dist = formatDistance(mEnd, now, {
      addSuffix: true,
      includeSeconds: true,
    });

    return `Ends ${dist}`;
  }

  const dist = formatDistance(mStart, now, {
    addSuffix: true,
    includeSeconds: true,
  });

  return `Started ${dist}`;
}

const ProposalStatusCard: React.FC = () => {
  const { proposal, reload } = useProposal();

  if (!proposal) {
    return null;
  }

  return (
    <div className="card p-24">
      <Grid flow="row" gap={24}>
        {proposal.history.map((event, index: number) => (
          <div key={event.name} className="flex col-gap-12 align-center">
            {getEventIcon(index, event.name)}
            <div className="flex flow-row">
              <div className="flex align-center">
                <Text type="p1" weight="semibold" color="primary" className="mr-8">
                  {APIProposalStateMap.get(event.name as APIProposalState)}
                </Text>

                {event.txHash && (
                  <ExplorerTxLink address={event.txHash} style={{ height: '16px' }}>
                    <Icon name="link-outlined" width={16} height={16} />
                  </ExplorerTxLink>
                )}
              </div>

              <UseLeftTime end={event.endTimestamp * 1_000} delay={5_000} onEnd={() => reload()}>
                {() => (
                  <Text type="p2" weight="semibold" color="secondary">
                    {formatEventTime(event.name, event.startTimestamp, event.endTimestamp)}
                  </Text>
                )}
              </UseLeftTime>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default ProposalStatusCard;
