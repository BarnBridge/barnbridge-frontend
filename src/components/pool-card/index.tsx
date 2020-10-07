import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import s from './styles.module.css';

import InfoTooltip from 'components/info-tooltip';
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
  onStaking: () => void;
};

const PoolCard: React.FunctionComponent<PoolCardProps> = props => {
  return (
    <div className={s.component}>
      <div className={s.row1}>
        <IconsSet className={s.pool_avatars} icons={props.icons} />
        <div className={s.pool_info}>
          <div className={s.pool_label}>{props.names?.join('/') ?? '-'}</div>
          <div className={s.pool_epoch}>EPOCH {props.currentEpoch ?? '-'}/{props.totalEpochs ?? '-'}</div>
        </div>
        <Antd.Button className={s.stakingBtn} type="primary" onClick={props.onStaking}>Staking</Antd.Button>
      </div>

      <div className={s.row2}>
        <div className={s.col1}>
          <div className={s.row_label}>REWARD</div>
          <div className={s.row_value}>
            <span>{props.reward?.toFormat(3) || '-'}</span> BOND
          </div>
        </div>
        <div className={s.col2}>
          <div className={s.row_label}>MY POTENTIAL REWARD</div>
          <div className={s.row_value}>
            <span>-</span> BOND
          </div>
        </div>
      </div>

      <div className={s.row3}>
        <div className={s.row_label}>
          <span>POOL BALANCE</span>
          <InfoTooltip />
        </div>
        <div className={s.row_value}>{props.balance?.toFormat(3) || '-'}</div>
        <div className={s.row_value_2}>$ 1,007,007 effective balance</div>
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
      </div>

      <div className={s.row4}>
        <div className={s.row_label}>
          <span>MY BALANCE</span>
          <InfoTooltip />
        </div>
        <div className={s.row_value}>$ {props.myBalance?.toFormat(3) || '-'}</div>
        <div className={s.row_value_2}>- effective balance</div>
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
    </div>
  );
};

export default PoolCard;
