import { ReactElement } from 'react';
import classNames from 'classnames';

import { Text } from 'components/custom/typography';
import { Icon, IconNames } from 'components/icon';

import s from './s.module.scss';

interface AlertPropsType {
  type: 'info' | 'warning' | 'error';
  className?: string;
  title?: ReactElement;
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

export const Alert: React.FC<AlertPropsType> = ({ type, className, children, title }) => {
  return (
    <div className={classNames(s.alert, s[type], className)}>
      <Icon name={getIconName(type)} size={24} className="mr-16" />
      <div>
        {title ? (
          <Text type="body1" weight="semibold" className="mb-4">
            {title}
          </Text>
        ) : null}
        {children ? (
          <Text type="body2" weight="medium">
            {children}
          </Text>
        ) : null}
      </div>
    </div>
  );
};
