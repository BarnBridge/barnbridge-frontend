import React from 'react';

import Card from 'components/antd/card';
import { Paragraph } from 'components/custom/typography';

import { ReactComponent as CircleTimeSvg } from 'resources/svg/icons/circle-time.svg';
import { ReactComponent as CircleCheckSvg } from 'resources/svg/icons/circle-check.svg';

import s from './styles.module.scss';

export type ProposalStatusCardProps = {};

const ProposalStatusCard: React.FunctionComponent<ProposalStatusCardProps> = props => {
  return (
    <Card className={s.component}>
      <div className={s.list}>
        <div className={s.wrap}>
          <CircleTimeSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Pending execution</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>2 days 4 hours left</Paragraph>
          </div>
        </div>
        <div className={s.wrap}>
          <CircleCheckSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Queued for execution</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>Ended on 12.22.2020 - 17:52</Paragraph>
          </div>
        </div>
        <div className={s.wrap}>
          <CircleCheckSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Accepted</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>Ended on 12.22.2020 - 17:52</Paragraph>
          </div>
        </div>
        <div className={s.wrap}>
          <CircleCheckSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Voting</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>Ended on 12.18.2020 - 16:34</Paragraph>
          </div>
        </div>
        <div className={s.wrap}>
          <CircleCheckSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Warm-up</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>Ended on 12.16.2020 - 16:33</Paragraph>
          </div>
        </div>
        <div className={s.wrap}>
          <CircleCheckSvg />
          <div className={s.content}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>Created</Paragraph>
            <Paragraph type="p2" semiBold className={s.timeLabel}>12.14.2020 - 16:32</Paragraph>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProposalStatusCard;
