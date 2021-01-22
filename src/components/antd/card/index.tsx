import React from 'react';
import * as Antd from 'antd';
import { CardProps as AntdCardProps } from 'antd/lib/card';
import cx from 'classnames';

import s from './styles.module.scss';

export type CardProps = AntdCardProps & {
  noPaddingBody?: boolean;
};

const Card: React.FunctionComponent<CardProps> = props => {
  const { className, noPaddingBody, ...cardProps } = props;

  return (
    <Antd.Card
      className={cx(s.component, className, noPaddingBody && s.noPaddingBody )}
      bordered={false}
      {...cardProps}>
    </Antd.Card>
  );
};

const CardDelimiter: React.FunctionComponent = () => (
  <div className={s.delimiter} />
);

export type StaticCardProps = {
  Delimiter: React.FunctionComponent;
};

(Card as any as StaticCardProps).Delimiter = CardDelimiter;

export default Card as React.FunctionComponent<CardProps> & StaticCardProps;
