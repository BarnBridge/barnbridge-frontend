import classNames from 'classnames';

import s from './s.module.scss';

export type IconNames =
  | 'certificate'
  | 'chart-up'
  | 'graph-up'
  | 'timer'
  | 'judge'
  | 'file-add'
  | 'file-check'
  | 'file-failed'
  | 'file-clock'
  | 'wallet2'
  | 'tokens'
  | 'proposal-canceled'
  | 'lock'
  | 'queue'
  | 'gear'
  | 'hourglass2'
  | 'pending'
  | 'clock'
  | 'chart3'
  | 'stake'
  | 'error'
  | 'check-circle'
  | 'info'
  | 'danger'
  | 'dropdown'
  | 'dropdown-active'
  | 'minus'
  | 'plus'
  | 'check'
  | 'close'
  | 'arrow'
  | 'chevron'
  | 'menu-toggle'
  | 'menu-hide'
  | 'add'
  | 'status'
  | 'network'
  | 'filter'
  | 'insured'
  | 'redeem'
  | 'yield-farming'
  | 'governance'
  | 'smart-yield'
  | 'smart-alpha'
  | 'smart-exposure'
  | 'docs'
  | 'auto'
  | 'light-mode'
  | 'dark-mode'
  | 'overview'
  | 'wallet'
  | 'proposals'
  | 'pairs'
  | 'signal'
  | 'forum'
  | 'treasury'
  | 'pools'
  | 'mainnet'
  | 'fiat'
  | 'mint'
  | 'testnet'
  | 'vertical-menu'
  | 'menu'
  | 'hourglass'
  | 'loader'
  | 'bell'
  | 'gear'
  | 'calendar'
  | 'delegated-by-me'
  | 'voting-power'
  | 'bonus'
  | 'delegated'
  | 'percentage'
  | 'external'
  | 'burger';

export type IconProps = {
  name: IconNames;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'icon';
  rotate?: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon: React.FC<IconProps> = props => {
  const { name, size = 24, rotate, color, className, style, ...rest } = props;

  return (
    <svg
      className={classNames(s.component, className, {
        [s[`color-${color}`]]: color,
        [s[`rotate-${rotate}`]]: rotate,
      })}
      width={size}
      height={size}
      style={style}
      {...rest}>
      <use xlinkHref={`${process.env.PUBLIC_URL}/icons-sprite.svg#icon__${name}`} />
    </svg>
  );
};
