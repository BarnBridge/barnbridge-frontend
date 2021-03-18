import React from 'react';

import { useRewardPools } from '../../providers/reward-pools-provider';

const RewardPoolsView: React.FC = () => {
  const { pools } = useRewardPools();

  console.log(pools);

  return <></>;
};

export default RewardPoolsView;
