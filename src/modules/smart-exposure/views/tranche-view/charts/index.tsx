import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ReCharts from 'recharts';

import Spin from 'components/antd/spin';
import { PeriodChartTabs, PeriodTabsKey, Tabs } from 'components/custom/tabs';
import { RatioDeviationApiType, fetchRatioDeviation } from 'modules/smart-exposure/api';

export enum TabsKey {
  ratio = 'ratio',
  tranche = 'tranche',
}

const tabs = [
  {
    id: TabsKey.ratio,
    children: 'Ratio deviation',
  },
  {
    id: TabsKey.tranche,
    children: 'Tranche liquidity',
  },
];

export const Charts = () => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [activeTab, setActiveTab] = useState<TabsKey>(TabsKey.ratio);
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);

  return (
    <section className="card">
      <header
        className="flex align-center"
        style={{
          borderBottom: '1px solid var(--theme-border-color)',
          padding: '0 16px 0 24px',
          overflowX: 'auto',
          // width: 100%;
        }}>
        <Tabs<TabsKey>
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          variation="normal"
          // className="mb-40"
          // style={{
          //   width: 248,
          //   height: 40,
          // }}
        />
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </header>
      <div className="p-24">
        {activeTab === TabsKey.ratio ? (
          <RatioDeviation poolAddress={poolAddress} trancheAddress={trancheAddress} periodFilter={periodFilter} />
        ) : (
          <TrancheLiquidity />
        )}
      </div>
    </section>
  );
};

const RatioDeviation = ({
  poolAddress,
  trancheAddress,
  periodFilter,
}: {
  poolAddress: string;
  trancheAddress: string;
  periodFilter: PeriodTabsKey;
}) => {
  const [dataList, setDataList] = useState<RatioDeviationApiType[]>([]);

  useEffect(() => {
    fetchRatioDeviation(poolAddress, trancheAddress, periodFilter)
      .then(result => setDataList(result))
      .catch(console.error);
  }, [poolAddress, trancheAddress, periodFilter]);

  return (
    <Spin spinning={!dataList.length}>
      <ReCharts.ResponsiveContainer width="100%" height={300} className="mb-24">
        <ReCharts.AreaChart data={dataList}>
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
            // ticks={ticks}
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
            labelFormatter={value => <span className="text-p2 fw-semibold color-primary">{value}</span>}
            formatter={(value: number, _: any, { dataKey }: any) => (
              <span className="text-p2 fw-semibold color-red">{value}</span>
            )}
          />
          <ReCharts.Area
            name="Value "
            dataKey="deviation"
            type="monotone"
            fill="url(#chart-red-gradient)"
            stroke="var(--theme-red-color)"
            strokeWidth={2}
          />
        </ReCharts.AreaChart>
      </ReCharts.ResponsiveContainer>
    </Spin>
  );
};

const TrancheLiquidity = () => {
  return <>Tranche liquidity</>;
};
