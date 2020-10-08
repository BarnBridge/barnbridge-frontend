import React from 'react';
import * as Antd from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import PoolTokenRow from 'components/pool-token-row';
import PoolTransactionTable from 'components/pool-transaction-table';

import { TokenInfo, useWeb3Contracts } from 'web3/contracts';

import s from './styles.module.css';
import { formatBigValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

export type SummaryItem = {
  logo: React.ReactNode;
  name: string;
  walletBalance: string;
  stakedBalance: string;
  enabled: boolean;
};

export type PoolStakProps = {
  loading: boolean;
  tokens: Map<string, TokenInfo>;
  onBack: () => void;
};

const PoolStak: React.FunctionComponent<PoolStakProps> = props => {
  const web3c = useWeb3Contracts();
  const tokens = React.useMemo(() => Array.from(props.tokens), [props.tokens]);
  const label = React.useMemo(() => {
    return tokens.map(([name, info]) => name).join('/');
  }, [tokens]);

  function handleTokenEnable(enabled: boolean) {
    web3c.usdc.approveSend(enabled ? MAX_UINT_256 : ZERO_BIG_NUMBER);
  }

  return (
    <div className={s.component}>
      <Antd.Button
        type="link"
        className={s.headerLabel}
        icon={<ArrowLeftOutlined className={s.backSvg} />}
        onClick={props.onBack}
      >{label}</Antd.Button>

      <Antd.Tabs className={s.tabs} defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">
          <div className={s.dataRows}>
            {tokens.map(([name, tokenInfo]) => (
              <PoolTokenRow
                key={name}
                logo={<tokenInfo.icon />}
                name={name}
                walletBalance={formatBigValue(web3c.usdc.balance)}
                stakedBalance={formatBigValue(web3c.staking.usdc.balance)}
                enabled={!web3c.usdc.allowance?.isEqualTo(ZERO_BIG_NUMBER)}
                onTokenEnable={handleTokenEnable} />
            ))}
          </div>
        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          WITHDRAW
        </Antd.Tabs.TabPane>
      </Antd.Tabs>

      <PoolTransactionTable
        label="My Transactions"
        tokens={props.tokens}
      />
    </div>
  );
};

export default PoolStak;
