import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import { Paragraph, Small } from 'components/custom/typography';
import ProposalVotersModal from '../proposal-voters-modal';

import { formatBigValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { ProposalData } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';

export type ProposalVoteResultsCardProps = {
  proposal?: ProposalData;
};

type ProposalVoteResultsCardState = {
  forValue?: string;
  forRate?: number;
  againstValue?: string;
  againstRate?: number;
  quorum?: string;
};

const ProposalVoteResultsCard: React.FunctionComponent<ProposalVoteResultsCardProps> = props => {
  const { proposal } = props;
  const [state, setState] = React.useState<ProposalVoteResultsCardState>({});

  const web3c = useWeb3Contracts();
  const [votersModal, showVotersModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!proposal?.meta) {
      return;
    }

    const { meta, create_time } = proposal;
    const { forVotesBN, againstVotesBN } = meta;
    const total = forVotesBN.plus(againstVotesBN);

    let forRate = 0;
    let againstRate = 0;

    if (total.isGreaterThan(ZERO_BIG_NUMBER)) {
      forRate = forVotesBN.multipliedBy(100).div(total).toNumber();
      againstRate = againstVotesBN.multipliedBy(100).div(total).toNumber();
    }

    setState(prevState => ({
      ...prevState,
      forValue: formatBigValue(forVotesBN, 0),
      forRate,
      againstValue: formatBigValue(againstVotesBN, 0),
      againstRate,
    }));

    if (web3c.daoGovernance.warmUpDuration) {
      const stakedTs = create_time + web3c.daoGovernance.warmUpDuration;

      web3c.daoBarn.actions.bondStakedAtTs(stakedTs)
        .then(([bondStakedAt]) => {
          const quorum = total.multipliedBy(100).div(bondStakedAt);

          setState(prevState => ({
            ...prevState,
            quorum: formatBigValue(quorum, 2),
          }));
        });
    }
  }, [proposal?.meta, web3c.daoGovernance.warmUpDuration]);

  return (
    <Card
      className={s.component}
      title="Vote results"
      extra={(
        <Button type="link" onClick={() => showVotersModal(true)}>View voters</Button>
      )}>
      <div className={s.row}>
        <div className={s.rowHeader}>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>For</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.forValue}</Paragraph>
              <Paragraph type="p1">({state.forRate}%)</Paragraph>
            </div>
          </div>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Against</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.againstValue}</Paragraph>
              <Paragraph type="p1">({state.againstRate}%)</Paragraph>
            </div>
          </div>
        </div>
        <Antd.Progress
          className={s.progress}
          percent={state.forRate}
          showInfo={false}
          strokeColor="#00D395"
          trailColor="#FF4339" />
      </div>
      <div className={s.row}>
        <div className={s.rowHeader}>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Quorum</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.quorum}%</Paragraph>
              <Paragraph type="p1">(&gt; {web3c.daoGovernance.minQuorum}% required)</Paragraph>
            </div>
          </div>
          <div className={s.headerWrap}>
            <Small semiBold className={s.headerLabel}>Approval</Small>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.forRate}%</Paragraph>
              <Paragraph type="p1">(&gt; {web3c.daoGovernance.acceptanceThreshold}% required)</Paragraph>
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
