import React from 'react';
import AntdSpin from 'antd/lib/spin';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import * as ReCharts from 'recharts';
import { formatUSDValue } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import { Text } from 'components/custom/typography';
import { useSyAPI } from 'modules/smart-yield/api';
import { useWallet } from 'wallets/walletProvider';

const DAYS_FILTER: SelectOption[] = [
  {
    label: '7 days',
    value: 7,
  },
  {
    label: '30 days',
    value: 30,
  },
];

type State = {
  loading: boolean;
  data: {
    timestamp: Date;
    value: number;
  }[];
  filter: {
    days: number;
  };
};

const InitialState: State = {
  loading: false,
  data: [],
  filter: {
    days: Number(DAYS_FILTER[0].value),
  },
};

type Props = {
  type: 'general' | 'senior' | 'junior';
};

const PortfolioValue: React.FC<Props> = props => {
  const { type } = props;

  const wallet = useWallet();
  const syAPI = useSyAPI();

  const [state, setState] = React.useState<State>(InitialState);

  const [daysFilter, setDaysFilter] = React.useState<number>(30);

  const [title, color, gradientColor] = React.useMemo(() => {
    switch (type) {
      case 'general':
        return ['Portfolio value', 'var(--theme-red-color)', 'var(--theme-red-color-rgb)'];
      case 'senior':
        return ['Senior portfolio value', 'var(--theme-green-color)', 'var(--theme-green-color-rgb)'];
      case 'junior':
        return ['Junior portfolio value', 'var(--theme-purple-color)', 'var(--theme-purple-color-rgb)'];
      default:
        return [];
    }
  }, [type]);

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(prevState => ({
        ...prevState,
        loading: true,
      }));

      try {
        let values: any[] = [];

        if (type === 'general') {
          values = (await syAPI.fetchSYPortfolioValues(wallet.account)).map(item => ({
            timestamp: item.timestamp,
            value: item.seniorValue + item.juniorValue,
          }));
        } else if (type === 'senior') {
          values = (await syAPI.fetchSYSeniorPortfolioValues(wallet.account)).map(item => ({
            timestamp: item.timestamp,
            value: item.seniorValue,
          }));
        } else if (type === 'junior') {
          values = (await syAPI.fetchSYJuniorPortfolioValues(wallet.account)).map(item => ({
            timestamp: item.timestamp,
            value: item.juniorValue,
          }));
        }

        setState(prevState => ({
          ...prevState,
          loading: false,
          data: values,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
          data: [],
        }));
      }
    })();
  }, [wallet.account]);

  const chartData = React.useMemo(() => {
    const lastDays = addDays(startOfDay(new Date()), -daysFilter);
    return state.data.filter(item => item.timestamp > lastDays);
  }, [state.data, daysFilter]);

  return (
    <AntdSpin spinning={state.loading}>
      <div className="card">
        <div className="card-header flex align-center justify-space-between pv-12">
          <Text type="p1" weight="semibold" color="primary">
            {title}
          </Text>
          <Select options={DAYS_FILTER} value={daysFilter} onChange={value => setDaysFilter(Number(value))} />
        </div>
        <div className="p-24">
          <ReCharts.ResponsiveContainer width="100%" height={178}>
            <ReCharts.AreaChart data={chartData}>
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
                tickFormatter={(value: any) =>
                  Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value)
                }
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
        </div>
      </div>
    </AntdSpin>
  );
};

export default PortfolioValue;
