import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import { Chart } from 'components/chart';
import { PeriodChartTabs, PeriodTabsKey, Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useFetchPoolPerformance } from 'modules/smart-alpha/api';

import { formatTick } from 'utils/chart';

export enum TrancheFilterTypeKey {
  senior = 'senior',
  junior = 'junior',
}

const trancheTabs = [
  {
    id: TrancheFilterTypeKey.senior,
    children: 'Senior',
  },
  {
    id: TrancheFilterTypeKey.junior,
    children: 'Junior',
  },
];

export const PoolPerformance: React.FC<{ poolAddress: string; className?: string }> = ({ poolAddress, className }) => {
  const [trancheFilter, setTrancheFilter] = useState<TrancheFilterTypeKey>(TrancheFilterTypeKey.senior);
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);
  const { data = [], loading } = useFetchPoolPerformance(poolAddress, periodFilter);

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="p1" weight="semibold">
          Pool performance
        </Text>
        <Tabs<TrancheFilterTypeKey>
          tabs={trancheTabs}
          activeKey={trancheFilter}
          onClick={setTrancheFilter}
          variation="elastic"
          size="small"
          className="ml-auto mr-16"
        />
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" />
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
            format: value =>
              Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value),
            itemsFormat: value => Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value),
            items:
              trancheFilter === TrancheFilterTypeKey.senior
                ? [
                    {
                      key: 'seniorWithSA',
                      title: 'Senior value',
                      color: 'green',
                    },
                    {
                      key: 'seniorWithoutSA',
                      title: 'Senior value (without SMART Alpha)',
                      color: 'yellow',
                    },
                    {
                      key: 'underlyingPrice',
                      title: 'Price (Right axis)',
                      color: 'grey',
                      yAxisId: 'right',
                    },
                  ]
                : [
                    {
                      key: 'juniorWithSA',
                      title: 'Junior value',
                      color: 'purple',
                    },
                    {
                      key: 'juniorWithoutSA',
                      title: 'Junior value (without SMART Alpha)',
                      color: 'yellow',
                    },
                    {
                      key: 'underlyingPrice',
                      title: 'Price (Right axis)',
                      color: 'grey',
                      yAxisId: 'right',
                    },
                  ],
          }}
        />
      </div>
    </div>
  );
};
