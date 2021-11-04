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
  | 'calendar'
  | 'delegated-by-me'
  | 'voting-power'
  | 'bonus'
  | 'delegated'
  | 'percentage'
  | 'external'
  | 'burger'
  | 'search'
  | 'cards-view'
  | 'list-view'
  | 'twitter'
  | 'discord'
  | 'github'
  | 'circle-arrow'
  | 'menu-faucet'
  | 'menu-yf'
  | 'menu-dao'
  | 'menu-sy'
  | 'menu-sa'
  | 'menu-se'
  | 'menu-docs'
  | 'menu-theme-light'
  | 'menu-theme-dark'
  | 'menu-theme-auto';

export type IconProps = {
  name: IconNames;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'icon';
  rotate?: number;
  static?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon: React.FC<IconProps> = props => {
  const { name, size = 24, rotate = 0, color, static: isStatic = false, className, style = {}, ...rest } = props;

  return (
    <svg
      className={classNames(s.component, className, {
        [s[`color-${color}`]]: Boolean(color),
      })}
      width={size}
      height={size}
      style={{
        ...(rotate % 360 === 0 ? { transform: `rotate(${rotate}deg)` } : {}),
        ...style,
      }}
      {...rest}>
      {isStatic ? (
        <use href={`#icon__${name}`} />
      ) : (
        <use href={`${process.env.PUBLIC_URL}/icons-sprite.svg#icon__${name}`} />
      )}
    </svg>
  );
};
