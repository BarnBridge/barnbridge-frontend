import React from 'react';
import * as ReCharts from 'recharts';
import BigNumber from 'bignumber.js';

import IconsSet from 'components/icons-set';
import Dropdown, { DropdownOption } from 'components/dropdown';
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
  }, [poolFilter, periodFilter, typeFilter]);  // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    poolTxChart.startPooling();

    return () => {
      poolTxChart.stopPooling();
    };
  }, []);

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
            <ReCharts.ResponsiveContainer width="100%" height={350}>
              <ReCharts.LineChart
                margin={{ top: 24, right: 24, left: 80, bottom: 24 }}
                data={data}
              >
                <ReCharts.CartesianGrid vertical={false} strokeDasharray="4px" />
                <ReCharts.XAxis dataKey="timestamp" tickLine={false} tickMargin={24} />
                <ReCharts.YAxis tickFormatter={(value: any) =>
                  formatUSDValue(value, 2, 0).replace(/ /gi, '')
                } />
                <ReCharts.Tooltip formatter={(value: any) => formatUSDValue(value)} />
                <ReCharts.Legend
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  wrapperStyle={{ top: 0, right: 12, color: 'var(--text-color-5)' }} />
                {(typeFilter === 'all' || typeFilter === 'deposits') && (
                  <ReCharts.Line dataKey="deposits" name="Deposits" type="monotone" stroke="#ff4339" />
                )}
                {(typeFilter === 'all' || typeFilter === 'withdrawals') && (
                  <ReCharts.Line dataKey="withdrawals" name="Withdrawals" type="monotone" stroke="#4f6ae6" />
                )}
              </ReCharts.LineChart>
            </ReCharts.ResponsiveContainer>
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
