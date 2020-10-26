import React from 'react';
import * as Antd from 'antd';

import InfoTooltip from 'components/info-tooltip';

import s from './styles.module.css';

export type StatWidgetProps = {
  label: string;
  value?: string;
  hint?: React.ReactNode | string;
  help?: React.ReactNode;
};

const StatWidget: React.FunctionComponent<StatWidgetProps> = props => {
  return (
    <Antd.Card className={s.component}>
      <div className={s.header}>
        <div className={s.label}>{props.label}</div>
        {props.help && (
          <InfoTooltip title={props.help} />
        )}
      </div>
      {props.value && (
        <div className={s.value} text-elipsis="true">{props.value}</div>
      )}
      {props.hint && (
        <div className={s.hint} text-elipsis="true">{props.hint}</div>
      )}
    </Antd.Card>
  );
};

export default StatWidget;
