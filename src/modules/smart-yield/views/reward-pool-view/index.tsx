import React from 'react';

import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';

const RewardPoolView: React.FC = () => {
  const { transactions } = useRewardPool();

  console.log(transactions);

  return <></>;
};

export default RewardPoolView;
