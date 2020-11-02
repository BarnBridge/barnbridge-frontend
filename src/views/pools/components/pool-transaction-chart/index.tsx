import React from 'react';
import * as Antd from 'antd';
import * as ReCharts from 'recharts';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import pipe from 'lodash/fp/pipe';
import groupBy from 'lodash/fp/groupBy';
import orderBy from 'lodash/fp/orderBy';
import entries from 'lodash/fp/entries';
import values from 'lodash/fp/values';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

import { PoolTransaction, usePoolTransactions } from 'views/pools/components/pool-transactions-provider';
import IconsSet from 'components/icons-set';
import Dropdown, { DropdownOption } from 'components/dropdown';

import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswapV2';

import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import s from 'views/pools/components/pool-transaction-chart/styles.module.css';

const PoolFilters: DropdownOption[] = [
  {
    value: 'stable',
    label: [
      USDCTokenMeta.name,
      DAITokenMeta.name,
      SUSDTokenMeta.name,
    ].join('/'),
  },
  {
    value: 'lp',
    label: [
      UNISWAPTokenMeta.name,
    ].join('/'),
  },
];

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'DEPOSIT', label: 'Deposits' },
  { value: 'WITHDRAW', label: 'Withdrawals' },
];

export type PoolTransactionChartProps = {};

const PoolTransactionChart: React.FunctionComponent<PoolTransactionChartProps> = props => {
  const web3c = useWeb3Contracts();
  const { loading, transactions } = usePoolTransactions();

  const [poolFilter, setPoolFilter] = React.useState<string | number>('stable');
  const [periodFilter, setPeriodFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const PeriodFilters = React.useMemo<DropdownOption[]>(() => {
    const filters = [{ value: 'all', label: 'All epochs' }];

    if (poolFilter === 'stable') {
      for (let i = 0; i <= web3c.staking.currentEpoch!; i++) {
        filters.push({ value: String(i), label: `Epoch ${i}` });
      }
    } else if (poolFilter === 'lp') {
      for (let i = 1; i <= web3c.staking.currentEpoch! - 1; i++) {
        filters.push({ value: String(i), label: `Epoch ${i}` });
      }
    }

    return filters;
  }, [web3c.staking, poolFilter]);

  const data = React.useMemo(() => {
    let selectedEpoch = (periodFilter && Number(periodFilter)) || 0;

    if (poolFilter === 'lp') {
      selectedEpoch += 1;
    }

    const [epochStart, epochEnd] = web3c.staking.getEpochPeriod(selectedEpoch);

    return pipe(
      // filter stable tokens
      poolFilter === 'stable'
        ? filter((item: PoolTransaction) => [
          USDCTokenMeta.address,
          DAITokenMeta.address,
          SUSDTokenMeta.address,
        ].includes(item.token))
        : (t: PoolTransaction[]) => t,
      // filter lp tokens
      poolFilter === 'lp'
        ? filter((item: PoolTransaction) => [
          UNISWAPTokenMeta.address,
        ].includes(item.token))
        : (t: PoolTransaction[]) => t,
      // filter by transaction type
      typeFilter !== 'all'
        ? filter({ type: typeFilter })
        : (t: PoolTransaction[]) => t,
      // filter by epoch
      periodFilter !== 'all'
        ? filter((item: PoolTransaction) => {
          return (item.blockTimestamp >= epochStart && item.blockTimestamp < epochEnd);
        })
        : (t: PoolTransaction[]) => t,
      // group transactions by epoch/day
      periodFilter === 'all'
        ? groupBy((item: PoolTransaction) => {
          const epoch = web3c.staking.getEpochAt(item.blockTimestamp);
          const inc = poolFilter === 'stable' ? 1 : 0;
          return epoch !== undefined ? epoch + inc : '-';
        })
        : groupBy((item: PoolTransaction) => format(item.blockTimestamp, 'yyyyMMdd')),
      entries,
      orderBy('0', 'asc'),
      values,
      map(([key, items]: any[]) => {
        return {
          timestamp: periodFilter === 'all'
            ? `Epoch ${key}`
            : format(items[0].blockTimestamp, 'MM/dd/yyyy'),
          // sum up all deposit transactions
          deposit: pipe(
            filter({ type: 'DEPOSIT' }),
            reduce((ac: BigNumber, item: PoolTransaction) => {
              return BigNumber.isBigNumber(item.usdAmount) ? ac.plus(item.usdAmount) : ac;
            }, new BigNumber(0)),
          )(items).toNumber(),
          // sum up all withdraw transactions
          withdraw: pipe(
            filter({ type: 'WITHDRAW' }),
            reduce((ac: BigNumber, item: PoolTransaction) => {
              return BigNumber.isBigNumber(item.usdAmount) ? ac.plus(item.usdAmount) : ac;
            }, new BigNumber(0)),
          )(items).toNumber(),
        };
      }),
    )(transactions);
  }, [transactions, poolFilter, periodFilter, typeFilter, web3c.staking]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>
          <IconsSet className={s.iconSet} icons={[
            ...poolFilter === 'stable' ? [
              USDCTokenMeta.icon,
              DAITokenMeta.icon,
              SUSDTokenMeta.icon,
            ] : [],
            ...poolFilter === 'lp' ? [
              UNISWAPTokenMeta.icon,
            ] : [],
          ].filter(Boolean)} />
          <Dropdown
            items={PoolFilters}
            selected={poolFilter}
            onSelect={setPoolFilter}
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
        {loading && <Antd.Spin />}
        {!loading && (
          <>
            {data.length === 0 && (
              <div className={s.emptyBlock}>
                <EmptyChartSvg />
                <div className={s.emptyLabel}>Not enough data to plot a graph</div>
              </div>
            )}
            {data.length > 0 && (
              <ReCharts.ResponsiveContainer width="100%" height={350}>
                <ReCharts.LineChart
                  margin={{ top: 24, right: 24, left: 80, bottom: 24 }}
                  data={data}
                >
                  <ReCharts.CartesianGrid vertical={false} strokeDasharray="4px" />
                  <ReCharts.XAxis dataKey="timestamp" tickLine={false} tickMargin={24} />
                  <ReCharts.YAxis tickFormatter={(value: any) => {
                    return new Intl.NumberFormat(undefined,
                      { style: 'currency', currency: 'USD', minimumFractionDigits: 0 },
                    ).format(value).replace(/US/, '');
                  }} />
                  <ReCharts.Tooltip formatter={(value: any) => {
                    return new Intl.NumberFormat(undefined,
                      { style: 'currency', currency: 'USD' },
                    ).format(value).replace(/US/, '');
                  }} />
                  <ReCharts.Legend
                    align="right"
                    verticalAlign="top"
                    iconType="circle"
                    wrapperStyle={{ top: 0, right: 12, color: 'var(--text-color-5)' }} />
                  {(typeFilter === 'all' || typeFilter === 'DEPOSIT') && (
                    <ReCharts.Line dataKey="deposit" name="Deposits" type="monotone" stroke="#ff4339" />
                  )}
                  {(typeFilter === 'all' || typeFilter === 'WITHDRAW') && (
                    <ReCharts.Line dataKey="withdraw" name="Withdrawals" type="monotone" stroke="#4f6ae6" />
                  )}
                </ReCharts.LineChart>
              </ReCharts.ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PoolTransactionChart;