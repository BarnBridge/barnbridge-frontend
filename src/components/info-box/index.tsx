import React from 'react';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/icons/info-circle.svg';

import s from './styles.module.css';

export type InfoBoxProps = {
  text: string;
};

const InfoBox: React.FunctionComponent<InfoBoxProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.icon}><InfoCircleSvg /></div>
      <span className={s.text}>{props.text}</span>
    </div>
  );
};

export default InfoBox;
