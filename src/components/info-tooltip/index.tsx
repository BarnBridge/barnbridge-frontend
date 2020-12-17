import React from 'react';
import * as Antd from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/icons/info-circle.svg';

import s from './styles.module.scss';

export type InfoTooltipProps = Partial<TooltipPropsWithTitle> & {};

const InfoTooltip: React.FunctionComponent<InfoTooltipProps> = props => {
  const { className, ...rest } = props;

  return (
    <Antd.Tooltip
      overlayClassName={s.tooltip}
      placement="bottom"
      title=""
      {...rest}
    >
      <InfoCircleSvg className={s.icon} />
    </Antd.Tooltip>
  );
};

export default InfoTooltip;
