import React from 'react';
import * as Antd from 'antd';
import { SkeletonProps as AntdSkeletonProps } from 'antd/lib/skeleton';
import cx from 'classnames';

import s from './styles.module.scss';

export type SkeletonProps = AntdSkeletonProps & {
  width?: number;
  height?: number;
};

const Skeleton: React.FC<SkeletonProps> = props => {
  const { className, width, height, loading, children, ...skeletonProps } = props;

  return (
    <Antd.Skeleton
      className={cx(s.skeleton, className)}
      title={{ width, style: { height } }}
      active
      loading={loading !== false}
      paragraph={{ rows: 0 }}
      {...skeletonProps}>
      {children}
    </Antd.Skeleton>
  );
};

export default Skeleton;
