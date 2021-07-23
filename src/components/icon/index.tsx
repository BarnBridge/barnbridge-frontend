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
  | 'arrow-right'
  | 'arrow-left'
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
  | 'external';

type IconProps = {
  name: IconNames;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'icon';
  // rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon: React.FC<IconProps> = props => {
  const {
    name,
    size = 24,
    // rotate,
    color,
    className,
    style,
    ...rest
  } = props;

  return (
    <svg
      className={classNames(s.component, className, {
        [s[`${color}-color`]]: color,
      })}
      width={size}
      height={size}
      style={style}
      {...rest}>
      <use xlinkHref={`icons-sprite.svg#icon__${name}`} />
    </svg>
  );
};
