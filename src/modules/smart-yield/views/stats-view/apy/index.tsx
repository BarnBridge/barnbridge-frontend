import React from 'react';
import { Spin } from 'antd';
import cn from 'classnames';
import format from 'date-fns/format';
import * as ReCharts from 'recharts';
import { formatPercent } from 'web3/utils';

import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { APISYPoolAPY, useSyAPI } from 'modules/smart-yield/api';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import s from './s.module.scss';

type ChartEntity = Omit<APISYPoolAPY, 'point'> & {
  point: number;
};

const tabs = [
  {
    id: '24h',
    children: '24h',
  },
  {
    id: '1w',
    children: '1w',
  },
  {
    id: '30d',
    children: '1mo',
  },
];

type State = {
  loading: boolean;
  data: ChartEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const ApyTrend: React.FC = () => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;
  const syAPI = useSyAPI();

  const [activeTab, setActiveTab] = React.useState('24h');
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    if (!pool) {
      setState(
        mergeState<State>({
          data: [],
        }),
      );
      return;
    }

    (async () => {
      setState(
        mergeState<State>({
          loading: true,
        }),
      );

      try {
        const poolAPYs = await syAPI.fetchSYPoolAPY(pool.smartYieldAddress, activeTab);

        setState(
          mergeState<State>({
            loading: false,
            data: poolAPYs.map(apy => ({
              ...apy,
              point: new Date(apy.point).valueOf(),
            })),
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            data: [],
          }),
        );
      }
    })();
  }, [pool, activeTab]);

  const ticks = React.useMemo(() => {
    const dates = state.data.map(d => d.point);
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
  }, [state.data, activeTab]);

  function formatTick(value: number) {
    if (!Number.isInteger(value)) {
      return '';
    }

    switch (activeTab) {
      case '24h':
        return format(new Date(value), 'HH:mm');
      case '1w':
        return format(new Date(value), 'EEE');
      case '30d':
        return format(new Date(value), 'dd MMM');
      default:
        return '';
    }
  }

  if (!pool) {
    return null;
  }

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <div className="text-p1 fw-semibold color-primary">APY trend</div>
        <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          className="ml-auto"
          variation="elastic"
          size="small"
        />
      </header>
      <div className="p-24">
        <Spin spinning={state.loading}>
          <ReCharts.ResponsiveContainer width="100%" height={300} className="mb-24">
            <ReCharts.AreaChart data={state.data} margin={{ left: -12 }}>
              <defs>
                <linearGradient id="chart-green-gradient" gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor="rgba(var(--theme-green-color-rgb), 0.08)" />
                  <stop offset="100%" stopColor="rgba(var(--theme-green-color-rgb), 0)" />
                </linearGradient>
                <linearGradient id="chart-purple-gradient" gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor="rgba(var(--theme-purple-color-rgb), 0.08)" />
                  <stop offset="100%" stopColor="rgba(var(--theme-purple-color-rgb), 0)" />
                </linearGradient>
              </defs>
              <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
              <ReCharts.XAxis
                dataKey="point"
                ticks={ticks}
                tickMargin={12}
                minTickGap={0}
                tickFormatter={value => formatTick(value)}
              />
              <ReCharts.YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={value => formatPercent(value, 0) ?? ''}
              />
              <ReCharts.Tooltip
                separator=""
                labelFormatter={value => (
                  <Text type="p2" tag="span" weight="semibold" color="primary">
                    {Number.isFinite(value) ? format(new Date(value), 'MM.dd.yyyy HH:mm') : ''}
                  </Text>
                )}
                formatter={(value: number, _: any, { dataKey }: any) => (
                  <Text type="p2" tag="span" weight="semibold" color={dataKey === 'seniorApy' ? 'green' : 'purple'}>
                    {formatPercent(value)}
                  </Text>
                )}
              />
              <ReCharts.Area
                name="Senior APY "
                dataKey="seniorApy"
                type="monotone"
                fill="url(#chart-green-gradient)"
                stroke="var(--theme-green-color)"
                strokeWidth={2}
              />
              <ReCharts.Area
                name="Junior APY "
                dataKey="juniorApy"
                type="monotone"
                fill="url(#chart-purple-gradient)"
                stroke="var(--theme-purple-color)"
                strokeWidth={2}
              />
            </ReCharts.AreaChart>
          </ReCharts.ResponsiveContainer>
        </Spin>
        <div className="flex flow-col justify-center col-gap-24 row-gap-16">
          <div className="chart-label" style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}>
            Senior APY
          </div>
          <div className="chart-label" style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}>
            Junior APY
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApyTrend;
