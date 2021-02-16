import React from 'react';
import * as Antd from 'antd';
import { TooltipPropsWithTitle as AntdTooltipPropsWithTitle } from 'antd/lib/tooltip';
import cx from 'classnames';

import Icons from 'components/custom/icon';

import s from './styles.module.scss';

export type TooltipProps = Partial<AntdTooltipPropsWithTitle> & {
  type?: 'info';
};

const Tooltip: React.FC<TooltipProps> = props => {
  const { type, overlayClassName, children, ...tooltipProps } = props;

  return (
    <Antd.Tooltip
      title=""
      placement="bottom"
      overlayClassName={cx(s.overlay, overlayClassName)}
      {...tooltipProps}>
      {children}
      {type === 'info' && (
        <Icons name="info-outlined" width={16} height={16} />
      )}
    </Antd.Tooltip>
  );
};

export default Tooltip;
