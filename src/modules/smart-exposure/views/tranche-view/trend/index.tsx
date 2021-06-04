import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import * as ReCharts from 'recharts';
import { formatPercent, formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import { PeriodChartTabs, PeriodTabsKey, Tabs } from 'components/custom/tabs';
import config from 'config';
import { fetchEtokenPrice } from 'modules/smart-exposure/api';

import s from './s.module.scss';

// import { APISYPoolAPY } from 'modules/smart-yield/api';

// type ChartEntity = Omit<APISYPoolAPY, 'point'> & {
//   point: number;
// };

type ETokenPriceType = {
  eTokenPrice: string;
  point: string;
};

type PropsType = {
  poolAddress: string;
  trancheAddress: string;
};

export const PriceTrend: React.FC<PropsType> = ({ poolAddress, trancheAddress }) => {
  const [activeTab, setActiveTab] = useState<PeriodTabsKey>(PeriodTabsKey.day);
  const [priceList, setPriceList] = useState<ETokenPriceType[]>([]);

  useEffect(() => {
    fetchEtokenPrice(poolAddress, trancheAddress, activeTab).then(setPriceList);
  }, [poolAddress, trancheAddress, activeTab]);

  const ticks = React.useMemo(() => {
    const dates = priceList.map(d => new Date(d.point).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);

    if (!Number.isFinite(minDate) || !Number.isFinite(maxDate)) {
      return [];
    }

    let count = 0;
    let range = 0;

    switch (activeTab) {
      case '24h':
        count = 3;
        range = 8 * 60 * 60 * 1_000; // 8 hours
        break;
      case '1w':
        count = 7;
        range = 24 * 60 * 60 * 1_000; // 24 hours
        break;
      case '30d':
        count = 4;
        range = 7 * 24 * 60 * 60 * 1_000; // 7 days
        break;
      default:
        return [];
    }

    const minDt = maxDate - count * range;

    return Array.from({ length: count + 1 }).map((_, index) => minDt + range * index);
  }, [priceList, activeTab]);

  // function formatTick(value: string) {
  //   switch (activeTab) {
  //     case '24h':
  //       return format(new Date(value), 'HH:mm');
  //     case '1w':
  //       return format(new Date(value), 'EEE');
  //     case '30d':
  //       return format(new Date(value), 'dd MMM');
  //     default:
  //       return '';
  //   }
  // }

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <div className="text-p1 fw-semibold color-primary mr-8">Etoken price trend</div>
        <PeriodChartTabs activeKey={activeTab} onClick={setActiveTab} size="small" className="ml-auto" />
      </header>
      <div className="p-24">
        <Spin spinning={!priceList.length}>
          <ReCharts.ResponsiveContainer width="100%" height={300} className="mb-24">
            <ReCharts.AreaChart data={priceList}>
              <defs>
                <linearGradient id="chart-red-gradient" gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor="rgba(var(--theme-red-color-rgb), 0.08)" />
                  <stop offset="100%" stopColor="rgba(var(--theme-red-color-rgb), 0)" />
                </linearGradient>
              </defs>
              <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
              <ReCharts.XAxis
                // dataKey="point"
                // axisLine={false}
                // tickLine={false}
                // tickFormatter={value => formatTick(value)}

                dataKey="point"
                ticks={ticks}
                tickMargin={12}
                minTickGap={0}
                // tickFormatter={value => formatTick(value)}
              />
              <ReCharts.YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={value =>
                  Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value)
                }
              />
              <ReCharts.Tooltip
                separator=""
                labelFormatter={value => (
                  <span className="text-p2 fw-semibold color-primary">
                    {value ? format(new Date(value), 'MM.dd.yyyy HH:mm') : ''}
                  </span>
                )}
                formatter={(value: number, _: any, { dataKey }: any) => (
                  <span className="text-p2 fw-semibold color-red">{formatUSD(value)}</span>
                )}
              />
              <ReCharts.Area
                name="Value "
                dataKey="eTokenPrice"
                type="monotone"
                fill="url(#chart-red-gradient)"
                stroke="var(--theme-red-color)"
                strokeWidth={2}
              />
            </ReCharts.AreaChart>
          </ReCharts.ResponsiveContainer>
        </Spin>
      </div>
    </section>
  );
};
