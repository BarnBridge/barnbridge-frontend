import React, { FC, useEffect, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import Spin from 'components/antd/spin';
import { Tabs } from 'components/custom/tabs';
import YFPoolProvider, { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import PoolHeader from 'modules/yield-farming/views/pool-header';
import PoolTransactions from 'modules/yield-farming/views/pool-transactions';

import PoolStake from '../pool-stake';
import PoolStatistics from '../pool-statistics';

import { PoolTypes } from 'modules/yield-farming/utils';

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
              <div className="p-24">{isInitialized && <PoolStake type={activeTab as 'stake' | 'unstake'} />}</div>
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
  poolId: PoolTypes;
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
