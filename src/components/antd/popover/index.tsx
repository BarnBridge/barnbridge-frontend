import React from 'react';
import * as Antd from 'antd';
import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';

import s from './styles.module.scss';

export type PopoverProps = {};

const Popover: React.FunctionComponent<AntdPopoverProps & PopoverProps> = props => {
  const { children, ...popoverProps } = props;

  return (
    <Antd.Popover
      overlayClassName={s.overlay}
      trigger="click"
      placement="bottom"
      {...popoverProps}>
      {children}
    </Antd.Popover>
  );
};

export default Popover;
