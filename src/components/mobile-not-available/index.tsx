import React from 'react';

import s from './styles.module.css';

const MobileNotAvailable: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <p>BarnBridge</p>
      <p>Yield Farming</p>
      <p>is currently not available</p>
      <p>on mobile and tablet</p>
    </div>
  );
};

export default MobileNotAvailable;
