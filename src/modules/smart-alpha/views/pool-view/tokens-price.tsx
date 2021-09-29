import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import { Chart } from 'components/chart';
import { PeriodChartTabs, PeriodTabsKey } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useFetchTokenPrice } from 'modules/smart-alpha/api';

import { formatTick } from 'utils/chart';

export const TokensPrice: React.FC<{ poolAddress: string; tokenSymbol: string; className?: string }> = ({
  poolAddress,
  tokenSymbol,
  className,
}) => {
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);
  const { data = [], loading } = useFetchTokenPrice(poolAddress, periodFilter);

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="p1" weight="semibold">
          Tokens price
        </Text>
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </div>
      <div className="p-24">
        <Chart
          loading={loading}
          data={data ?? []}
          x={{
            key: 'point',
            format: item => formatTick(item, periodFilter),
            itemFormat: item => format(new Date(item), 'MM.dd.yyyy HH:mm'),
          }}
          y={{
            format: value => `${Intl.NumberFormat('en', { notation: 'compact' }).format(value)} ${tokenSymbol}`,
            itemsFormat: value => `${Intl.NumberFormat('en').format(value)} ${tokenSymbol}`,
            items: [
              {
                key: 'seniorTokenPrice',
                title: 'Senior token price',
                color: 'green',
              },
              {
                key: 'juniorTokenPrice',
                title: 'Junior token price',
                color: 'purple',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
