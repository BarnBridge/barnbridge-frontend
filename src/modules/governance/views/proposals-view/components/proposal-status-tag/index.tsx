import React from 'react';
import cx from 'classnames';

import { Label } from 'components/custom/typography';
import { APIProposalState } from 'modules/governance/api';

import s from './styles.module.scss';

export type ProposalStatusTagProps = {
  className?: string;
  state: APIProposalState;
};

const ProposalStatusTag: React.FunctionComponent<ProposalStatusTagProps> = props => {
  const { state, className } = props;

  const status = React.useMemo(() => {
    switch (state) {
      case APIProposalState.WARMUP:
        return 'Warm-up';
      case APIProposalState.ACTIVE:
        return 'Voting';
      case APIProposalState.QUEUED:
        return 'Queued for execution';
      case APIProposalState.ACCEPTED:
        return 'Accepted';
      case APIProposalState.EXECUTED:
        return 'Executed';
      case APIProposalState.EXPIRED:
        return 'Expired';
      case APIProposalState.FAILED:
        return 'Failed';
      case APIProposalState.CANCELED:
        return 'Canceled';
      case APIProposalState.GRACE:
        return '-';
    }
  }, [state]);

  return (
    <div className={cx(s.component, className, s[state])}>
      <Label type="lb2" bold>{status}</Label>
    </div>
  );
};

export default ProposalStatusTag;
