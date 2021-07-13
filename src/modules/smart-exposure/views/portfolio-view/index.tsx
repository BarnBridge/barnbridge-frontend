import { useEffect, useState } from 'react';
import cn from 'classnames';

import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { PoolApiType, useSeAPI } from 'modules/smart-exposure/api';

import { PortfolioTable } from './portfolio-table';
import { PortfolioValue } from './portfolio-value';

const PortfolioView: React.FC = () => {
  const [pools, setPools] = useState<PoolApiType[]>([]);
  const [activePool, setActivePool] = useState<PoolApiType | null>(null);
  const { getTokenBySymbol } = useKnownTokens();
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchPools().then(result => {
      setPools(result);
    });
  }, []);

  return (
    <>
      <div className="tab-cards mb-40">
        <button type="button" className={cn('tab-card', { active: !activePool })} onClick={() => setActivePool(null)}>
          <Icon name="token-all" width={40} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              All pairs
            </Text>
          </div>
        </button>
        {pools.map(pool => {
          const tokenA = getTokenBySymbol(pool.tokenA.symbol);
          const tokenB = getTokenBySymbol(pool.tokenB.symbol);

          return (
            <button
              key={pool.poolName}
              type="button"
              className={cn('tab-card', activePool === pool && 'active')}
              disabled={false}
              onClick={() => setActivePool(pool)}>
              <IconsPair
                icon1={tokenA?.icon as IconNames}
                icon2={tokenB?.icon as IconNames}
                size={40}
                className="mr-16"
              />
              <div>
                <Text type="p1" weight="semibold" color="primary">
                  {pool.poolName}
                </Text>
              </div>
            </button>
          );
        })}
      </div>
      <PortfolioValue poolAddress={activePool?.poolAddress} className="mb-32" />
      <PortfolioTable poolAddress={activePool?.poolAddress} />
    </>
  );
};

export default PortfolioView;
