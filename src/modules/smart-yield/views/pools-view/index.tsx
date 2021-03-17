import React from 'react';

import RewardPoolsProvider, { useRewardPools } from '../../providers/reward-pools-provider';

const PoolsViewInner: React.FC = () => {
  const { pools } = useRewardPools();

  console.log(pools);

  return <></>;
};

const PoolsView: React.FC = () => {
  return (
    <RewardPoolsProvider>
      <PoolsViewInner />
    </RewardPoolsProvider>
  );
};

export default PoolsView;
