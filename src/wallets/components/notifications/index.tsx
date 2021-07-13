import React from 'react';

import Grid from 'components/custom/grid';
import { Notification } from 'components/custom/notification';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/generalProvider';
import { useNotifications } from 'components/providers/notificationsProvider';
import { ReactComponent as ZeroNotificationsDarkSvg } from 'resources/svg/zero-notifications-dark.svg';
import { ReactComponent as ZeroNotificationsSvg } from 'resources/svg/zero-notifications.svg';

import s from './s.module.scss';

const Notifications: React.FC = () => {
  const { theme } = useGeneral();
  const { notifications } = useNotifications();

  if (!notifications.length) {
    return (
      <Grid flow="row" gap={24} align="center" padding={48}>
        {theme === 'dark' ? (
          <ZeroNotificationsDarkSvg width={138} height={128} />
        ) : (
          <ZeroNotificationsSvg width={138} height={128} />
        )}
        <Text type="p1" color="secondary" align="center">
          There are no notifications to show
        </Text>
      </Grid>
    );
  }

  return (
    <ul className={s.list}>
      {notifications
        .sort((a, b) => b.startsOn - a.startsOn)
        .map(n => (
          <li key={n.id}>
            <Notification n={n} />
          </li>
        ))}
    </ul>
  );
};

export default Notifications;
