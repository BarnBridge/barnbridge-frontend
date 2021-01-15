import React from 'react';
import * as Antd from 'antd';
import { CardProps as AntdCardProps } from 'antd/lib/card';
import cx from 'classnames';

import s from './styles.module.scss';

export type CardProps = AntdCardProps & {};

const Card: React.FunctionComponent<CardProps> = props => {
  const { className, ...cardProps } = props;

  return (
    <Antd.Card
      className={cx(s.component, className)}
      bordered={false}
      {...cardProps}>
    </Antd.Card>
  );
};

export default Card;
