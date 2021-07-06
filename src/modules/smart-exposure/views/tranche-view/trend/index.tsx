import React, { useEffect, useState } from 'react';
import AntdNotification from 'antd/lib/notification';
import { format } from 'date-fns';
import * as ReCharts from 'recharts';
import { formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import { PeriodChartTabs, PeriodTabsKey } from 'components/custom/tabs';
import { ETokenPriceType, useSeAPI } from 'modules/smart-exposure/api';

import { formatTick } from 'utils/chart';

type PropsType = {
  poolAddress: string;
  trancheAddress: string;
};

export const PriceTrend: React.FC<PropsType> = ({ poolAddress, trancheAddress }) => {
  const [activeTab, setActiveTab] = useState<PeriodTabsKey>(PeriodTabsKey.day);
  const [priceList, setDataList] = useState<ETokenPriceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const seAPI = useSeAPI();

  useEffect(() => {
    setLoading(true);
    seAPI
      .fetchETokenPrice(trancheAddress, activeTab)
      .then(setDataList)
      .catch(err => {
        setDataList([]);
        console.error(err);
        AntdNotification.error({
          message: err.data,
        });
      })
      .finally(() => setLoading(false));
  }, [trancheAddress, activeTab]);

  return (
    <section className="card">
      <header className="card-header flex align-center" style={{ padding: '16px 16px 16px 24px' }}>
        <div className="text-p1 fw-semibold color-primary mr-8">eToken price trend</div>
        <PeriodChartTabs activeKey={activeTab} onClick={setActiveTab} size="small" className="ml-auto" />
      </header>
      <div className="p-24">
        <Spin spinning={loading}>
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
                dataKey="point"
                axisLine={false}
                tickLine={false}
                tickFormatter={value => formatTick(value, activeTab)}
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
