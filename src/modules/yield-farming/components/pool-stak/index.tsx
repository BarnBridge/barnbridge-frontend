import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import PoolTokenRow from 'modules/yield-farming/components/pool-token-row';
import PoolTransactionTable from 'modules/yield-farming/components/pool-transaction-table';

import Icons from 'components/custom/icon';

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
  const history = useHistory();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function goBack() {
    history.replace('/yield-farming');
  }

  return (
    <div className={s.component}>
      <Antd.Button
        type="link"
        className={s.headerLabel}
        icon={<Icons name="left-arrow" />}
        onClick={goBack}>
        {props.stableToken && getPoolNames(PoolTypes.STABLE).join('/')}
        {props.unilpToken && getPoolNames(PoolTypes.UNILP).join('/')}
        {props.bondToken && getPoolNames(PoolTypes.BOND).join('/')}
      </Antd.Button>

      <Antd.Tabs className={s.tabs} defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow token={USDCTokenMeta} type="deposit" />
                <PoolTokenRow token={DAITokenMeta} type="deposit" />
                <PoolTokenRow token={SUSDTokenMeta} type="deposit" />
              </>
            )}
            {props.unilpToken && (
              <PoolTokenRow token={UNISWAPTokenMeta} type="deposit" expanded />
            )}
            {props.bondToken && (
              <PoolTokenRow token={BONDTokenMeta} type="deposit" expanded />
            )}
          </div>
          <PoolTransactionTable
            className={s.table}
            label="My Transactions"
            ownTransactions
            deposits
            stableToken={props.stableToken}
            unilpToken={props.unilpToken}
            bondToken={props.bondToken}
          />
        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          <div className={s.dataRows}>
            {props.stableToken && (
              <>
                <PoolTokenRow token={USDCTokenMeta} type="withdraw" />
                <PoolTokenRow token={DAITokenMeta} type="withdraw" />
                <PoolTokenRow token={SUSDTokenMeta} type="withdraw" />
              </>
            )}
            {props.unilpToken && (
              <PoolTokenRow token={UNISWAPTokenMeta} type="withdraw" expanded />
            )}
            {props.bondToken && (
              <PoolTokenRow token={BONDTokenMeta} type="withdraw" expanded />
            )}
          </div>
          <PoolTransactionTable
            className={s.table}
            label="My Transactions"
            ownTransactions
            withdrawals
            stableToken={props.stableToken}
            unilpToken={props.unilpToken}
            bondToken={props.bondToken}
          />
        </Antd.Tabs.TabPane>
      </Antd.Tabs>
    </div>
  );
};

export default PoolStak;
