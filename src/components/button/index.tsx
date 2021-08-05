import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import { Icon, IconNames, IconProps } from 'components/icon';

import s from './s.module.scss';

interface CommonProps {
  variation: 'primary' | 'secondary' | 'ghost' | 'ghost-alt' | 'text' | 'text-alt' | 'link';
  size?: 'small' | 'normal' | 'big';
  icon?: IconNames;
  iconPosition?: 'right' | 'left' | 'only';
  iconRotate?: IconProps['rotate'];
  loading?: boolean;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  loading,
  ...rest
}) => {
  let iconSize: 16 | 24;
  switch (size) {
    case 'small':
      iconSize = 16;
      break;
    case 'normal':
      iconSize = 24;
      break;
    case 'big':
      iconSize = 24;
      break;
  }

  const iconToDisplay = loading ? 'loader' : icon;

  return (
    <button
      {...rest}
      className={classNames(s[variation], s[size], {
        [s.iconOnly]: icon && iconPosition === 'only',
      })}>
      {iconToDisplay && iconPosition === 'left' ? (
        <Icon
          name={iconToDisplay}
          rotate={iconRotate}
          size={iconSize}
          style={{ marginRight: 8 }}
          className={classNames({
            [s.spinner]: loading,
          })}
        />
      ) : null}
      {iconToDisplay && iconPosition === 'only' ? (
        <Icon
          name={iconToDisplay}
          rotate={iconRotate}
          size={iconSize}
          className={classNames({
            [s.spinner]: loading,
          })}
        />
      ) : (
        children
      )}
      {iconToDisplay && iconPosition === 'right' ? (
        <Icon
          name={iconToDisplay}
          rotate={iconRotate}
          size={iconSize}
          style={{ marginLeft: 8 }}
          className={classNames({
            [s.spinner]: loading,
          })}
        />
      ) : null}
    </button>
  );
};

type LinkProps = RouterLinkProps & CommonProps;

export const Link: React.FC<LinkProps> = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  ...rest
}) => {
  let iconSize: 16 | 24;
  switch (size) {
    case 'small':
      iconSize = 16;
      break;
    case 'normal':
      iconSize = 24;
      break;
    case 'big':
      iconSize = 24;
      break;
  }

  return (
    <RouterLink
      {...rest}
      className={classNames(s[variation], s[size], {
        [s.iconOnly]: icon && iconPosition === 'only',
      })}>
      {icon && iconPosition === 'left' ? (
        <Icon name={icon} rotate={iconRotate} size={iconSize} style={{ marginRight: 8 }} />
      ) : null}
      {icon && iconPosition === 'only' ? <Icon name={icon} rotate={iconRotate} size={iconSize} /> : children}
      {icon && iconPosition === 'right' ? (
        <Icon name={icon} rotate={iconRotate} size={iconSize} style={{ marginLeft: 8 }} />
      ) : null}
    </RouterLink>
  );
};
