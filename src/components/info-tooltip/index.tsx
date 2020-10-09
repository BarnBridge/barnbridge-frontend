import React from 'react';

import s from './styles.module.css';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/icons/info-circle.svg';

export type InfoTooltipProps = {};

const InfoTooltip: React.FunctionComponent<InfoTooltipProps> = props => {
  return (
    <div className={s.component}>
      <InfoCircleSvg />
    </div>
  );
};

export default InfoTooltip;
