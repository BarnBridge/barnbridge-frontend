import { useEffect, useMemo, useState } from 'react';
import AntdNotification from 'antd/lib/notification';
import classNames from 'classnames';
import { format } from 'date-fns';
import * as ReCharts from 'recharts';

import Spin from 'components/antd/spin';
import { PeriodChartTabs, PeriodTabsKey } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { PortfolioValueType, useSeAPI } from 'modules/smart-exposure/api';
import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';
import { useWallet } from 'wallets/walletProvider';

import { numberFormat } from 'utils';
import { formatTick, generateTicks } from 'utils/chart';

type Props = {
  poolAddress?: string;
  className?: string;
};

export const PortfolioValue: React.FC<Props> = ({ poolAddress, className }) => {
  const { account } = useWallet();
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<PortfolioValueType[]>([]);
  const seAPI = useSeAPI();

  useEffect(() => {
    if (!account) {
      return;
    }

    setLoading(true);
    seAPI
      .fetchPortfolioValue({
        accountAddress: account,
        window: periodFilter,
        poolAddress,
      })
      .then(result => setDataList(result.data))
      .catch(err => {
        setDataList([]);
        console.error(err);
        AntdNotification.error({
          message: err.data,
        });
      })
      .finally(() => setLoading(false));
  }, [account, poolAddress, periodFilter]);

  const ticks = useMemo(() => {
    return generateTicks(dataList, periodFilter);
  }, [dataList, periodFilter]);

  return (
    <section className={classNames('card', className)}>
      <header className="card-header flex align-center" style={{ padding: '16px 16px 16px 24px' }}>
        <Text type="p1" weight="semibold">
          Portfolio value
        </Text>
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </header>
      <div className="p-24">
        <Spin spinning={loading}>
          {dataList.length === 0 ? (
            <div className="flex flow-row row-gap-24 align-center justify-center pv-48">
              <EmptyChartSvg />
              <Text type="p1" color="secondary">
                Not enough data to plot a graph
              </Text>
            </div>
          ) : (
            <ReCharts.ResponsiveContainer width="100%" height={300} className="mb-24">
              <ReCharts.AreaChart data={dataList} margin={{ left: 25 }}>
                <defs>
                  <linearGradient id="chart-red-gradient" gradientTransform="rotate(180)">
                    <stop offset="0%" stopColor="rgba(var(--theme-red-color-rgb), 0.08)" />
                    <stop offset="100%" stopColor="rgba(var(--theme-red-color-rgb), 0)" />
                  </linearGradient>
                  {/* <linearGradient id="chart-blue-gradient" gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor="rgba(var(--theme-blue-color-rgb), 0.08)" />
                  <stop offset="100%" stopColor="rgba(var(--theme-blue-color-rgb), 0)" />
                </linearGradient> */}
                </defs>
                <ReCharts.CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
                <ReCharts.XAxis
                  // dataKey="point"
                  // axisLine={false}
                  // tickLine={false}
                  // tickFormatter={value => formatTick(value, periodFilter)}
                  dataKey="point"
                  ticks={ticks}
                  tickMargin={12}
                  minTickGap={0}
                  tickFormatter={value => formatTick(value, periodFilter)}
                />
                <ReCharts.YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value =>
                    numberFormat(value, {
                      notation: 'compact',
                    }) ?? ''
                  }
                />
                <ReCharts.Tooltip
                  separator=""
                  labelFormatter={value => (
                    <Text type="p2" tag="span" weight="semibold" color="primary">
                      {typeof value === 'string' ? format(new Date(value), 'MM.dd.yyyy HH:mm') : ''}
                    </Text>
                  )}
                  formatter={(value: number, _: any, { dataKey, payload }: any) => (
                    <Text
                      type="p2"
                      tag="span"
                      weight="semibold"
                      color={dataKey === 'portfolioValueSE' ? 'red' : 'blue'}>
                      {value}
                    </Text>
                  )}
                />
                <ReCharts.Area
                  name={`Value: `}
                  dataKey="portfolioValueSE"
                  type="monotone"
                  fill="url(#chart-red-gradient)"
                  stroke="var(--theme-red-color)"
                  strokeWidth={2}
                />
                {/* <ReCharts.Area
                name={`TBD `}
                dataKey="tokenBLiquidity"
                type="monotone"
                fill="url(#chart-blue-gradient)"
                stroke="var(--theme-blue-color)"
                strokeWidth={2}
              /> */}
              </ReCharts.AreaChart>
            </ReCharts.ResponsiveContainer>
          )}
        </Spin>
      </div>
    </section>
  );
};
