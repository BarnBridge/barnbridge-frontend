import React from 'react';
import * as Antd from 'antd';
import { ProgressProps as AntdProgressProps } from 'antd/lib/progress';
import cx from 'classnames';

import s from './styles.module.scss';

export type ProgressProps = AntdProgressProps & {
  className?: string;
  acceptance?: number;
};

const Progress: React.FunctionComponent<ProgressProps> = props => {
  const { className, acceptance, ...progressProps } = props;
  const acceptanceMode = acceptance !== undefined;
  const acceptanceFulfilled = Number(acceptance) <= Number(props.percent);

  return (
    <Antd.Progress
      className={cx(s.component, acceptanceMode && s.acceptance, acceptanceFulfilled && s.fulfilled, className)}
      showInfo={false}
      success={acceptanceMode ? {
        percent: acceptance,
        strokeColor: acceptanceFulfilled
          ? String(props.strokeColor)
          : props.trailColor,
      } : undefined}
      {...progressProps} />
  );
};

export default Progress;
