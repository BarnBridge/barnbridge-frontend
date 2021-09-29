import { useMemo, useState } from 'react';
import { format } from 'date-fns';

import { Chart } from 'components/chart';
import { PortfolioPeriodChartTabs, PortfolioPeriodTabsKey } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useFetchPortfolioValue } from 'modules/smart-alpha/api';

import { formatTick } from 'utils/chart';

export const PortfolioValue: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState<PortfolioPeriodTabsKey>(PortfolioPeriodTabsKey.week);
  const { data, loading } = useFetchPortfolioValue(periodFilter);

  const transformedData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map(({ juniorValue, seniorValue, entryQueueValue, exitQueueValue, ...rest }) => ({
        ...rest,
        value: juniorValue + seniorValue + entryQueueValue + exitQueueValue,
      }));
    }

    return [];
  }, [data]);

  return (
    <section className="card">
      <header className="card-header flex align-center pv-16">
        <Text type="p1" weight="semibold">
          Portfolio value
        </Text>
        <PortfolioPeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </header>
      <div className="p-24">
        <Chart
          loading={loading}
          data={transformedData}
          x={{
            key: 'point',
            format: item => formatTick(item, periodFilter),
            itemFormat: item => format(new Date(item), 'MM.dd.yyyy HH:mm'),
          }}
          y={{
            format: value =>
              Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value),
            itemsFormat: value => Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value),
            items: [
              {
                key: 'value',
                title: 'Portfolio value',
                color: 'red',
              },
            ],
          }}
        />
      </div>
    </section>
  );
};
