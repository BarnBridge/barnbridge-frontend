import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import { Icon, IconNames, IconProps } from 'components/icon';
import { useWeb3 } from 'components/providers/web3Provider';

import s from './s.module.scss';

interface ButtonContentProps {
  size?: 'small' | 'normal' | 'big';
  icon?: IconNames;
  iconPosition?: 'right' | 'left' | 'only';
  iconRotate?: IconProps['rotate'];
  loading?: boolean;
}

const ButtonContent: React.FC<ButtonContentProps> = ({ size, icon, iconPosition, iconRotate, loading, children }) => {
  let iconSize: 16 | 24 = 24;
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
    <>
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
    </>
  );
};

interface CommonProps extends ButtonContentProps {
  variation?: 'primary' | 'secondary' | 'ghost' | 'ghost-alt' | 'text' | 'text-alt' | 'link';
  className?: string;
}

export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  loading,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={classNames(
        variation ? s[variation] : null,
        s[size],
        {
          [s.iconOnly]: icon && iconPosition === 'only',
        },
        className,
      )}>
      <ButtonContent {...{ icon, iconPosition, iconRotate, loading, children }} />
    </button>
  );
};

export type LinkProps = CommonProps & RouterLinkProps;

export const Link: React.FC<LinkProps> = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  className,
  ...rest
}) => {
  return (
    <RouterLink
      {...rest}
      className={classNames(
        variation ? s[variation] : null,
        s[size],
        {
          [s.iconOnly]: icon && iconPosition === 'only',
        },
        className,
      )}>
      <ButtonContent {...{ icon, iconPosition, iconRotate, children }} />
    </RouterLink>
  );
};

export type ExternalLinkProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  className,
  ...rest
}) => {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
      className={classNames(
        variation ? s[variation] : null,
        s[size],
        {
          [s.iconOnly]: icon && iconPosition === 'only',
        },
        className,
      )}>
      <ButtonContent {...{ icon, iconPosition, iconRotate, children }} />
    </a>
  );
};

type ExplorerAddressLinkProps = Omit<ExternalLinkProps, 'href'> & {
  address?: string;
  query?: string;
};

export const ExplorerAddressLink: React.FC<ExplorerAddressLinkProps> = props => {
  const { children, address, query = '', ...rest } = props;

  const { getEtherscanAddressUrl } = useWeb3();

  if (!address) {
    return <>{children}</>;
  }

  return (
    <ExternalLink href={`${getEtherscanAddressUrl(address)}${query}`} {...rest}>
      {children}
    </ExternalLink>
  );
};

type ExplorerTxLinkProps = Omit<ExternalLinkProps, 'href'> & {
  address?: string;
};

export const ExplorerTxLink: React.FC<ExplorerTxLinkProps> = props => {
  const { children, address, ...rest } = props;

  const { getEtherscanTxUrl } = useWeb3();

  if (!address) {
    return <>{children}</>;
  }

  return (
    <ExternalLink href={getEtherscanTxUrl(address)} {...rest}>
      {children}
    </ExternalLink>
  );
};
