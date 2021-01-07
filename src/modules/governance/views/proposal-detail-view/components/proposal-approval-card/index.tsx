import React from 'react';

import Card from 'components/antd/card';

import s from './styles.module.scss';
import { Paragraph } from 'components/custom/typography';
import * as Antd from 'antd';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { ProposalData } from 'web3/contracts/daoGovernance';

export type ProposalApprovalCardProps = {
  proposal?: ProposalData;
};

type ProposalApprovalCardState = {
  forRate?: number;
};

const ProposalApprovalCard: React.FunctionComponent<ProposalApprovalCardProps> = props => {
  const { proposal } = props;
  const web3c = useWeb3Contracts();
  const [state, setState] = React.useState<ProposalApprovalCardState>({});

  React.useEffect(() => {
    if (!proposal?.meta) {
      return;
    }

    const { meta } = proposal;
    const { forVotesBN, againstVotesBN } = meta;
    const total = forVotesBN.plus(againstVotesBN);

    let forRate = 0;

    if (total.isGreaterThan(ZERO_BIG_NUMBER)) {
      forRate = forVotesBN.multipliedBy(100).div(total).toNumber();
    }

    setState(prevState => ({
      ...prevState,
      forRate,
    }));
  }, [proposal?.meta]);

  return (
    <Card className={s.component} title="Approval">
      <div className={s.row}>
        <div className={s.headerHint}>
          <Paragraph type="p1" semiBold>{state.forRate}%</Paragraph>
          <Paragraph type="p1">(&gt; {web3c.daoGovernance.acceptanceThreshold}% required)</Paragraph>
        </div>
        <Antd.Progress
          className={s.progress}
          percent={state.forRate}
          showInfo={false}
          strokeColor="#00D395"
          trailColor="rgba(0, 211, 149, 0.16)" />
      </div>
    </Card>
  );
};

export default ProposalApprovalCard;
