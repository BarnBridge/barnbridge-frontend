import React from 'react';
import * as Antd from 'antd';
import { CardProps as AntdCardProps } from 'antd/lib/card';
import cn from 'classnames';

import s from './styles.module.scss';

export type ExpandableCardProps = AntdCardProps & {
  footer?: React.ReactNode;
};

const ExpandableCard: React.FC<ExpandableCardProps> = props => {
  const { className, children, footer, ...cardProps } = props;

  return (
    <Antd.Card className={cn(s.component, className)} {...cardProps}>
      <div className={s.content}>{children}</div>
      {footer && <div className={s.footer}>{footer}</div>}
    </Antd.Card>
  );
};
export default ExpandableCard;
