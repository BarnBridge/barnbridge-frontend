import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import { Paragraph } from 'components/custom/typography';
import ProposalVotersModal from '../proposal-voters-modal';

import { formatBigValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { ProposalData } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';
import { useWallet } from 'wallets/wallet';

export type ProposalVotesCardProps = {
  proposal?: ProposalData;
};

type ProposalVotesCardState = {
  forValue?: string;
  forRate?: number;
  againstValue?: string;
  againstRate?: number;
  votingPower?: BigNumber;
  hasVoted?: boolean;
  votes?: number;
  support?: boolean;
};

const ProposalVotesCard: React.FunctionComponent<ProposalVotesCardProps> = props => {
  const { proposal } = props;
  const [state, setState] = React.useState<ProposalVotesCardState>({});
  const [votersModal, showVotersModal] = React.useState<boolean>(false);
  const web3c = useWeb3Contracts();
  const wallet = useWallet();

  React.useEffect(() => {
    if (!proposal?.meta) {
      return;
    }

    const { forVotesBN, againstVotesBN } = proposal.meta;
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
  }, [proposal?.meta]);

  React.useEffect(() => {
    if (wallet.account && proposal?.meta && web3c.daoGovernance.warmUpDuration) {
      const ts = proposal.create_time + web3c.daoGovernance.warmUpDuration;

      web3c.daoBarn.actions.votingPowerAtTs(ts)
        .then(([votingPower]) => {
          setState(prevState => ({
            ...prevState,
            votingPower,
          }));
        });

      web3c.daoGovernance.getReceiptCall(proposal.proposal_id)
        .then(([result]) => {
          setState(prevState => ({
            ...prevState,
            hasVoted: result[0],
            votes: Number(result[1]),
            support: result[2],
          }));
        });
    }
  }, [wallet.account, proposal?.meta, web3c.daoGovernance.warmUpDuration]);

  return (
    <Card
      className={s.component}
      title="Votes"
      extra={(
        <Button type="link" onClick={() => showVotersModal(true)}>View voters</Button>
      )}>
      <div className={s.row}>
        <div className={s.rowLine}>
          <div className={s.headerWrap}>
            <Paragraph type="p1" className={s.headerLabel}>For</Paragraph>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.forValue}</Paragraph>
              <Paragraph type="p1">({state.forRate}%)</Paragraph>
            </div>
          </div>
          <Antd.Progress
            className={s.progress}
            percent={state.forRate}
            showInfo={false}
            strokeColor="#00D395"
            trailColor="rgba(0, 211, 149, 0.16)" />
        </div>

        <div className={s.rowLine}>
          <div className={s.headerWrap}>
            <Paragraph type="p1" className={s.headerLabel}>Against</Paragraph>
            <div className={s.headerHint}>
              <Paragraph type="p1" semiBold>{state.againstValue}</Paragraph>
              <Paragraph type="p1">({state.againstRate}%)</Paragraph>
            </div>
          </div>
          <Antd.Progress
            className={s.progress}
            percent={state.againstRate}
            showInfo={false}
            strokeColor="#FF4339"
            trailColor="rgba(255, 67, 57, 0.16)" />
        </div>
      </div>
      <div className={s.row}>
        <div className={s.rowLine}>
          <Paragraph type="p1">Your voting power for this proposal</Paragraph>
          <Paragraph type="p1" semiBold>{formatBigValue(state.votingPower, 2)}</Paragraph>
        </div>
        {!state.hasVoted ? (
          <div className={s.actions}>
            <Button type="primary">Vote for</Button>
            <Button type="default">Vote against</Button>
          </div>
        ) : (
          <>
            <Alert message="You already voted FOR the proposal" />
            <div className={s.actions}>
              <Button type="primary">Change vote</Button>
              <Button type="default">Cancel vote</Button>
            </div>
          </>
        )}
      </div>
      <ProposalVotersModal
        proposal={proposal}
        visible={votersModal}
        onCancel={() => showVotersModal(false)} />
    </Card>
  );
};

export default ProposalVotesCard;
