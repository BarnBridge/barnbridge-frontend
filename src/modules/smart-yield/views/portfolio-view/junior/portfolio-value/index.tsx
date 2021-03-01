import React from 'react';
import { Spin } from 'antd';
import format from 'date-fns/format';
import * as ReCharts from 'recharts';
import { formatBigValue } from 'web3/utils';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { SYJuniorPortfolioValue, fetchSYJuniorPortfolioValues } from 'modules/smart-yield/api';
import { useWallet } from 'wallets/wallet';

type ChartEntity = SYJuniorPortfolioValue;

type State = {
  loading: boolean;
  data: ChartEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const PortfolioValue: React.FC = () => {
  const wallet = useWallet();

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(
        mergeState<State>({
          loading: true,
        }),
      );

      try {
        const portfolioValues = await fetchSYJuniorPortfolioValues(wallet.account);

        setState(
          mergeState<State>({
            loading: false,
            data: portfolioValues,
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
  }, [wallet.account]);

  return (
    <Card
      title={
        <Grid flow="col" colsTemplate="1fr max-content" align="center">
          <Text type="p1" weight="semibold" color="primary">
            Junior Portfolio value
          </Text>
          <Text type="small" weight="semibold">
            Last month
          </Text>
        </Grid>
      }>
      <Spin spinning={state.loading}>
        <ReCharts.ResponsiveContainer width="100%" height={225}>
          <ReCharts.AreaChart data={state.data}>
            <defs>
              <linearGradient id="chart-gradient" gradientTransform="rotate(180)">
                <stop offset="0%" stopColor="rgba(var(--theme-purple-color-rgb), 0.08)" />
                <stop offset="100%" stopColor="rgba(var(--theme-purple-color-rgb), 0)" />
              </linearGradient>
            </defs>
            <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
            <ReCharts.XAxis dataKey="timestamp" hide />
            <ReCharts.YAxis axisLine={false} tickLine={false} />
            <ReCharts.Tooltip
              separator=""
              labelFormatter={value => (
                <Text type="p2" tag="span" weight="semibold" color="primary">
                  {format(value, 'MM.dd.yyyy HH:mm')}
                </Text>
              )}
              formatter={(value: number) => (
                <Text type="p2" tag="span" weight="semibold" color="purple">
                  {formatBigValue(value, 18)}
                </Text>
              )}
            />
            <ReCharts.Area
              name="Junior Value "
              dataKey="juniorValue"
              type="monotone"
              fill="url(#chart-gradient)"
              stroke="var(--theme-purple-color)"
              strokeWidth={2}
            />
          </ReCharts.AreaChart>
        </ReCharts.ResponsiveContainer>
      </Spin>
    </Card>
  );
};

export default PortfolioValue;
