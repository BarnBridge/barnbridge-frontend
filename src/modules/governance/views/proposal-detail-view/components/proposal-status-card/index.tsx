import React from 'react';

import Card from 'components/antd/card';
import { Paragraph } from 'components/custom/typography';

import { ProposalData } from 'web3/contracts/daoGovernance';

import { ReactComponent as CircleTimeSvg } from 'resources/svg/icons/circle-time.svg';
import { ReactComponent as CircleCheckSvg } from 'resources/svg/icons/circle-check.svg';

import s from './styles.module.scss';

export type ProposalStatusCardProps = {
  proposal?: ProposalData;
};

export type ProposalEventData = {
  proposal_id: number;
  caller: string;
  event_type: string;
  event_data: any;
  create_time: number;
};

function fetchProposalEvents(proposalId: number): Promise<ProposalEventData[]> {
  return fetch(`https://bbtest.kwix.xyz/api/governance/proposals/${proposalId}/events`)
    .then(result => result.json())
    .then(result => result.data);
}

const ProposalStatusCard: React.FunctionComponent<ProposalStatusCardProps> = props => {
  const { proposal } = props;
  const [events, setEvents] = React.useState<ProposalEventData[]>([]);

  React.useEffect(() => {
    if (!proposal?.proposal_id) {
      return;
    }

    fetchProposalEvents(proposal.proposal_id)
      .then((events: ProposalEventData[]) => {
        setEvents(events.reverse());
      });
  }, [proposal?.proposal_id]);

  return (
    <Card className={s.component}>
      <div className={s.list}>
        {events.map(event => (
          <div key={event.event_type} className={s.wrap}>
            <CircleTimeSvg />
            <div className={s.content}>
              <Paragraph type="p1" semiBold className={s.nameLabel}>{event.event_type}</Paragraph>
              <Paragraph type="p2" semiBold className={s.timeLabel}>{event.create_time}</Paragraph>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProposalStatusCard;
