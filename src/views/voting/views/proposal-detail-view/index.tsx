import React from 'react';

import s from './styles.module.scss';

export type ProposalDetailViewProps = {};

const ProposalDetailView: React.FunctionComponent<ProposalDetailViewProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>Proposal Detail</div>
      </div>
    </div>
  );
};

export default ProposalDetailView;
