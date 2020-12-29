import React from 'react';
import * as ReCharts from 'recharts';
import BigNumber from 'bignumber.js';

import IconsSet from 'components/custom/icons-set';
import Dropdown, { DropdownOption } from 'components/antd/dropdown';
import PoolTxChartProvider, { usePoolTxChart } from 'views/pools/components/pool-tx-chart-provider';

import { formatUSDValue, getPoolIcons, getPoolNames, PoolTypes } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import s from './styles.module.css';

const PoolFilters: DropdownOption[] = [
  {
    value: 'stable',
    label: getPoolNames(PoolTypes.STABLE).join('/'),
  },
  {
    value: 'unilp',
    label: getPoolNames(PoolTypes.UNILP).join('/'),
  },
  {
    value: 'bond',
    label: getPoolNames(PoolTypes.BOND).join('/'),
  },
];

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'deposits', label: 'Deposits' },
  { value: 'withdrawals', label: 'Withdrawals' },
];

export type PoolTransactionChartProps = {};

const PoolTransactionChartInner: React.FunctionComponent<PoolTransactionChartProps> = () => {
  const web3c = useWeb3Contracts();
  const poolTxChart = usePoolTxChart();

  const [poolFilter, setPoolFilter] = React.useState<PoolTypes>(PoolTypes.STABLE);
  const [periodFilter, setPeriodFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const PeriodFilters = React.useMemo<DropdownOption[]>(() => {
    const filters = [{ value: 'all', label: 'All epochs' }];

    if (poolFilter === PoolTypes.STABLE) {
      for (let i = 0; i <= web3c.staking.currentEpoch!; i++) {
        filters.push({ value: String(i), label: `Epoch ${i}` });
      }
    } else if (poolFilter === PoolTypes.UNILP) {
      for (let i = 1; i <= web3c.staking.currentEpoch! - web3c.yfLP.delayedEpochs!; i++) {
        filters.push({ value: String(i), label: `Epoch ${i}` });
      }
    } else if (poolFilter === PoolTypes.BOND) {
      for (let i = 0; i <= web3c.staking.currentEpoch! - web3c.yfBOND.delayedEpochs!; i++) {
        filters.push({ value: String(i), label: `Epoch ${i}` });
      }
    }

    return filters;
  }, [web3c.staking, web3c.yfLP, web3c.yfBOND, poolFilter]);

  React.useEffect(() => {
    poolTxChart.load({
      pool: poolFilter,
      period: periodFilter !== 'all' ? String(periodFilter) : undefined,
      type: typeFilter !== 'all' ? String(typeFilter) : undefined,
    }).catch(x => x);
  }, [poolFilter, periodFilter, typeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    poolTxChart.startPooling();

    return () => {
      poolTxChart.stopPooling();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const data = React.useMemo(() => {
    const price = web3c.getPoolUsdPrice(poolFilter);

    if (!price) {
      return poolTxChart.summaries;
    }

    return poolTxChart.summaries.map(summary => {
      const deposits = (new BigNumber(summary.deposits))
        .multipliedBy(price)
        .toNumber();
      const withdrawals = (new BigNumber(summary.withdrawals))
        .multipliedBy(price)
        .multipliedBy(-1)
        .toNumber();

      return {
        ...summary,
        deposits,
        withdrawals,
      };
    });
  }, [web3c, poolFilter, poolTxChart.summaries]);

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>
          <IconsSet className={s.iconSet} icons={getPoolIcons(poolFilter)} />
          <Dropdown
            items={PoolFilters}
            selected={poolFilter}
            onSelect={(value: string | number) => setPoolFilter(value as PoolTypes)}
          />
        </div>
        <div className={s.filters}>
          <Dropdown
            button
            label="Period"
            items={PeriodFilters}
            selected={periodFilter}
            onSelect={setPeriodFilter}
          />
          <Dropdown
            button
            label="Show"
            items={TypeFilters}
            selected={typeFilter}
            onSelect={setTypeFilter}
          />
        </div>
      </div>
      <div className={s.chart}>
        {poolTxChart.loaded && (
          <>
            {!poolTxChart.loading && data.length === 0 && (
              <div className={s.emptyBlock}>
                <EmptyChartSvg />
                <div className={s.emptyLabel}>Not enough data to plot a graph</div>
              </div>
            )}
            {data.length > 0 && (
              <ReCharts.ResponsiveContainer width="100%" height={350}>
                <ReCharts.BarChart
                  data={data}
                  stackOffset="sign"
                  margin={{
                    top: 20, right: 0, left: 60, bottom: 12,
                  }}
                >
                  <ReCharts.CartesianGrid vertical={false} stroke="#666" strokeDasharray="3 3" />
                  <ReCharts.XAxis dataKey="timestamp" tickMargin={24} />
                  <ReCharts.YAxis axisLine={false} tickLine={false} tickFormatter={(value: any) =>
                    formatUSDValue(value, 2, 0)
                  } />
                  <ReCharts.Tooltip formatter={(value: any) => formatUSDValue(value)} />
                  <ReCharts.Legend
                    align="right"
                    verticalAlign="top"
                    iconType="circle"
                    wrapperStyle={{ top: 0, right: 12, color: 'var(--text-color-5)' }} />
                  <ReCharts.ReferenceLine y={0} stroke="#666" />
                  {(typeFilter === 'all' || typeFilter === 'deposits') && (
                    <ReCharts.Bar dataKey="deposits" name="Deposits" fill="#ff4339" stackId="stack" />
                  )}
                  {(typeFilter === 'all' || typeFilter === 'withdrawals') && (
                    <ReCharts.Bar dataKey="withdrawals" name="Withdrawals" fill="#4f6ae6" stackId="stack" />
                  )}
                </ReCharts.BarChart>
              </ReCharts.ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const PoolTransactionChart: React.FunctionComponent<PoolTransactionChartProps> = props => (
  <PoolTxChartProvider>
    <PoolTransactionChartInner {...props} />
  </PoolTxChartProvider>
);

export default PoolTransactionChart;
