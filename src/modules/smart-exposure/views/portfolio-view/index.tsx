import { useState } from 'react';
import cn from 'classnames';

import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';

import { PortfolioChart } from './portfolio-chart';
import { PortfolioTable } from './portfolio-table';

type PairType = {
  id: string;
  name: string;
  icon1: string;
  icon2?: string;
  active: boolean;
};

export const Pairs = new Map<string, PairType>([
  [
    'ALL',
    {
      id: 'ALL',
      name: 'All pairs',
      icon1: 'token-all',
      active: true,
    },
  ],
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
      active: true,
    },
  ],
  [
    'ETH/USDC',
    {
      id: 'ETH/USDC',
      name: 'ETH/USDC',
      icon1: 'token-eth',
      icon2: 'token-usdc',
      active: true,
    },
  ],
]);

const initialState: PairType = Array.from(Pairs.values())[0];

const PortfolioView: React.FC = () => {
  const [activePair, setActivePair] = useState<PairType>(initialState);

  return (
    <>
      <div className="tab-cards mb-40">
        {Array.from(Pairs.values()).map(pair => (
          <button
            key={pair.name}
            type="button"
            className={cn('tab-card', activePair === pair && 'active')}
            disabled={!pair.active}
            style={{ color: !pair.active ? 'red' : '' }}
            onClick={() => setActivePair(pair)}>
            {pair.icon2 ? (
              <IconsPair icon1={pair.icon1 as IconNames} icon2={pair.icon2 as IconNames} size={40} className="mr-16" />
            ) : (
              <Icon name={pair.icon1 as IconNames} width={40} height={40} className="mr-16" />
            )}
            <div>
              <Text type="p1" weight="semibold" color="primary">
                {pair.name}
              </Text>
            </div>
          </button>
        ))}
      </div>
      <PortfolioChart className="mb-32" />
      <PortfolioTable />
    </>
  );
};

export default PortfolioView;
