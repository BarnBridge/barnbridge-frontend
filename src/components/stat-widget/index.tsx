import React from 'react';
import * as Antd from 'antd';

import InfoTooltip from 'components/info-tooltip';

import s from './styles.module.css';

export type StatWidgetProps = {
  label: string;
  value?: string;
  hint?: string;
  help?: string;
};

const StatWidget: React.FunctionComponent<StatWidgetProps> = props => {
  return (
    <Antd.Card className={s.card}>
      <Antd.Row className={s.firstRow}>
        <Antd.Col>
          <div className={s.label}>{props.label}</div>
        </Antd.Col>
        {props.help && (
          <Antd.Col><InfoTooltip title={props.help} /></Antd.Col>
        )}
      </Antd.Row>
      {props.value && (
        <Antd.Row>
          <Antd.Col>
            <div className={s.value} text-elipsis="true">{props.value}</div>
          </Antd.Col>
        </Antd.Row>
      )}
      {props.hint && (
        <Antd.Row>
          <Antd.Col>
            <div className={s.hint} text-elipsis="true">{props.hint}</div>
          </Antd.Col>
        </Antd.Row>
      )}
    </Antd.Card>
  );
};

export default StatWidget;
