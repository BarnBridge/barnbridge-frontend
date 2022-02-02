import React, { CSSProperties } from 'react';
import cn from 'classnames';

import Sprite from 'resources/svg/icons-sprite.svg';

import s from './s.module.scss';

export type LogoIconNames = 'barnbridge';

export type TokenIconNames = 'bond-square-token' | 'bond-add-token';

export type IconNames =
  | LogoIconNames
  | TokenIconNames
  | 'arrow-back'
  | 'down-arrow-circle'
  | 'plus-circle'
  | 'refresh'
  | 'notification'
  | 'chevron-right'
  | 'close-circle-outlined'
  | 'check-circle-outlined'
  | 'history-circle-outlined'
  | 'close'
  | 'warning-outlined'
  | 'warning-circle-outlined'
  | 'gear'
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
  | 'arrow-top-right-thin'
  | 'arrow-bottom-right-thin'
  | 'handshake-outlined'
  | 'stamp-outlined'
  | 'circle-plus-outlined'
  | 'circle-minus-outlined'
  | 'senior_tranche'
  | 'junior_tranche'
  | 'senior-side'
  | 'junior-side'
  | 'senior_tranche_simplified'
  | 'junior_tranche_simplified'
  | 'withdrawal_regular'
  | 'withdrawal_instant'
  | 'statistics'
  | 'filter'
  | 'tx-progress'
  | 'tx-success'
  | 'tx-failure'
  | 'burger'
  | 'hourglass'
  | 'history'
  | 'piggybank'
  | 'file'
  | 'add-file'
  | 'file-added'
  | 'file-deleted'
  | 'file-clock'
  | 'file-times'
  | 'wallet'
  | 'handshake'
  | 'padlock-unlock'
  | 'stopwatch'
  | 'judge'
  | 'certificate'
  | 'chart-up'
  | 'apy-up'
  | 'chart'
  | 'queue'
  | 'stake'
  | 'finance'
  | 'balance'
  | 'vertical-dots'
  | 'dropdown'
  | 'arrow-backward'
  | 'arrow-forward'
  | 'science'
  | 'building'
  | 'internet'
  | 'checkbox-checked'
  | 'checkbox'
  | 'loader'
  | 'insured'
  | 'warn-circle';

export type IconProps = {
  name: IconNames;
  width?: number | string;
  height?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'inherit';
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: CSSProperties;
};

const Icon: React.FC<IconProps> = props => {
  const { name, width = 24, height = 24, rotate, color, className, style, ...rest } = props;

  return (
    <svg
      className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
      width={width}
      height={height ?? width}
      style={style}
      {...rest}>
      {name && <use xlinkHref={`${name.indexOf('static/') === 0 ? '' : Sprite}#icon__${name}`} />}
    </svg>
  );
};

export default Icon;
