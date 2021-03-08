import React from 'react';
import cn from 'classnames';

import { Text } from 'components/custom/typography';
import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

import s from './s.module.scss';

export type ProposalStatusTagProps = {
  className?: string;
  state: APIProposalState;
};

const ProposalStatusTag: React.FC<ProposalStatusTagProps> = props => {
  const { state, className } = props;

  return (
    <div className={cn(s.component, className, s[state])}>
      <Text type="lb2" weight="bold">
        {APIProposalStateMap.get(state)}
      </Text>
    </div>
  );
};

export default ProposalStatusTag;
