import React from 'react';

import { ReactComponent as Logo } from 'resources/svg/logo.svg';

import s from './styles.module.css';
import { useWeb3Contracts } from 'context/Web3Contracts';

const MyRewards: React.FunctionComponent = props => {
  const web3c = useWeb3Contracts();

  return (
    <div className={s.component}>
      <div className={s.label}>MY REWARDS</div>
      <div className={s.row}>
        <div className={s.col}>
          <div className={s.rewardLabel}>Current reward</div>
          <div className={s.rewardValue}>
            <span>{web3c.yf?.currentReward?.plus(web3c.yflp?.currentReward || 0).toFormat(3) || '-'}</span>
            <Logo />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.rewardLabel}>BOND balance</div>
          <div className={s.rewardValue}>
            <span>{web3c.bond?.balance?.toFormat(3) || '-'}</span>
            <Logo />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.rewardLabel}>Potential reward this epoch</div>
          <div className={s.rewardValue}>
            <span>{web3c.aggregated.potentialReward?.toFormat(3) || '-'}</span>
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRewards;
