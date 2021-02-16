import React, { CSSProperties } from 'react';
import cx from 'classnames';

import Sprite from 'resources/svg/icons-sprite.svg';

import s from './styles.module.scss';

export type LogoIconNames = 'barnbridge';

export type TokenIconNames =
  | 'bond-token'
  | 'bond-square-token'
  | 'dai-token'
  | 'susd-token'
  | 'usdc-token'
  | 'uniswap-token'
  | 'compound'
  | 'aave'
  | 'cream_finance'
  | 'yearn_finance';
export type NavIconNames =
  | 'paper-bill-outlined'
  | 'chats-outlined'
  | 'forum-outlined'
  | 'bar-charts-outlined'
  | 'savings-outlined'
  | 'proposal-outlined'
  | 'bank-outlined'
  | 'wallet-outlined';

export type ThemeIconNames = 'moon' | 'sun';

export type IconNames =
  | LogoIconNames
  | TokenIconNames
  | NavIconNames
  | ThemeIconNames
  | 'right-arrow-circle-outlined'
  | 'left-arrow'
  | 'bell'
  | 'bell-outlined'
  | 'chevron-right'
  | 'close-circle-outlined'
  | 'check-circle-outlined'
  | 'history-circle-outlined'
  | 'close'
  | 'dropdown-arrow'
  | 'warning-outlined'
  | 'gear'
  | 'node-status'
  | 'info-outlined'
  | 'network'
  | 'pencil-outlined'
  | 'rate-outlined'
  | 'plus-circle-outlined'
  | 'plus-square-outlined'
  | 'ribbon-outlined'
  | 'bin-outlined'
  | 'add-user'
  | 'search-outlined'
  | 'link-outlined'
  | 'arrow-top-right'
  | 'handshake-outlined'
  | 'stamp-outlined'
  | 'circle-plus-outlined'
  | 'circle-minus-outlined'
  | 'senior_tranche'
  | 'junior_tranche'
  | 'senior_tranche_simplified'
  | 'junior_tranche_simplified'
  | 'withdrawal_regular'
  | 'withdrawal_instant'
  | 'statistics'
  | 'filter';

export type IconsProps = {
  name: IconNames;
  width?: number | string;
  height?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue';
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: CSSProperties;
};

const Icons: React.FunctionComponent<IconsProps> = props => {
  const { name, width = 24, height = 24, rotate, color, className, style } = props;

  return (
    <svg
      className={cx(
        s.component,
        className,
        rotate && `rotate-${rotate}`,
        color && s[`${color}-color`],
      )}
      width={width}
      height={height ?? width}
      style={style}>
      <use xlinkHref={`${Sprite}#icon__${name}`} />
    </svg>
  );
};

export default Icons;
