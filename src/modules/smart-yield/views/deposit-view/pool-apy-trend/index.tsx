import React from 'react';
import { Spin } from 'antd';
import format from 'date-fns/format';
import * as ReCharts from 'recharts';
import { formatBigValue } from 'web3/utils';

import Card from 'components/antd/card';
import StatusDot from 'components/custom/status-dot';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { APISYPoolAPY, fetchSYPoolAPY } from 'modules/smart-yield/api';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

type ChartEntity = APISYPoolAPY;

type State = {
  loading: boolean;
  data: ChartEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const PoolAPYTrend: React.FC = () => {
  const poolCtx = useSYPool();

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    const { pool } = poolCtx;

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
        const poolAPYs = await fetchSYPoolAPY(pool.smartYieldAddress);

        setState(
          mergeState<State>({
            loading: false,
            data: poolAPYs.map(apy => ({
              ...apy,
              seniorApy: apy.seniorApy * 100,
              juniorApy: apy.juniorApy * 100,
              point: new Date(apy.point),
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
  }, [poolCtx.pool]);

  return (
    <Card
      title={
        <div className="grid flow-col align-center justify-space-between">
          <Text type="p1" weight="semibold" color="primary">
            APY trend
          </Text>
          <div className="grid flow-col col-gap-32">
            <Text type="small" weight="semibold" color="secondary">
              <StatusDot color="green" className="mr-8" />
              Senior
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              <StatusDot color="purple" className="mr-8" />
              Junior
            </Text>
          </div>
        </div>
      }>
      <Spin spinning={state.loading}>
        <ReCharts.ResponsiveContainer width="100%" height={225}>
          <ReCharts.AreaChart data={state.data}>
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
            <ReCharts.YAxis axisLine={false} tickLine={false} />
            <ReCharts.Tooltip
              separator=""
              labelFormatter={value => (
                <Text type="p2" tag="span" weight="semibold" color="primary">
                  {value instanceof Date ? format(value, 'MM.dd.yyyy HH:mm') : ''}
                </Text>
              )}
              formatter={(value: number, _: any, { dataKey }: any) => (
                <Text type="p2" tag="span" weight="semibold" color={dataKey === 'seniorApy' ? 'green' : 'purple'}>
                  {formatBigValue(value)}%
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
    </Card>
  );
};

export default PoolAPYTrend;
