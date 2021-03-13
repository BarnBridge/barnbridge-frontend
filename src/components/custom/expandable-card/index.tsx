import React from 'react';
import AntdCard, { CardProps as AntdCardProps } from 'antd/lib/card';
import cn from 'classnames';

import s from './s.module.scss';

export type ExpandableCardProps = AntdCardProps & {
  footer?: React.ReactNode;
};

const ExpandableCard: React.FC<ExpandableCardProps> = props => {
  const { className, children, footer, ...cardProps } = props;

  return (
    <AntdCard className={cn(s.component, className)} {...cardProps}>
      <div className={s.content}>{children}</div>
      {footer && <div className={s.footer}>{footer}</div>}
    </AntdCard>
  );
};
export default ExpandableCard;
