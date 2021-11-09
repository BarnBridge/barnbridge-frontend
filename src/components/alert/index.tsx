import { ReactElement } from 'react';
import classNames from 'classnames';

import { ExternalLink, Link } from 'components/button';
import { Text } from 'components/custom/typography';
import { Icon, IconNames } from 'components/icon';

import s from './s.module.scss';

type RenderLinkProps = {
  type?: 'link' | 'external';
  href: string;
  children: string;
};

const RenderLink: React.FC<RenderLinkProps> = ({ type = 'link', href, children }) => {
  // TODO: switch to raw Link and 'a', style locally link color and hover
  if (type === 'link') {
    return (
      <Link variation="link" to={href}>
        {children}
      </Link>
    );
  }

  return (
    <ExternalLink variation="link" href={href}>
      {children}
    </ExternalLink>
  );
};

interface AlertPropsType {
  type: 'info' | 'warning' | 'error';
  className?: string;
  title?: ReactElement;
  link?: RenderLinkProps;
}

function getIconName(type: AlertPropsType['type']): IconNames {
  switch (type) {
    case 'info':
      return 'info';
    case 'warning':
      return 'danger';
    case 'error':
      return 'error';
  }
}

export const Alert: React.FC<AlertPropsType> = ({ type, className, children, title, link }) => {
  return (
    <div className={classNames(s.alert, s[type], className)}>
      <Icon name={getIconName(type)} size={24} className="mr-16" />
      <div>
        {title ? (
          <Text type="p2" weight="bold" className="mb-4">
            {title}
          </Text>
        ) : null}
        {children ? (
          <Text type="p2" weight="semibold">
            {children}
          </Text>
        ) : null}
        {link ? <RenderLink {...link} /> : null}
      </div>
    </div>
  );
};
