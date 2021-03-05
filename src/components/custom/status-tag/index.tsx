import React from 'react';
import cn from 'classnames';

import { Text } from 'components/custom/typography';

import s from './styles.module.scss';

export type StatusTagProps = {
  text: React.ReactNode;
  color: 'red' | 'green' | 'blue';
  className?: string;
};

const StatusTag: React.FC<StatusTagProps> = props => {
  const { text, color, className } = props;

  return (
    <div className={cn(s.statusTag, className, s[color])}>
      <Text type="lb2" tag="label" weight="bold">
        {text}
      </Text>
    </div>
  );
};

export default StatusTag;
