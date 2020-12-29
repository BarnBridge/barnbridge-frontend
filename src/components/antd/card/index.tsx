import React from 'react';
import * as Antd from 'antd';
import { CardProps as AntdCardProps } from 'antd/lib/card';

import s from './styles.module.scss';

export type CardProps = AntdCardProps & {};

const Card: React.FunctionComponent<CardProps> = props => {
  return (
    <Antd.Card
      className={s.component}
      bordered={false}
      {...props}>
    </Antd.Card>
  );
};

export default Card;
