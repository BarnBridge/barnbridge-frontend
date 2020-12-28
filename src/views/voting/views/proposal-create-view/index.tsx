import React from 'react';

import s from './styles.module.scss';

export type ProposalCreateViewProps = {};

const ProposalCreateView: React.FunctionComponent<ProposalCreateViewProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>Create Proposal</div>
      </div>
    </div>
  );
};

export default ProposalCreateView;
