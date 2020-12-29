import React from 'react';

import StayTuned from 'components/custom/stay-tuned';

import s from './styles.module.css';

const HomeView: React.FunctionComponent = () => {
  return (
    <div className={s.container}>
      <StayTuned />
    </div>
  );
};

export default HomeView;
