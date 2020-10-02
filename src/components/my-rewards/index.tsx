import React from 'react';

import { ReactComponent as Logo } from 'resources/svg/logo.svg';

import s from './styles.module.css';

export type MyRewardsProps = {
  currentReward: string;
  bondBalance: string;
  potentialReward: string;
};

const MyRewards: React.FunctionComponent<MyRewardsProps> = props => {
  const { currentReward, bondBalance, potentialReward } = props;

  return (
    <div className={s.component}>
      <div className={s.label}>MY REWARDS</div>
      <div className={s.row}>
        <div className={s.col}>
          <div className={s.rewardLabel}>Current reward</div>
          <div className={s.rewardValue}>
            <span>{currentReward}</span>
            <Logo />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.rewardLabel}>BOND balance</div>
          <div className={s.rewardValue}>
            <span>{bondBalance}</span>
            <Logo />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.rewardLabel}>Potential reward this epoch</div>
          <div className={s.rewardValue}>
            <span>{potentialReward}</span>
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRewards;
