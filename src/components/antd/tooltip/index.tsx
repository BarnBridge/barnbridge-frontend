import React from 'react';
import * as Antd from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import cx from 'classnames';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';

import s from './styles.module.scss';

export type TooltipProps = Partial<TooltipPropsWithTitle> & {
  type?: 'info';
};

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const { overlayClassName, type, children, ...rest } = props;

  return (
    <Antd.Tooltip
      overlayClassName={cx(s.overlay, overlayClassName)}
      placement="bottom"
      title=""
      {...rest}
    >
      {children}
      {type === 'info' && (
        <Button type="link">
          <Icon type="info-circle" width={16} height={16} />
        </Button>
      )}
    </Antd.Tooltip>
  );
};

export default Tooltip;
