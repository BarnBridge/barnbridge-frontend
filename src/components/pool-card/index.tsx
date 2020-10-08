import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import InfoTooltip from 'components/info-tooltip';
import IconsSet from 'components/icons-set';

import { formatBigValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNIIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

export type PoolCardProps = {
  stableToken?: boolean;
  lpToken?: boolean;
  balanceShare?: number[];
  myBalanceShare: number[];
  onStaking: () => void;
};

const PoolCard: React.FunctionComponent<PoolCardProps> = props => {
  const { aggregated, yf, yflp } = useWeb3Contracts();

  const { stableToken = false, lpToken = false } = props;

  const icons = React.useMemo<React.ReactNode[]>(() => {
    if (stableToken) {
      return [
        <USDCIcon key="usdc" />,
        <DAIIcon key="dai" />,
        <SUSDIcon key="susd" />,
      ];
    } else if (lpToken) {
      return [
        <UNIIcon key="uniswap" />,
      ];
    }

    return [];
  }, [stableToken, lpToken]);

  const nameLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return 'USDC/DAI/sUSD';
    } else if (lpToken) {
      return 'USDC_BOND_UNI_LP';
    }

    return '-';
  }, [stableToken, lpToken]);

  const epochLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return `EPOCH ${yf.currentEpoch ?? '-'}/${yf.totalEpochs ?? '-'}`;
    } else if (lpToken) {
      return `EPOCH ${yflp.currentEpoch ?? '-'}/${yflp.totalEpochs ?? '-'}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const epochReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBigValue(yf.epochReward)} BOND`;
    } else if (lpToken) {
      return `${formatBigValue(yflp.epochReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const potentialReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBigValue(yf.potentialReward)} BOND`;
    } else if (lpToken) {
      return `${formatBigValue(yflp.potentialReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const balance = React.useMemo<string>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(aggregated.poolBalanceUDS)}`;
    } else if (lpToken) {
      return `${formatBigValue(aggregated.poolBalanceUNI)} USDC_BOND_UNI_LP`;
    }

    return '-';
  }, [stableToken, lpToken, aggregated]);

  const effectiveBalance = React.useMemo<string>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(aggregated.effectivePoolBalanceUDS)}`;
    } else if (lpToken) {
      return formatBigValue(aggregated.effectivePoolBalanceUNI);
    }

    return '-';
  }, [stableToken, lpToken, aggregated]);

  const myBalance = React.useMemo<string>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(aggregated.myPoolBalanceUDS)}`;
    } else if (lpToken) {
      return `${formatBigValue(aggregated.myPoolBalanceUNI)} USDC_BOND_UNI_LP`;
    }

    return '-';
  }, [stableToken, lpToken, aggregated]);

  const myEffectiveBalance = React.useMemo<string>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(aggregated.myEffectivePoolBalanceUDS)}`;
    } else if (lpToken) {
      return formatBigValue(aggregated.myEffectivePoolBalanceUNI);
    }

    return '-';
  }, [stableToken, lpToken, aggregated]);

  const colors = React.useMemo<string[]>(() => {
    if (stableToken) {
      return ['#4f6ae6', '#ffd160', '#1e1a31'];
    } else if (lpToken) {
      return ['#ff4339'];
    }

    return [];
  }, [stableToken, lpToken]);

  return (
    <div className={s.component}>
      <div className={s.row1}>
        <IconsSet className={s.pool_avatars} icons={icons} />
        <div className={s.pool_info}>
          <div className={s.pool_label}>{nameLabel}</div>
          <div className={s.pool_epoch}>{epochLabel}</div>
        </div>
        <Antd.Button className={s.stakingBtn} type="primary" onClick={props.onStaking}>Staking</Antd.Button>
      </div>

      <div className={s.row2}>
        <div className={s.col1}>
          <div className={s.row_label}>REWARD</div>
          <div className={s.row_value}>
            <span>{epochReward}</span>
          </div>
        </div>
        <div className={s.col2}>
          <div className={s.row_label}>MY POTENTIAL REWARD</div>
          <div className={s.row_value}>
            <span>{potentialReward}</span>
          </div>
        </div>
      </div>

      <div className={s.row3}>
        <div className={s.row_label}>
          <span>POOL BALANCE</span>
          <InfoTooltip />
        </div>
        <div className={s.row_value}>{balance}</div>
        <div className={s.row_value_2}>{effectiveBalance} effective balance</div>
        <div className={s.pool_stack_bar}>
          {props.balanceShare?.map((share, index) => (
            <Antd.Tooltip key={index} placement="top" title={(
              <div className={s.balance_tooltip}>
                <span>$ {formatBigValue(new BigNumber(300000))}</span>
              </div>
            )}>
              <div style={{ width: `${share ?? 0}%`, backgroundColor: colors[index] }} />
            </Antd.Tooltip>
          ))}
        </div>
      </div>

      <div className={s.row4}>
        <div className={s.row_label}>
          <span>MY BALANCE</span>
          <InfoTooltip />
        </div>
        <div className={s.row_value}>{myBalance}</div>
        <div className={s.row_value_2}>{myEffectiveBalance} effective balance</div>
        <div className={s.pool_stack_bar}>
          {props.myBalanceShare.map((share, index) => (
            <Antd.Tooltip key={index} placement="top" title={(
              <div className={s.balance_tooltip}>
                <span>$ {formatBigValue(new BigNumber(300000))}</span>
              </div>
            )}>
              <div style={{ width: `${share ?? 0}%`, backgroundColor: colors[index] }} />
            </Antd.Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
