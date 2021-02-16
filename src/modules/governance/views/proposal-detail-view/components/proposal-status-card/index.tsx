import React from 'react';
import { format, formatDistance } from 'date-fns';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import Icons from 'components/custom/icon';
import ExternalLink from 'components/custom/externalLink';
import { useProposal } from '../../providers/ProposalProvider';

import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';
import { getEtherscanTxUrl } from 'web3/utils';
import { UseLeftTime } from 'hooks/useLeftTime';

function getEventIcon(index: number, name: string): React.ReactNode {
  if (
    [
      APIProposalState.EXPIRED,
      APIProposalState.FAILED,
      APIProposalState.CANCELED,
      APIProposalState.ABROGATED,
    ].includes(name as any)
  ) {
    return (<Icons
      name="close-circle-outlined"
      width={40}
      height={40}
      color="red"
    />);
  }

  if (
    [
      APIProposalState.CREATED,
      APIProposalState.ACCEPTED,
      APIProposalState.EXECUTED,
    ].includes(name as any)
  ) {
    return (<Icons
      name="check-circle-outlined"
      width={40}
      height={40}
      color="green"
    />);
  }

  if (index === 0) {
    return (<Icons
      name="history-circle-outlined"
      width={40}
      height={40}
      color="blue"
    />);
  }

  return (<Icons
    name="check-circle-outlined"
    width={40}
    height={40}
    color="green"
  />);
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

const ProposalStatusCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card>
      <Grid flow="row" gap={24}>
        {proposalCtx.proposal?.history.map((event, index: number) => (
          <Grid key={event.name} flow="col" gap={12}>
            {getEventIcon(index, event.name)}
            <Grid flow="row" gap={4}>
              {event.txHash ? (
                <Grid flow="col" gap={8} align="center">
                  <Paragraph type="p1" semiBold color="primary">
                    {APIProposalStateMap.get(event.name as APIProposalState)}
                  </Paragraph>
                  <ExternalLink
                    href={getEtherscanTxUrl(`0x${event.txHash}`)}
                    style={{ height: '16px' }}>
                    <Icons name="link-outlined" width={16} height={16} />
                  </ExternalLink>
                </Grid>
              ) : (
                <Paragraph type="p1" semiBold color="primary">
                  {APIProposalStateMap.get(event.name as APIProposalState)}
                </Paragraph>
              )}

              <UseLeftTime
                end={(event.endTimestamp ?? 0) * 1_000}
                delay={10_000}
                onEnd={() => proposalCtx.reload()}>
                {(() => (
                  <Paragraph type="p2" semiBold color="secondary">
                    {formatEventTime(event.name, event.startTimestamp, event.endTimestamp)}
                  </Paragraph>
                ))}
              </UseLeftTime>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalStatusCard;
