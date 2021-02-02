import React from 'react';
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
  | 'uniswap-token';
export type NavIconNames =
  | 'paper-bill-outlined'
  | 'chats-outlined'
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
  | 'chevron-right'
  | 'close-circle-outlined'
  | 'check-circle-outlined'
  | 'history-circle-outlined'
  | 'close'
  | 'dropdown-arrow'
  | 'warning-outlined'
  | 'gear'
  | 'earth'
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
  | 'link-outlined';

export type IconsProps = {
  name: IconNames;
  width?: number | string;
  height?: number | string;
  color?: string;
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
};

const Icons: React.FunctionComponent<IconsProps> = props => {
  const { name, width = 24, height = 24, rotate, color, className } = props;

  return (
    <svg
      className={cx(
        s.component,
        className,
        rotate && `rotate-${rotate}`,
        color && `clr-${color}`,
      )}
      width={width}
      height={height ?? width}>
      <use xlinkHref={`${Sprite}#icon__${name}`} />
    </svg>
  );
};

export default Icons;
