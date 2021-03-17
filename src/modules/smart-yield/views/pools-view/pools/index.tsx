import { useState } from 'react';
import cn from 'classnames';

import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { PoolsCard } from 'modules/smart-yield/components/pool-card';

import Filters from './Filters';

type State = {
  activeMarket?: SYMarketMeta;
};

const InitialState: State = {
  activeMarket: Array.from(Markets.values())[0],
};

const pool1 = {
  apy: '69.420',
  daily: '200.00',
  current: '15000.00',
  balance: '2000000',
};

const my1 = {
  apy: '69.420',
  daily: '0.0012',
  current: '15000.00',
  balance: '2000000',
};

const Pools: React.FC = () => {
  const [state, setState] = useState<State>(InitialState);

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
            $ 1,643,900,581.86
          </Text>
        </div>
        <Filters onChange={console.log} />
      </div>
      <div className="flex row-gap-32 col-gap-32">
        <PoolsCard pool={pool1} my={my1} />
        <PoolsCard pool={pool1} my={my1} ended />
      </div>
    </>
  );
};

export default Pools;
