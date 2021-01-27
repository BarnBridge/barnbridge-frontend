import React from 'react';
import * as Antd from 'antd';

import Skeleton from 'components/antd/skeleton';
import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';

import s from './styles.module.scss';

export type StatCardProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  help?: React.ReactNode;
};

const StatCard: React.FunctionComponent<StatCardProps> = props => {
  const loading = props.value === undefined || props.value === '-' || props.value === '';

  return (
    <Antd.Card className={s.component}>
      <div className={s.header}>
        <div className={s.label}>{props.label}</div>
        {props.help && <Tooltip type="info" title={props.help} />}
      </div>
      <div className={s.valueWrap}>
        <Skeleton
          loading={loading}
          width={220} height={24}>
          <div className={s.value}>{props.value}</div>
        </Skeleton>
      </div>
      <div className={s.hintWrap}>
        <Skeleton
          loading={loading}
          width={220} height={16}>
          <div className={s.hint}>{props.hint}</div>
        </Skeleton>
      </div>
    </Antd.Card>
  );
};

export default StatCard;
