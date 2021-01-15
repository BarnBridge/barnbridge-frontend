import React from 'react';
import { format, formatDistance } from 'date-fns';

import Card from 'components/antd/card';
import { Paragraph } from 'components/custom/typography';
import Icon, { IconType } from 'components/custom/icon';
import { useProposal } from '../../providers/ProposalProvider';

import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

import s from './styles.module.scss';

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
  ].includes(name as any)) {
    return format(mStart, 'MM.dd.yyyy - HH:mm');
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
    <Card className={s.component}>
      <div className={s.list}>
        {proposalCtx.proposal?.history.map((event, index: number) => (
          <div key={event.name} className={s.wrap}>
            <Icon type={getEventIcon(index, event.name)} size={[40, 40]} />
            <div className={s.content}>
              <Paragraph type="p1" semiBold className={s.nameLabel}>
                {APIProposalStateMap.get(event.name as APIProposalState)}
              </Paragraph>
              <Paragraph type="p2" semiBold className={s.timeLabel}>
                {formatEventTime(event.name, event.startTimestamp, event.endTimestamp)}
              </Paragraph>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProposalStatusCard;
