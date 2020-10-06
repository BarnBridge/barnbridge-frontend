import React from 'react';
import * as Antd from 'antd';

import StayTunedImg from 'resources/img/stay-tuned.png';

import s from './styles.module.css';

export type StayTunedProps = {};

const StayTuned: React.FunctionComponent<StayTunedProps> = props => {
  return (
    <div className={s.component}>
      <Antd.Image src={StayTunedImg} className={s.image} />
      <div className={s.label}>Stay tuned!</div>
      <div className={s.text}>We are launching soon</div>
    </div>
  );
};

export default StayTuned;
