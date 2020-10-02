import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import s from './styles.module.css';

import IconsSet from 'components/icons-set';
import { formatBigValue } from 'web3/utils';

export type PoolCardProps = {
  names: string[];
  icons: React.ReactNode[];
  colors: string[];
  currentEpoch?: number;
  totalEpochs?: number;
  reward?: BigNumber;
  potentialReward?: BigNumber;
  balance?: BigNumber;
  balanceShare?: number[];
  myBalance?: BigNumber;
  myBalanceShare: number[];
};

const PoolCard: React.FunctionComponent<PoolCardProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.pool_header}>
        <IconsSet className={s.pool_avatars} icons={props.icons} />
        <div className={s.pool_info}>
          <div className={s.pool_label}>{props.names?.join('/') ?? '-'}</div>
          <div className={s.pool_epoch}>EPOCH {props.currentEpoch ?? '-'}/{props.totalEpochs ?? '-'}</div>
        </div>
      </div>

      <div className={s.reward_row}>
        <div>
          <div className={s.reward_label}>REWARD</div>
          <div className={s.reward_value}>
            <span>{props.reward?.toFormat(3) || '-'}</span> BOND
          </div>
        </div>
        <div className={s.reward_delimiter} />
        <div>
          <div className={s.reward_label}>MY POTENTIAL REWARD</div>
          <div className={s.reward_value}>
            <span>-</span> BOND
          </div>
        </div>
      </div>

      <div className={s.balance_row}>
        <div className={s.balance_label}>POOL BALANCE</div>
        <div className={s.balance_value}>{props.balance?.toFormat(3) || '-'}</div>
      </div>

      <div className={s.pool_stack_bar}>
        {props.balanceShare?.map((share, index) => (
          <Antd.Tooltip key={index} placement="top" title={(
            <div className={s.balance_tooltip}>
              {props.icons[index]}
              <span>{props.names[index]}:</span>
              <span>$ {formatBigValue(new BigNumber(300000))}</span>
            </div>
          )}>
            <div style={{ width: `${share ?? 0}%`, backgroundColor: props.colors[index] }} />
          </Antd.Tooltip>
        ))}
      </div>

      <div className={s.balance_row}>
        <div className={s.balance_label}>MY BALANCE</div>
        <div className={s.balance_value}>$ {props.myBalance?.toFormat(3) || '-'}</div>
      </div>

      <div className={s.pool_stack_bar}>
        {props.myBalanceShare.map((share, index) => (
          <Antd.Tooltip key={index} placement="top" title={(
            <div className={s.balance_tooltip}>
              {props.icons[index]}
              <span>{props.names[index]}:</span>
              <span>$ {formatBigValue(new BigNumber(300000))}</span>
            </div>
          )}>
            <div style={{ width: `${share ?? 0}%`, backgroundColor: props.colors[index] }} />
          </Antd.Tooltip>
        ))}
      </div>
    </div>
  );
};

export default PoolCard;
