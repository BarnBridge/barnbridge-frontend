import React from 'react';
import * as Antd from 'antd';
import { SkeletonProps as AntdSkeletonProps } from 'antd/lib/skeleton';
import cx from 'classnames';

import s from './styles.module.scss';

export type SkeletonProps = AntdSkeletonProps & {
  width?: number;
  height?: number;
};

const Skeleton: React.FunctionComponent<SkeletonProps> = props => {
  const { className, children, width, height, ...skeletonProps } = props;

  return (
    <Antd.Skeleton
      className={cx(s.component, className)}
      active
      loading
      title={{ width, style: { height } }}
      paragraph={{ rows: 0 }}
      {...skeletonProps}>
      {children}
    </Antd.Skeleton>
  );
};

export default Skeleton;
