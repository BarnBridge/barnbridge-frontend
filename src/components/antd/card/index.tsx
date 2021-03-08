import React from 'react';
import AntdCard, { CardProps as AntdCardProps } from 'antd/lib/card';
import cn from 'classnames';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';

import s from './s.module.scss';

export type CardProps = AntdCardProps & {
  showExpandButton?: boolean;
  expanded?: boolean;
  noPaddingBody?: boolean;
};

const Card: React.FC<CardProps> = props => {
  const { className, showExpandButton = false, expanded = true, noPaddingBody = false, children, ...cardProps } = props;

  const [expandedState, setExpanded] = React.useState<boolean>(expanded);

  React.useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  return (
    <AntdCard
      className={cn(s.component, className, noPaddingBody && s.noPaddingBody)}
      bordered={false}
      extra={
        showExpandButton ? (
          <Button
            type="link"
            className={s.arrow}
            icon={<Icon name="chevron-right" rotate={expandedState ? 270 : 0} />}
            onClick={() => setExpanded(prevState => !prevState)}
          />
        ) : undefined
      }
      {...cardProps}>
      {expandedState && children}
    </AntdCard>
  );
};

export default Card;
