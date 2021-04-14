import React from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import format from 'date-fns/format';
import * as ReCharts from 'recharts';
import { formatPercent, formatUSD } from 'web3/utils';

import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { APISYPoolLiquidity, fetchSYPoolLiquidity } from 'modules/smart-yield/api';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import s from './s.module.scss';

type ChartEntity = APISYPoolLiquidity;

const tabs = [
  {
    children: '24h',
    id: '24h',
  },
  {
    children: '1w',
    id: '1w',
  },
  {
    children: '1mo',
    id: '30d',
  },
];

type Props = {
  className?: string;
};

type State = {
  loading: boolean;
  data: ChartEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const Liquidity: React.FC<Props> = ({ className }) => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

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
        const poolLiquidity = await fetchSYPoolLiquidity(pool.smartYieldAddress, activeTab);

        setState(
          mergeState<State>({
            loading: false,
            data: poolLiquidity.map(liquidity => ({
              ...liquidity,
              point: new Date(liquidity.point),
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

  if (!pool) {
    return null;
  }

  return (
    <section className={cn('card', className)}>
      <header className={cn('card-header flex align-center', s.header)}>
        <div className="text-p1 fw-semibold color-primary">Liquidity</div>
        <Tabs
          tabs={tabs}
          active={activeTab}
          onClick={setActiveTab}
          className="ml-auto"
          variation="elastic"
          size="small"
        />
      </header>
      <div className="p-24">
        <Spin spinning={state.loading}>
          <ReCharts.ResponsiveContainer width="100%" height={225} className="mb-24">
            <ReCharts.AreaChart data={state.data} margin={{ left: 25 }}>
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
              <ReCharts.XAxis dataKey="point" hide />
              <ReCharts.YAxis axisLine={false} tickLine={false} tickFormatter={value => formatUSD(value, true) ?? ''} />
              <ReCharts.Tooltip
                separator=""
                labelFormatter={value => (
                  <Text type="p2" tag="span" weight="semibold" color="primary">
                    {value instanceof Date ? format(value, 'MM.dd.yyyy HH:mm') : ''}
                  </Text>
                )}
                formatter={(value: number, _: any, { dataKey }: any) => (
                  <Text
                    type="p2"
                    tag="span"
                    weight="semibold"
                    color={dataKey === 'seniorLiquidity' ? 'green' : 'purple'}>
                    {formatUSD(value)}
                  </Text>
                )}
              />
              <ReCharts.Area
                name="Senior APY "
                dataKey="seniorLiquidity"
                type="monotone"
                fill="url(#chart-green-gradient)"
                stroke="var(--theme-green-color)"
                strokeWidth={2}
              />
              <ReCharts.Area
                name="Junior APY "
                dataKey="juniorLiquidity"
                type="monotone"
                fill="url(#chart-purple-gradient)"
                stroke="var(--theme-purple-color)"
                strokeWidth={2}
              />
            </ReCharts.AreaChart>
          </ReCharts.ResponsiveContainer>
        </Spin>
        <div className="flex flow-col justify-center col-gap-24 row-gap-16">
          <div
            className="chart-label text-sm fw-semibold"
            style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}>
            Senior Liquidity
          </div>
          <div
            className="chart-label text-sm fw-semibold"
            style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}>
            Junior Liquidity
          </div>
        </div>
      </div>
    </section>
  );
};

export default Liquidity;
