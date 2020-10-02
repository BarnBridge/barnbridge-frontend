import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import * as ReCharts from 'recharts';
import { format, formatDistance } from 'date-fns';
import BigNumber from 'bignumber.js';
import { capitalize } from 'lodash';

import s from './styles.module.css';

import { useWeb3Contracts } from 'web3/contracts';
import { getHumanValue } from 'web3/utils';
import Dropdown, { DropdownOption } from 'components/dropdown';
import IconsSet from 'components/icons-set';

import { ReactComponent as USDCIcon } from 'resources/svg/coins/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/coins/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/coins/susd.svg';
import { ReactComponent as BONDIcon } from 'resources/svg/coins/bond.svg';

const GET_TRANSACTIONS = gql`
	{
		stakingActions(first: 5) {
			id
			type
			user
			token
			amount
			blockNumber
			blockTimestamp
			txHash
		}
	}
`;

type StakingAction = {
  id: string;
  type: string;
  user: string;
  token: string;
  amount: string;
  blockNumber: number;
  blockTimestamp: string;
  txHash: string;
};

const PoolTransactions: React.FunctionComponent = props => {
  const web3c = useWeb3Contracts();
  const web3cRef = React.useRef(web3c);
  web3cRef.current = web3c;

  const [coinFilter, setCoinFilter] = React.useState<string | number>('uds');
  const [periodFilter, setPeriodFilter] = React.useState<string | number>('all');
  const [showFilter, setShowFilter] = React.useState<string | number>('all');
  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');

  const coinItems = React.useMemo<DropdownOption[]>(() => [
    {
      value: 'uds',
      label: 'USDC/DAI/sUSD',
    },
    {
      value: 'bond',
      label: 'YCRV_BOND_UNI_LP',
    },
  ], []);
  const periodFilterItems = React.useMemo<DropdownOption[]>(() => [
    {
      value: 'all',
      label: 'All epochs',
    },
  ], []);
  const showFilterItems = React.useMemo<DropdownOption[]>(() => [
    {
      value: 'all',
      label: 'All transactions',
    },
  ], []);
  const tokenFilterItems = React.useMemo<DropdownOption[]>(() => [
    {
      value: 'all',
      label: 'All tokens',
    },
  ], []);

  const columns = React.useMemo<ColumnsType<StakingAction>>(() => [
    {
      title: 'From',
      dataIndex: 'userShort',
    },
    {
      title: 'TX Hash',
      dataIndex: 'txHashShort',
      render: (value, row) => {
        return <a href={`https://rinkeby.etherscan.io/tx/${row.txHash}`} rel="noopener noreferrer"
                  target="_blank">{value}</a>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'timeDistance',
    },
    {
      title: 'Amount',
      dataIndex: 'amountFormat',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: value => capitalize(value),
    },
  ], []);

  return (
    <Query query={GET_TRANSACTIONS}>
      {({ loading, data }: any) => {
        const transactions = (data?.stakingActions || []).map((item: any) => {
          const time = Number(item.blockTimestamp) * 1000;
          const sliceAddr = (addr: string) => {
            return [String(addr).slice(0, 6), String(addr).slice(-4)].join('...');
          };

          return {
            ...item,
            userShort: sliceAddr(item.user),
            txHashShort: sliceAddr(item.txHash),
            time,
            timeFormat: format(time, 'MM/dd/yyyy'),
            get timeDistance() {
              return formatDistance(new Date(item.blockTimestamp * 1000), new Date(), {
                addSuffix: true,
              });
            },
            get amount() {
              const info = web3cRef.current.getContractByToken(item.token);

              if (!info?.decimals) {
                return undefined;
              }

              return getHumanValue(new BigNumber(item.amount), info.decimals);
            },
            get amountFormat() {
              return this.amount?.toFormat(3) ?? '-';
            },
            get deposit() {
              return item.type === 'DEPOSIT' ? this.amount?.toNumber() : '';
            },
            get withdraw() {
              return item.type === 'WITHDRAW' ? this.amount?.toNumber() ?? '' : '';
            },
          };
        });

        return (
          <div>
            <div className={s.chartWidget}>
              <div className={s.chartWidgetHead}>
                <div className={s.chartWidgetHeadLabel}>
                  <IconsSet className={s.chartWidgetIconSet} icons={[
                    coinFilter === 'uds' && <USDCIcon key="usdc" />,
                    coinFilter === 'uds' && <DAIIcon key="dai" />,
                    coinFilter === 'uds' && <SUSDIcon key="susd" />,
                    coinFilter === 'bond' && <BONDIcon key="bond" />,
                  ]} />
                  <Dropdown
                    items={coinItems}
                    selected={coinFilter}
                    onSelect={setCoinFilter}
                  />
                </div>
                <div className={s.chartWidgetHeadFilters}>
                  <Dropdown
                    button
                    label="Period"
                    items={periodFilterItems}
                    selected={periodFilter}
                    onSelect={setPeriodFilter}
                  />
                  <Dropdown
                    button
                    label="Show"
                    items={showFilterItems}
                    selected={showFilter}
                    onSelect={setShowFilter}
                  />
                </div>
              </div>
              <div className={s.wrapChart}>
                {loading ? (
                  <Antd.Spin />
                ) : (
                  <ReCharts.ResponsiveContainer width="100%" height={350}>
                    <ReCharts.LineChart
                      data={transactions}
                      margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
                    >
                      <ReCharts.CartesianGrid vertical={false} strokeDasharray="4px" />
                      <ReCharts.XAxis dataKey="timeFormat" tickLine={false} tickMargin={24} />
                      <ReCharts.YAxis tickFormatter={value => new Intl.NumberFormat().format(value)} />
                      <ReCharts.Tooltip />
                      <ReCharts.Legend align="right" verticalAlign="top" iconType="circle" />
                      <ReCharts.Line dataKey="deposit" name="Deposits" type="monotone" stroke="#ff4339" />
                      <ReCharts.Line dataKey="withdraw" name="Withdraws" type="monotone" stroke="#4f6ae6" />
                    </ReCharts.LineChart>
                  </ReCharts.ResponsiveContainer>
                )}
              </div>
            </div>

            <div className={s.tableWidget}>
              <div className={s.tableWidgetHead}>
                <div className={s.tableWidgetHeadLabel}>
                  Transactions
                </div>
                <div className={s.tableWidgetHeadFilters}>
                  <Dropdown
                    button
                    label="Tokens"
                    items={tokenFilterItems}
                    selected={tokenFilter}
                    onSelect={setTokenFilter}
                  />
                  <Dropdown
                    button
                    label="Show"
                    items={showFilterItems}
                    selected={showFilter}
                    onSelect={setShowFilter}
                  />
                </div>
              </div>
              <Antd.Table
                className={s.table}
                loading={loading}
                columns={columns}
                rowKey="txHash"
                dataSource={transactions}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default PoolTransactions;
