import React from 'react';
import AntdProgress, { ProgressProps as AntdProgressProps } from 'antd/lib/progress';
import cn from 'classnames';

import s from './s.module.scss';

export type ProgressProps = AntdProgressProps & {
  className?: string;
  acceptance?: number;
};

const Progress: React.FC<ProgressProps> = props => {
  const { className, acceptance, ...progressProps } = props;
  const acceptanceMode = acceptance !== undefined;
  const acceptanceFulfilled = Number(acceptance) <= Number(props.percent);

  return (
    <AntdProgress
      className={cn(s.component, acceptanceMode && s.acceptance, acceptanceFulfilled && s.fulfilled, className)}
      showInfo={false}
      success={
        acceptanceMode
          ? {
              percent: acceptance,
              strokeColor: acceptanceFulfilled ? String(props.strokeColor) : props.trailColor,
            }
          : undefined
      }
      {...progressProps}
    />
  );
};

export default Progress;
