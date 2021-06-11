import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AntdNotification from 'antd/lib/notification';
import classNames from 'classnames';
import { format } from 'date-fns';
import * as ReCharts from 'recharts';
import { formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import { PeriodChartTabs, PeriodTabsKey, Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import {
  RatioDeviationApiType,
  TrancheApiType,
  TrancheLiquidityApiType,
  fetchRatioDeviation,
  fetchTrancheLiquidity,
} from 'modules/smart-exposure/api';

import { formatTick, generateTicks } from 'utils/chart';

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

type PropsType = {
  tranche: TrancheApiType;
  className?: string;
};

export const Charts: React.FC<PropsType> = ({ tranche, className }) => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [activeTab, setActiveTab] = useState<TabsKey>(TabsKey.ratio);
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);

  return (
    <section className={classNames('card', className)}>
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
          <TrancheLiquidity
            tranche={tranche}
            poolAddress={poolAddress}
            trancheAddress={trancheAddress}
            periodFilter={periodFilter}
          />
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchRatioDeviation(poolAddress, trancheAddress, periodFilter)
      .then(result => setDataList(result))
      .catch(err => {
        setDataList([]);
        console.error(err);
        AntdNotification.error({
          message: err.data,
        });
      })
      .finally(() => setLoading(false));
  }, [poolAddress, trancheAddress, periodFilter]);

  return (
    <Spin spinning={loading}>
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
            dataKey="point"
            axisLine={false}
            tickLine={false}
            tickFormatter={value => formatTick(value, periodFilter)}
            // dataKey="point"
            // // ticks={ticks}
            // tickMargin={12}
            // minTickGap={0}
            // // tickFormatter={value => formatTick(value)}
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

const TrancheLiquidity = ({
  tranche,
  poolAddress,
  trancheAddress,
  periodFilter,
}: {
  tranche: TrancheApiType;
  poolAddress: string;
  trancheAddress: string;
  periodFilter: PeriodTabsKey;
}) => {
  const [dataList, setDataList] = useState<TrancheLiquidityApiType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchTrancheLiquidity(poolAddress, trancheAddress, periodFilter)
      .then(result => setDataList(result))
      .catch(err => {
        setDataList([]);
        console.error(err);
        AntdNotification.error({
          message: err.data,
        });
      })
      .finally(() => setLoading(false));
  }, [poolAddress, trancheAddress, periodFilter]);

  const ticks = useMemo(() => {
    return generateTicks(dataList, periodFilter);
  }, [dataList, periodFilter]);

  return (
    <>
      <Spin spinning={loading}>
        <ReCharts.ResponsiveContainer width="100%" height={300} className="mb-24">
          <ReCharts.AreaChart data={dataList} margin={{ left: 25 }}>
            <defs>
              <linearGradient id="chart-yellow-gradient" gradientTransform="rotate(180)">
                <stop offset="0%" stopColor="rgba(var(--theme-yellow-color-rgb), 0.08)" />
                <stop offset="100%" stopColor="rgba(var(--theme-yellow-color-rgb), 0)" />
              </linearGradient>
              <linearGradient id="chart-blue-gradient" gradientTransform="rotate(180)">
                <stop offset="0%" stopColor="rgba(var(--theme-blue-color-rgb), 0.08)" />
                <stop offset="100%" stopColor="rgba(var(--theme-blue-color-rgb), 0)" />
              </linearGradient>
            </defs>
            <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
            <ReCharts.XAxis
              dataKey="point"
              ticks={ticks}
              tickMargin={12}
              minTickGap={0}
              tickFormatter={value => formatTick(value, periodFilter)}
              interval={0}
            />
            <ReCharts.YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={value =>
                formatUSD(value, {
                  compact: true,
                }) ?? ''
              }
            />
            <ReCharts.Tooltip
              separator=""
              labelFormatter={value => (
                <Text type="p2" tag="span" weight="semibold" color="primary">
                  {Number.isFinite(value) ? format(value, 'MM.dd.yyyy HH:mm') : ''}
                </Text>
              )}
              formatter={(value: number, _: any, { dataKey }: any) => (
                <Text type="p2" tag="span" weight="semibold" color={dataKey === 'tokenALiquidity' ? 'yellow' : 'blue'}>
                  {formatUSD(value)}
                </Text>
              )}
            />
            <ReCharts.Area
              name={`${tranche.tokenA.symbol} Liquidity `}
              dataKey="tokenALiquidity"
              type="monotone"
              fill="url(#chart-yellow-gradient)"
              stroke="var(--theme-yellow-color)"
              strokeWidth={2}
            />
            <ReCharts.Area
              name={`${tranche.tokenB.symbol} Liquidity `}
              dataKey="tokenBLiquidity"
              type="monotone"
              fill="url(#chart-blue-gradient)"
              stroke="var(--theme-blue-color)"
              strokeWidth={2}
            />
          </ReCharts.AreaChart>
        </ReCharts.ResponsiveContainer>
      </Spin>
      <div className="flex flow-col justify-center col-gap-24 row-gap-16">
        <div className="chart-label" style={{ '--dot-color': 'var(--theme-yellow-color)' } as React.CSSProperties}>
          {tranche.tokenA.symbol} Liquidity
        </div>
        <div className="chart-label" style={{ '--dot-color': 'var(--theme-blue-color)' } as React.CSSProperties}>
          {tranche.tokenB.symbol} Liquidity
        </div>
      </div>
    </>
  );
};
