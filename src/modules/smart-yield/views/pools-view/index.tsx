import React, { useState } from 'react';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { PoolsCard } from 'modules/smart-yield/components/pool-card';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';

type State = {
  activeMarket?: SYMarketMeta;
};

const InitialState: State = {
  activeMarket: Array.from(Markets.values())[0],
};

const PoolsView: React.FC = () => {
  const [state, setState] = useState<State>(InitialState);
  const { loading, rewardPools, totalValueLocked } = useRewardPools();

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values()).map(market => (
          <button
            key={market.name}
            type="button"
            className={cn('tab-card', state.activeMarket === market && 'active')}
            disabled={!market.active}
            style={{ color: !market.active ? 'red' : '' }}
            onClick={() => {
              setState(
                mergeState<State>({
                  activeMarket: market,
                }),
              );
            }}>
            <Icon name={market.icon as IconNames} width={40} height={40} className="mr-16" color="inherit" />
            <div>
              <Text type="p1" weight="semibold" color="primary">
                {market.name}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {market.active ? 'Markets' : 'Coming soon'}
              </Text>
            </div>
          </button>
        ))}
      </div>
      <div className="flex mb-32">
        <div>
          <Text type="p1" weight="semibold" color="secondary">
            Total value locked
          </Text>
          <Text type="h2" weight="bold" color="primary">
            {formatUSD(totalValueLocked)}
          </Text>
        </div>
      </div>
      <div className="flex row-gap-32 col-gap-32">
        <AntdSpin spinning={loading}>
          {rewardPools.map(rewardPool => (
            <PoolsCard key={rewardPool.poolAddress} rewardPool={rewardPool} />
          ))}
        </AntdSpin>
      </div>
    </>
  );
};

export default PoolsView;
