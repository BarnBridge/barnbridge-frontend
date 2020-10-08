import React from 'react';
import * as Antd from 'antd';
import * as ReCharts from 'recharts';
import BigNumber from 'bignumber.js';

import IconsSet from 'components/icons-set';
import Dropdown, { DropdownOption } from 'components/dropdown';

import { useWeb3Contracts } from 'web3/contracts';
import { useTransactions } from 'hooks/useTransactions';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

const PoolFilters: DropdownOption[] = [
  { value: 'uds', label: 'USDC/DAI/sUSD' },
  { value: 'uni', label: 'USDC_BOND_UNI_LP' },
];

const PeriodFilters: DropdownOption[] = [
  { value: 'all', label: 'All epochs' },
];

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'DEPOSIT', label: 'Deposits' },
  { value: 'WITHDRAW', label: 'Withdrawals' },
];

export type PoolTransactionChartProps = {};

const PoolTransactionChart: React.FunctionComponent<PoolTransactionChartProps> = props => {
  const web3c = useWeb3Contracts();

  const [poolFilter, setPoolFilter] = React.useState<string | number>('uds');
  const [periodFilter, setPeriodFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const { loading, data, fetch } = useTransactions({
    type: typeFilter !== 'all' ? typeFilter as string : undefined,
  });

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const items = React.useMemo(() => {
    const groups = new Map<string, {
      timestamp: string;
      deposit: BigNumber;
      withdraw: BigNumber;
    }>();

    data?.forEach((item: any) => {
      let group = groups.get(item.timeCode);

      if (!group) {
        group = {
          timestamp: item.timestamp,
          deposit: new BigNumber(0),
          withdraw: new BigNumber(0),
        };

        groups.set(item.timeCode, group);
      }

      if (item.amount) {
        if (item.type === 'DEPOSIT') {
          group.deposit = group.deposit.plus(item.amount);
        } else if (item.type === 'WITHDRAW') {
          group.withdraw = group.withdraw.plus(item.amount);
        }
      }
    });

    return Array.from(groups.values())
      .reverse()
      .map(item => ({
        ...item,
        deposit: item.deposit.toNumber(),
        withdraw: item.withdraw.toNumber(),
      }));
  }, [data, web3c]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>
          <IconsSet className={s.iconSet} icons={[
            poolFilter === 'uds' && <USDCIcon key="usdc" />,
            poolFilter === 'uds' && <DAIIcon key="dai" />,
            poolFilter === 'uds' && <SUSDIcon key="susd" />,
            poolFilter === 'uni' && <UNISWAPIcon key="uni" />,
          ]} />
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
        {loading ? (
          <Antd.Spin />
        ) : (
          <ReCharts.ResponsiveContainer width="100%" height={350}>
            <ReCharts.LineChart
              data={items}
              margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
            >
              <ReCharts.CartesianGrid vertical={false} strokeDasharray="4px" />
              <ReCharts.XAxis dataKey="timestamp" tickLine={false} tickMargin={24} />
              <ReCharts.YAxis tickFormatter={value => new Intl.NumberFormat().format(value)} />
              <ReCharts.Tooltip />
              <ReCharts.Legend align="right" verticalAlign="top" iconType="circle" />
              <ReCharts.Line dataKey="deposit" name="Deposits" type="monotone" stroke="#ff4339" />
              <ReCharts.Line dataKey="withdraw" name="Withdrawals" type="monotone" stroke="#4f6ae6" />
            </ReCharts.LineChart>
          </ReCharts.ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PoolTransactionChart;
