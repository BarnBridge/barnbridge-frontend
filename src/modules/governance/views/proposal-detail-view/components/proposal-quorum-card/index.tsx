import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import { Paragraph } from 'components/custom/typography';

import { useWeb3Contracts } from 'web3/contracts';
import { ProposalData } from 'web3/contracts/daoGovernance';
import { formatBigValue } from 'web3/utils';

import s from './styles.module.scss';

export type ProposalQuorumCardProps = {
  proposal?: ProposalData;
};

type ProposalQuorumCardState = {
  quorum?: BigNumber;
};

const ProposalQuorumCard: React.FunctionComponent<ProposalQuorumCardProps> = props => {
  const { proposal } = props;
  const [state, setState] = React.useState<ProposalQuorumCardState>({});

  const web3c = useWeb3Contracts();

  React.useEffect(() => {
    if (!proposal?.meta) {
      return;
    }

    const { meta, create_time } = proposal;
    const { forVotesBN, againstVotesBN } = meta;
    const total = forVotesBN.plus(againstVotesBN);

    if (web3c.daoGovernance.warmUpDuration) {
      const stakedTs = create_time + web3c.daoGovernance.warmUpDuration;

      web3c.daoBarn.actions.bondStakedAtTs(stakedTs)
        .then(([bondStakedAt]) => {
          const quorum = total.multipliedBy(100).div(bondStakedAt);

          setState(prevState => ({
            ...prevState,
            quorum,
          }));
        });
    }
  }, [proposal?.meta, web3c.daoGovernance.warmUpDuration]);

  return (
    <Card className={s.component} title="Quorum">
      <div className={s.row}>
        <div className={s.headerHint}>
          <Paragraph type="p1" semiBold>{formatBigValue(state.quorum, 2)}%</Paragraph>
          <Paragraph type="p1">(&gt; {web3c.daoGovernance.minQuorum}% required)</Paragraph>
        </div>
        <Antd.Progress
          className={s.progress}
          percent={state.quorum?.toNumber()}
          showInfo={false}
          strokeColor="#00D395"
          trailColor="rgba(0, 211, 149, 0.16)" />
      </div>
    </Card>
  );
};

export default ProposalQuorumCard;
