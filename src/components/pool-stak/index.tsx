import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import PoolTokenRow from 'components/pool-token-row';
import PoolTransactionTable from 'components/pool-transaction-table';

import { TOKEN_DAI_KEY, TOKEN_SUSD_KEY, TOKEN_UNISWAP_KEY, TOKEN_USDC_KEY } from 'web3/contracts';
import { useEthGasPrice } from 'context/useEthGas';

import s from './styles.module.css';

export type PoolStakProps = {
  stableToken?: boolean;
  lpToken?: boolean;
};

const PoolStak: React.FunctionComponent<PoolStakProps> = props => {
  const ethGasPrice = useEthGasPrice();
  const history = useHistory();

  React.useEffect(() => {
    ethGasPrice.load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function goBack() {
    history.replace('/pools');
  }

  return (
    <div className={s.component}>
      <Antd.Button
        type="link"
        className={s.headerLabel}
        icon={<ArrowLeftOutlined className={s.backSvg} />}
        onClick={goBack}
      >
        {props.stableToken && <span>USDC/DAI/sUSD</span>}
        {props.lpToken && <span>USDC_BOND_UNI_LP</span>}
      </Antd.Button>

      <Antd.Tabs className={s.tabs} defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow stableToken token={TOKEN_USDC_KEY} type="deposit" />
                <PoolTokenRow stableToken token={TOKEN_DAI_KEY} type="deposit" />
                <PoolTokenRow stableToken token={TOKEN_SUSD_KEY} type="deposit" />
              </>
            )}
            {props.lpToken && (
              <PoolTokenRow lpToken token={TOKEN_UNISWAP_KEY} type="deposit" />
            )}
          </div>
        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow stableToken token={TOKEN_USDC_KEY} type="withdraw" />
                <PoolTokenRow stableToken token={TOKEN_DAI_KEY} type="withdraw" />
                <PoolTokenRow stableToken token={TOKEN_SUSD_KEY} type="withdraw" />
              </>
            )}
            {props.lpToken && (
              <PoolTokenRow lpToken token={TOKEN_UNISWAP_KEY} type="withdraw" />
            )}
          </div>
        </Antd.Tabs.TabPane>
      </Antd.Tabs>

      <PoolTransactionTable
        label="My Transactions"
        ownTransactions
        stableToken={props.stableToken}
        lpToken={props.lpToken} />
    </div>
  );
};

export default PoolStak;
