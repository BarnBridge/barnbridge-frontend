import React from 'react';
import cn from 'classnames';

import { Text } from 'components/custom/typography';

import s from './s.module.scss';

export type StatusTagProps = {
  text: React.ReactNode;
  color: 'red' | 'green' | 'blue';
  className?: string;
  style?: React.CSSProperties;
};

const StatusTag: React.FC<StatusTagProps> = props => {
  const { text, color, className, style } = props;

  return (
    <div className={cn(s.statusTag, className, s[color])} style={style}>
      <Text type="lb2" tag="label" weight="bold">
        {text}
      </Text>
    </div>
  );
};

export default StatusTag;
