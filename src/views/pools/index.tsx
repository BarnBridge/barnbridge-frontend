import React from 'react';

import { LP_TOKEN_KEY, STABLE_TOKEN_KEY } from 'web3/contracts';

import ConnectedWallet from 'components/connected-wallet';
import PoolRewards from 'components/pool-rewards';
import PoolStats from 'components/pool-stats';
import PoolStak from 'components/pool-stak';
import PoolOverview from 'components/pool-overview';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent<{}> = props => {
  const [activeStaking, setActiveStaking] = React.useState<string | undefined>();

  function handleStakBack() {
    setActiveStaking(undefined);
  }

  return (
    <div className={s.view}>
      <ConnectedWallet />
      <PoolRewards />
      <PoolStats />
      {!activeStaking && (
        <PoolOverview onPoolStackSelect={setActiveStaking} />
      )}
      {activeStaking === STABLE_TOKEN_KEY && (
        <PoolStak stableToken onBack={handleStakBack} />
      )}
      {activeStaking === LP_TOKEN_KEY && (
        <PoolStak lpToken onBack={handleStakBack} />
      )}
    </div>
  );
};

export default PoolsView;
