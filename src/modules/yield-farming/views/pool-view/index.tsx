import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import Tabs from 'components/antd/tabs';
import YFPoolProvider, { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import PoolHeader from 'modules/yield-farming/views/pool-header';
import PoolTransactions from 'modules/yield-farming/views/pool-transactions';

import PoolStake from '../pool-stake';
import PoolStatistics from '../pool-statistics';

import { PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolViewInner: React.FC = () => {
  const yfPoolCtx = useYFPool();

  const { poolMeta } = yfPoolCtx;

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!poolMeta) {
    return <Redirect to="/yield-farming" />;
  }

  return (
    <div className="content-container-fix content-container">
      <div className="container-limit">
        <PoolHeader />

        <div className="flexbox-grid mb-32">
          <div className={cn('card', s.stakeCard)}>
            <Tabs defaultActiveKey="stake">
              {poolMeta.contract.isPoolEnded === false && (
                <Tabs.Tab key="stake" tab="Stake" className="p-24">
                  <PoolStake type="stake" />
                </Tabs.Tab>
              )}
              <Tabs.Tab key="unstake" tab="Unstake" className="p-24">
                <PoolStake type="unstake" />
              </Tabs.Tab>
            </Tabs>
          </div>
          <PoolStatistics />
        </div>
        <PoolTransactions />
      </div>
    </div>
  );
};

type RouteParams = {
  poolName: PoolTypes;
};

const PoolView: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { poolName } = match.params;

  return (
    <YFPoolProvider poolName={poolName}>
      <PoolViewInner />
    </YFPoolProvider>
  );
};

export default PoolView;
