import { useState } from 'react';
import cn from 'classnames';

import { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';

import { PairsTable } from './table';

import s from './s.module.scss';

type PairType = {
  id: string;
  name: string;
  icon1: string;
  icon2: string;
  active: boolean;
};

export const Pairs = new Map<string, PairType>([
  [
    'WBTC/ETH',
    {
      id: 'WBTC/ETH',
      name: 'WBTC/ETH',
      icon1: 'token-wbtc',
      icon2: 'token-eth',
      active: true,
    },
  ],
  [
    'WBTC/USDC',
    {
      id: 'WBTC/USDC',
      name: 'WBTC/USDC',
      icon1: 'token-wbtc',
      icon2: 'token-usdc',
      active: false,
    },
  ],
  [
    'ETH/USDC',
    {
      id: 'ETH/USDC',
      name: 'ETH/USDC',
      icon1: 'token-eth',
      icon2: 'token-usdc',
      active: false,
    },
  ],
]);

type State = {
  activePair: PairType;
};

const InitialState: State = {
  activePair: Array.from(Pairs.values())[0],
};

const PairsView: React.FC = () => {
  const [state, setState] = useState<State>(InitialState);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Pairs.values()).map(pair => (
          <button
            key={pair.name}
            type="button"
            className={cn('tab-card', state.activePair === pair && 'active')}
            disabled={!pair.active}
            style={{ color: !pair.active ? 'red' : '' }}
            onClick={() => {
              setState(
                mergeState<State>({
                  activePair: pair,
                }),
              );
            }}>
            <IconsPair icon1={pair.icon1 as IconNames} icon2={pair.icon2 as IconNames} size={40} className="mr-16" />
            <div>
              <Text type="p1" weight="semibold" color="primary">
                {pair.name}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Pools
              </Text>
            </div>
          </button>
        ))}
      </div>
      <div className={cn(s.stats, 'mb-40')}>
        <div>
          <div className="text-p1 fw-semibold color-secondary">WBTC/ETH total liquidity</div>
          <div className="text-h2 fw-bold">$ 310,000,000.00</div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary">Rebalancing strategies</div>
          <div className="flex align-center text-p1 fw-semibold">
            Every day <span className="middle-dot ph-16 color-border" /> {'>'} 2% deviation from target
          </div>
        </div>
      </div>
      <div className="card">
        <PairsTable />
      </div>
    </>
  );
};

export default PairsView;
