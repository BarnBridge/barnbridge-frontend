import React from 'react';
import * as Antd from 'antd';

import s from './styles.module.css';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/info-circle.svg';

export type StatWidgetProps = {
  label: string;
  value?: string;
  hint?: string;
};

const StatWidget: React.FunctionComponent<StatWidgetProps> = props => {
  return (
    <Antd.Card className={s.card}>
      <Antd.Row className={s.firstRow}>
        <Antd.Col>
          <div className={s.label}>{props.label}</div>
        </Antd.Col>
        <Antd.Col><InfoCircleSvg className={s.infoIcon} /></Antd.Col>
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
