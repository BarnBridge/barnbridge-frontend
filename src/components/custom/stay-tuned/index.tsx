import React from 'react';

import { ReactComponent as RocketSvg } from 'resources/svg/rocket.svg';

import s from './styles.module.css';

export type StayTunedProps = {};

const StayTuned: React.FunctionComponent<StayTunedProps> = props => {
  return (
    <div className={s.component}>
      <RocketSvg className={s.image} />
      <div className={s.label}>Stay tuned!</div>
      <div className={s.text}>We are launching soon</div>
    </div>
  );
};

export default StayTuned;
