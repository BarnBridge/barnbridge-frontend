import React from 'react';
import AntdSkeleton, { SkeletonProps as AntdSkeletonProps } from 'antd/lib/skeleton';
import cn from 'classnames';

import s from './s.module.scss';

export type SkeletonProps = AntdSkeletonProps & {
  width?: number;
  height?: number;
};

const Skeleton: React.FC<SkeletonProps> = props => {
  const { className, width, height, loading, children, ...skeletonProps } = props;

  return (
    <AntdSkeleton
      className={cn(s.skeleton, className)}
      title={{ width, style: { height } }}
      active
      loading={loading !== false}
      paragraph={{ rows: 0 }}
      {...skeletonProps}>
      {children}
    </AntdSkeleton>
  );
};

export default Skeleton;
