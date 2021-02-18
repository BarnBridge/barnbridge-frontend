import React from 'react';
import { Spin } from 'antd';
import * as ReCharts from 'recharts';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import Select, { SelectOption } from 'components/antd/select';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Paragraph } from 'components/custom/typography';
import PoolTxChartProvider, { usePoolTxChart } from 'modules/yield-farming/providers/pool-tx-chart-provider';
import { getPoolIcons, getPoolNames, PoolTypes } from 'modules/yield-farming/utils';
import { formatUSDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import s from './styles.module.scss';

const PoolFilters: SelectOption[] = [
  {
    value: PoolTypes.STABLE,
    label: getPoolNames(PoolTypes.STABLE).join('/'),
  },
  {
    value: PoolTypes.UNILP,
    label: getPoolNames(PoolTypes.UNILP).join('/'),
  },
  {
    value: PoolTypes.BOND,
    label: getPoolNames(PoolTypes.BOND).join('/'),
  },
];

const TypeFilters: SelectOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'deposits', label: 'Deposits' },
  { value: 'withdrawals', label: 'Withdrawals' },
];

const PoolTxChartInner: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const poolTxChart = usePoolTxChart();

  const PeriodFilters = React.useMemo<SelectOption[]>(() => {
    const filters = [{
      value: 'all',
      label: 'All epochs',
    }];

    let currentEpoch = 0;
    let startEpoch = 0;

    if (poolTxChart.poolFilter === PoolTypes.STABLE) {
      currentEpoch = web3c.yf.currentEpoch ?? 0;
    } else if (poolTxChart.poolFilter === PoolTypes.UNILP) {
      currentEpoch = web3c.yfLP.currentEpoch ?? 0;
      startEpoch = 1;
    } else if (poolTxChart.poolFilter === PoolTypes.BOND) {
      currentEpoch = web3c.yfBOND.currentEpoch ?? 0;
    }

    for (let i = startEpoch; i <= currentEpoch; i++) {
      filters.push({
        value: String(i),
        label: `Epoch ${i}`,
      });
    }

    return filters;
  }, [web3c.yf, web3c.yfLP, web3c.yfBOND, poolTxChart.poolFilter]);

  const chartData = React.useMemo(() => {
    const price = web3c.getPoolUsdPrice(poolTxChart.poolFilter as PoolTypes);

    if (!price) {
      return poolTxChart.summaries;
    }

    return poolTxChart.summaries.map(summary => {
      const deposits = new BigNumber(summary.deposits)
        .multipliedBy(price)
        .toNumber();
      const withdrawals = new BigNumber(summary.withdrawals)
        .multipliedBy(price)
        .multipliedBy(-1)
        .toNumber();

      return {
        ...summary,
        deposits,
        withdrawals,
      };
    });
  }, [web3c, poolTxChart.summaries]);

  React.useEffect(() => {
    poolTxChart.changePoolFilter(PoolTypes.STABLE);
    poolTxChart.changePeriodFilter(undefined);
    poolTxChart.changeTypeFilter(undefined);
  }, []);

  const CardTitle = (
    <Grid flow="col" align="center" justify="space-between">
      <Grid flow="col" gap={8}>
        <IconsSet icons={getPoolIcons(poolTxChart.poolFilter as PoolTypes)} />
        <Select
          options={PoolFilters}
          value={poolTxChart.poolFilter}
          onSelect={(value: string) => {
            poolTxChart.changePoolFilter(value);
          }}
        />
      </Grid>
      <Grid flow="col" gap={8}>
        <Select
          label="Period"
          options={PeriodFilters}
          value={poolTxChart.periodFilter ?? 'all'}
          disabled={poolTxChart.loading}
          onSelect={(value: string) => {
            poolTxChart.changePeriodFilter(value !== 'all' ? value : undefined);
          }}
        />
        <Select
          label="Show"
          options={TypeFilters}
          value={poolTxChart.typeFilter ?? 'all'}
          disabled={poolTxChart.loading}
          onSelect={(value: string) => {
            poolTxChart.changeTypeFilter(value !== 'all' ? value : undefined);
          }}
        />
      </Grid>
    </Grid>
  );

  const ChartEmpty = (
    <Grid flow="row" gap={24} align="center" justify="center" padding={[54, 0]}>
      <EmptyChartSvg />
      <Paragraph type="p1" color="secondary">
        Not enough data to plot a graph
      </Paragraph>
    </Grid>
  );

  return (
    <Card title={CardTitle}>
      <Spin spinning={poolTxChart.loading}>
        {chartData.length
          ? (
            <ReCharts.ResponsiveContainer width="100%" height={350}>
              <ReCharts.BarChart
                data={chartData}
                stackOffset="sign"
                margin={{
                  top: 20,
                  right: 0,
                  left: 60,
                  bottom: 12,
                }}>
                <ReCharts.CartesianGrid
                  vertical={false}
                  stroke="var(--theme-border-color)"
                  strokeDasharray="3 3" />
                <ReCharts.XAxis dataKey="timestamp" stroke="var(--theme-border-color)" />
                <ReCharts.YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: any) => formatUSDValue(value, 2, 0)} />
                <ReCharts.Tooltip
                  wrapperClassName={s.chart_tooltip}
                  formatter={(value: any) => formatUSDValue(value)} />
                <ReCharts.Legend
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  wrapperStyle={{
                    top: 0,
                    right: 12,
                    color: 'var(--theme-secondary-color)',
                  }} />
                <ReCharts.ReferenceLine y={0} stroke="var(--theme-border-color)" />
                {(poolTxChart.typeFilter === undefined || poolTxChart.typeFilter === 'deposits') && (
                  <ReCharts.Bar
                    dataKey="deposits"
                    name="Deposits"
                    stackId="stack"
                    fill="var(--theme-red-color)" />
                )}
                {(poolTxChart.typeFilter === undefined || poolTxChart.typeFilter === 'withdrawals') && (
                  <ReCharts.Bar
                    dataKey="withdrawals"
                    name="Withdrawals"
                    stackId="stack"
                    fill="var(--theme-blue-color)" />
                )}
              </ReCharts.BarChart>
            </ReCharts.ResponsiveContainer>
          )
          : (!poolTxChart.loading ? ChartEmpty : null)
        }
      </Spin>
    </Card>
  );
};

const PoolTxChart: React.FunctionComponent = () => (
  <PoolTxChartProvider>
    <PoolTxChartInner />
  </PoolTxChartProvider>
);

export default PoolTxChart;
