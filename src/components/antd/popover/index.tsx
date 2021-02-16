import React from 'react';
import * as Antd from 'antd';
import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import cx from 'classnames';

import s from './styles.module.scss';

export type PopoverProps = {
  noPadding?: boolean;
};

const Popover: React.FC<AntdPopoverProps & PopoverProps> = props => {
  const { noPadding, children, ...popoverProps } = props;

  return (
    <Antd.Popover
      overlayClassName={cx(s.overlay, noPadding && s.noPadding)}
      trigger="click"
      placement="bottom"
      {...popoverProps}>
      {children}
    </Antd.Popover>
  );
};

export default Popover;
