import React from 'react';
import * as Antd from 'antd';

import s from './styles.module.css';

export type CardProps = {
  title: string;
};

const Card: React.FunctionComponent<CardProps> = props => {
  return (
    <Antd.Card className={s.card} title={props.title} bordered={false}>
      {props.children}
    </Antd.Card>
  );
};

export default Card;
