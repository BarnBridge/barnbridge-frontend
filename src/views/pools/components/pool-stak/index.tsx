import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import PoolTokenRow from 'views/pools/components/pool-token-row';
import PoolTransactionTable from 'views/pools/components/pool-transaction-table';
import { useEthGasPrice } from 'context/useEthGas';

import { getPoolNames, PoolTypes } from 'web3/utils';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';

import s from './styles.module.css';

export type PoolStakProps = {
  stableToken?: boolean;
  unilpToken?: boolean;
  bondToken?: boolean;
};

const PoolStak: React.FunctionComponent<PoolStakProps> = props => {
  const ethGasPrice = useEthGasPrice();
  const history = useHistory();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
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
        {props.stableToken && getPoolNames(PoolTypes.STABLE).join('/')}
        {props.unilpToken && getPoolNames(PoolTypes.UNILP).join('/')}
        {props.bondToken && getPoolNames(PoolTypes.BOND).join('/')}
      </Antd.Button>

      <Antd.Tabs className={s.tabs} defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow stableToken token={USDCTokenMeta} type="deposit" />
                <PoolTokenRow stableToken token={DAITokenMeta} type="deposit" />
                <PoolTokenRow stableToken token={SUSDTokenMeta} type="deposit" />
              </>
            )}
            {props.unilpToken && (
              <PoolTokenRow unilpToken token={UNISWAPTokenMeta} type="deposit" />
            )}
            {props.bondToken && (
              <PoolTokenRow bondToken token={BONDTokenMeta} type="deposit" />
            )}
          </div>
        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow stableToken token={USDCTokenMeta} type="withdraw" />
                <PoolTokenRow stableToken token={DAITokenMeta} type="withdraw" />
                <PoolTokenRow stableToken token={SUSDTokenMeta} type="withdraw" />
              </>
            )}
            {props.unilpToken && (
              <PoolTokenRow unilpToken token={UNISWAPTokenMeta} type="withdraw" />
            )}
            {props.bondToken && (
              <PoolTokenRow bondToken token={BONDTokenMeta} type="withdraw" />
            )}
          </div>
        </Antd.Tabs.TabPane>
      </Antd.Tabs>

      <PoolTransactionTable
        label="My Transactions"
        ownTransactions
        stableToken={props.stableToken}
        unilpToken={props.unilpToken}
        bondToken={props.bondToken} />
    </div>
  );
};

export default PoolStak;
