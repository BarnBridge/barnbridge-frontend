import React from 'react';
import format from 'date-fns/format';
import * as ReCharts from 'recharts';
import { formatUSDValue } from 'web3/utils';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

type Props = {
  title: string;
  data: {
    timestamp: Date;
    value: number;
  }[];
  color: string;
  gradientColor: string;
};

const PortfolioValue: React.FC<Props> = props => {
  const { title, data, color, gradientColor } = props;

  return (
    <Card
      title={
        <Grid flow="col" colsTemplate="1fr max-content" align="center">
          <Text type="p1" weight="semibold" color="primary">
            {title}
          </Text>
          <Text type="small" weight="semibold">
            Last 7 days
          </Text>
        </Grid>
      }>
      <ReCharts.ResponsiveContainer width="100%" height={225}>
        <ReCharts.AreaChart data={data}>
          <defs>
            <linearGradient id="chart-gradient" gradientTransform="rotate(180)">
              <stop offset="0%" stopColor={`rgba(${gradientColor}, 0.08)`} />
              <stop offset="100%" stopColor={`rgba(${gradientColor}, 0)`} />
            </linearGradient>
          </defs>
          <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
          <ReCharts.XAxis dataKey="timestamp" hide />
          <ReCharts.YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: any) => Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value)}
          />
          <ReCharts.Tooltip
            separator=""
            labelFormatter={value => (
              <Text type="p2" tag="span" weight="semibold" color="primary">
                {value instanceof Date ? format(value, 'MM.dd.yyyy HH:mm') : ''}
              </Text>
            )}
            formatter={(value: number) => (
              <Text type="p2" tag="span" weight="semibold" style={{ color }}>
                {formatUSDValue(value)}
              </Text>
            )}
          />
          <ReCharts.Area
            name="Value: "
            dataKey="value"
            type="monotone"
            fill="url(#chart-gradient)"
            stroke={color}
            strokeWidth={2}
          />
        </ReCharts.AreaChart>
      </ReCharts.ResponsiveContainer>
    </Card>
  );
};

export default PortfolioValue;
