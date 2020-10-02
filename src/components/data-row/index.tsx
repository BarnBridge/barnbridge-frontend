import React from 'react';
import * as Antd from 'antd';

import s from './styles.module.css';

export type DataRowProps = {
  logo: React.ReactNode;
  name: string;
  rewards: number;
  balance: number;
  enabled: boolean;
}

const DataRow: React.FunctionComponent<DataRowProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.col}>
        <div className={s.logo}>{props.logo}</div>
        <div className={s.name}>{props.name}</div>
      </div>
      <div className={s.col}>
        <div className={s.label}>BOND REWARDS</div>
        <div className={s.value}>
          {props.rewards} <span>BOND</span>
        </div>
      </div>
      <div className={s.col}>
        <div className={s.label}>BALANCE</div>
        <div className={s.value}>
          {props.balance} <span>USDC</span></div>
      </div>
      <div className={s.col}>
        <div className={s.label}>ENABLE TOKEN</div>
        <div className={s.value}><Antd.Switch checked={props.enabled} /></div>
      </div>
      <div></div>
    </div>
  );
};

export default DataRow;
