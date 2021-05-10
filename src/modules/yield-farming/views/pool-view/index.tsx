import React, { FC, useEffect, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import Spin from 'components/antd/spin';
import { Tabs } from 'components/custom/tabs';

import PoolHeader from '../../components/pool-header';
import PoolStake from '../../components/pool-stake';
import PoolStatistics from '../../components/pool-statistics';
import PoolTransactions from '../../components/pool-transactions';
import PoolUnstake from '../../components/pool-unstake';
import YFPoolProvider, { useYFPool } from '../../providers/pool-provider';
import { YFPoolID } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolViewInner: FC = () => {
  const yfPoolCtx = useYFPool();

  const { poolMeta } = yfPoolCtx;

  const [activeTab, setActiveTab] = useState('stake');

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (poolMeta?.contract.isPoolEnded === true) {
      setActiveTab('unstake');
    }
  }, [poolMeta?.contract.isPoolEnded]);

  if (!poolMeta) {
    return <Redirect to="/yield-farming" />;
  }

  const isInitialized = poolMeta.contract.isPoolEnded !== undefined;

  return (
    <div className="content-container-fix content-container">
      <div className="container-limit">
        <PoolHeader />

        <div className="flexbox-grid mb-32">
          <div className={cn('card', s.stakeCard)}>
            <div className={cn('card-header pv-0', s.stakeCardHeader)}>
              {isInitialized && (
                <Tabs
                  tabs={[
                    ...(poolMeta.contract.isPoolEnded === false
                      ? [
                          {
                            id: 'stake',
                            children: 'Stake',
                          },
                        ]
                      : []),
                    {
                      id: 'unstake',
                      children: 'Unstake',
                    },
                  ]}
                  size="small"
                  activeKey={activeTab}
                  onClick={setActiveTab}
                />
              )}
            </div>
            <Spin spinning={!isInitialized}>
              <div className="p-24">
                {activeTab === 'stake' && <PoolStake />}
                {activeTab === 'unstake' && <PoolUnstake />}
              </div>
            </Spin>
          </div>
          <PoolStatistics />
        </div>
        <PoolTransactions />
      </div>
    </div>
  );
};

type RouteParams = {
  poolId: YFPoolID;
};

const PoolView: FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { poolId } = match.params;

  return (
    <YFPoolProvider poolId={poolId}>
      <PoolViewInner />
    </YFPoolProvider>
  );
};

export default PoolView;
