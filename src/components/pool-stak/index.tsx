import React from 'react';
import * as Antd from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import PoolTokenRow from 'components/pool-token-row';
import PoolTransactionTable from 'components/pool-transaction-table';

import s from './styles.module.css';

export type SummaryItem = {
  logo: React.ReactNode;
  name: string;
  walletBalance: string;
  stakedBalance: string;
  enabled: boolean;
};

export type PoolStakProps = {
  label: string;
  loading: boolean;
  tokens: string[];
  summary: SummaryItem[];
  onBack: () => void;
};

const PoolStak: React.FunctionComponent<PoolStakProps> = props => {
  return (
    <div className={s.component}>
      <Antd.Button className={s.headerLabel} onClick={props.onBack} type="link"
                   icon={<ArrowLeftOutlined className={s.backSvg} />}>
        {props.label}
      </Antd.Button>

      <Antd.Tabs className={s.tabs} defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">

          <div className={s.dataRows}>
            {props.summary.map((item, index) => (
              <PoolTokenRow
                key={index}
                logo={item.logo}
                name={item.name}
                walletBalance={item.walletBalance}
                stakedBalance={item.stakedBalance}
                enabled={item.enabled} />
            ))}
          </div>

        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          WITHDRAW
        </Antd.Tabs.TabPane>
      </Antd.Tabs>

      <PoolTransactionTable label="My Transactions" />
    </div>
  );
};

export default PoolStak;
