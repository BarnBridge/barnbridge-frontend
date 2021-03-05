import React from 'react';
import * as Antd from 'antd';
import { TooltipPropsWithTitle as AntdTooltipPropsWithTitle } from 'antd/lib/tooltip';
import cn from 'classnames';

import s from './styles.module.scss';

export type TooltipProps = Partial<AntdTooltipPropsWithTitle>;

const Tooltip: React.FC<TooltipProps> = props => {
  const { overlayClassName, children, ...tooltipProps } = props;

  return (
    <Antd.Tooltip title="" placement="bottom" overlayClassName={cn(s.overlay, overlayClassName)} {...tooltipProps}>
      {children}
    </Antd.Tooltip>
  );
};

export default Tooltip;
