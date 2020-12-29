import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';

import { ReactComponent as PlusCircleSvg } from 'resources/svg/icons/plus-circle.svg';

import s from './styles.module.scss';

export type ProposalCreateViewProps = {};

const ProposalCreateView: React.FunctionComponent<ProposalCreateViewProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>Create Proposal</div>
      </div>
      <div className={s.cards}>
        <Card
          title="Proposal description"
        />
        <Card
          title="Actions">
          <Button
            type="ghost"
            icon={<PlusCircleSvg />}
            className={s.addActionBtn}>Add new action</Button>
        </Card>
      </div>
    </div>
  );
};

export default ProposalCreateView;
