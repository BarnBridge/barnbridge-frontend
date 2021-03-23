import React from 'react';
import { waitUntil } from 'async-wait-until';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import { getEtherscanTxUrl } from 'web3/utils';

import Card from 'components/antd/card';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

import { useProposal } from '../../providers/ProposalProvider';

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
      APIProposalState.ACCEPTED,
      APIProposalState.ABROGATED,
    ].includes(name as any)
  ) {
    return format(mStart, 'dd MMM yyyy - HH:mm');
  }

  if (end > 0) {
    const mEnd = new Date(end * 1_000);

    const dist = formatDistance(mEnd, now, {
      addSuffix: true,
      includeSeconds: true,
    });

    return mEnd > now ? `Ends ${dist}` : `Ended ${dist}`;
  }

  const dist = formatDistance(mStart, now, {
    addSuffix: true,
    includeSeconds: true,
  });

  return `Started ${dist}`;
}

const ProposalStatusCard: React.FC = () => {
  const proposalCtx = useProposal();

  let currentState: APIProposalState | undefined;

  async function handleLeftTimeEnd() {
    await waitUntil(
      () => {
        if (currentState !== proposalCtx.proposal?.state) {
          return Promise.resolve();
        }

        currentState = proposalCtx.proposal?.state;
        proposalCtx.reload();
        return Promise.reject();
      },
      { intervalBetweenAttempts: 3_000, timeout: Infinity },
    );
  }

  return (
    <Card>
      <Grid flow="row" gap={24}>
        {proposalCtx.proposal?.history.map((event, index: number) => (
          <Grid key={event.name} flow="col" gap={12}>
            {getEventIcon(index, event.name)}
            <Grid flow="row" gap={4}>
              {event.txHash ? (
                <Grid flow="col" gap={8} align="center">
                  <Text type="p1" weight="semibold" color="primary">
                    {APIProposalStateMap.get(event.name as APIProposalState)}
                  </Text>
                  <ExternalLink href={getEtherscanTxUrl(`0x${event.txHash}`)} style={{ height: '16px' }}>
                    <Icon name="link-outlined" width={16} height={16} />
                  </ExternalLink>
                </Grid>
              ) : (
                <Text type="p1" weight="semibold" color="primary">
                  {APIProposalStateMap.get(event.name as APIProposalState)}
                </Text>
              )}

              <UseLeftTime end={(event.endTimestamp ?? 0) * 1_000} delay={10_000} onEnd={handleLeftTimeEnd}>
                {leftTime => (
                  <Text type="p2" weight="semibold" color="secondary">
                    {leftTime > 0 ? formatEventTime(event.name, event.startTimestamp, event.endTimestamp) : ''}
                  </Text>
                )}
              </UseLeftTime>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalStatusCard;
