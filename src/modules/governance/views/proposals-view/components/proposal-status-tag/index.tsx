import React from 'react';
import cx from 'classnames';

import { Label } from 'components/custom/typography';

import { ProposalState } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';

export type ProposalStatusTagProps = {
  state: ProposalState;
  className?: string;
};

const ProposalStatusTag: React.FunctionComponent<ProposalStatusTagProps> = props => {
  const { state, className } = props;

  const status = React.useMemo(() => {
    switch (state) {
      case ProposalState.WarmUp:
        return 'Warm-up';
      case ProposalState.Active:
        return 'Voting';
      case ProposalState.Queued:
        return 'Queued for execution';
      case ProposalState.Accepted:
        return 'Accepted';
      case ProposalState.Executed:
        return 'Executed';
      case ProposalState.Expired:
        return 'Expired';
      case ProposalState.Failed:
        return 'Failed';
      case ProposalState.Canceled:
        return 'Canceled';
      case ProposalState.Grace:
        return '-';
    }
  }, [state]);

  return (
    <div className={cx(s.component, className, s[ProposalState[state]])}>
      <Label type="lb2" bold>{status}</Label>
    </div>
  );
};

export default ProposalStatusTag;
