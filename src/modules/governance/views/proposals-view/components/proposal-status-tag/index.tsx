import React from 'react';
import cx from 'classnames';

import { Label } from 'components/custom/typography';
import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

import s from './styles.module.scss';

export type ProposalStatusTagProps = {
  className?: string;
  state: APIProposalState;
};

const ProposalStatusTag: React.FunctionComponent<ProposalStatusTagProps> = props => {
  const { state, className } = props;

  return (
    <div className={cx(s.component, className, s[state])}>
      <Label type="lb2" bold>
        {APIProposalStateMap.get(state)}
      </Label>
    </div>
  );
};

export default ProposalStatusTag;
