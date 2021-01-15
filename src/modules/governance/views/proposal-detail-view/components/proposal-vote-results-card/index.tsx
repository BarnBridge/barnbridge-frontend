import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import { Paragraph, Small } from 'components/custom/typography';
import ProposalVotersModal from '../proposal-voters-modal';
import { useProposal } from '../../providers/ProposalProvider';

import s from './styles.module.scss';

const ProposalVoteResultsCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();
  const [votersModal, showVotersModal] = React.useState<boolean>(false);

  return (
    <Card
      className={s.component}
      title="Vote results"
      extra={(
        <Button
          type="link"
          onClick={() => showVotersModal(true)}>View voters</Button>
      )}>
      <div className={s.row}>
        <div className={s.rowHeader}>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>For</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{proposalCtx.proposal?.forVotes}</Paragraph>
              <Paragraph type="p1">({proposalCtx.forRate}%)</Paragraph>
            </div>
          </div>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Against</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{proposalCtx.proposal?.againstVotes}</Paragraph>
              <Paragraph type="p1">({proposalCtx.againstRate}%)</Paragraph>
            </div>
          </div>
        </div>
        <Antd.Progress
          className={s.progress}
          percent={proposalCtx.forRate}
          showInfo={false}
          strokeColor="#00D395"
          trailColor="#FF4339" />
      </div>
      <div className={s.row}>
        <div className={s.rowHeader}>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Quorum</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{proposalCtx.quorum}%</Paragraph>
              <Paragraph type="p1">(&gt; {proposalCtx.proposal?.minQuorum}% required)</Paragraph>
            </div>
          </div>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Approval</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{proposalCtx.forRate}%</Paragraph>
              <Paragraph type="p1">(&gt; {proposalCtx.proposal?.acceptanceThreshold}% required)</Paragraph>
            </div>
          </div>
        </div>
      </div>
      <ProposalVotersModal
        visible={votersModal}
        onCancel={() => showVotersModal(false)} />
    </Card>
  );
};

export default ProposalVoteResultsCard;
