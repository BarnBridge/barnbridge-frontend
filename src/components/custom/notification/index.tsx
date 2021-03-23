import React, { useEffect } from 'react';
import cn from 'classnames';
import format from 'date-fns/format';
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';

import Icon, { IconNames } from 'components/custom/icon';
import IconNotification from 'components/custom/icon-notification';
import { Text } from 'components/custom/typography';
import { NotificationType, useGeneral } from 'components/providers/general-provider';

import NotificationIcon from './icon';

import s from './s.module.scss';

function getIconName(n: NotificationType): IconNames {
  switch (n.notificationType) {
    case 'proposal-created':
      return 'add-file';
    case 'proposal-activating-soon':
      return 'add-file';
    case 'proposal-canceled':
      return 'file-deleted';
    case 'proposal-voting-open':
      return 'judge';
    case 'proposal-voting-ending-soon':
      return 'judge';
    case 'proposal-outcome':
      return 'file-clock';
    case 'proposal-accepted':
      return 'file-added';
    case 'proposal-failed':
      return 'file-deleted';
    case 'proposal-queued':
      return 'add-file';
    case 'proposal-grace':
      return 'add-file';
    case 'proposal-executed':
      return 'add-file';
    case 'proposal-expired':
      return 'add-file';
    case 'abrogation-proposal-created':
      return 'file-times';
    case 'proposal-abrogated':
      return 'file-times';
    default:
      console.log(`Unsupported notification type: ${JSON.stringify(n)}`);
      return 'add-file';
  }
}

const colorPairs: Record<'green' | 'red' | 'blue', [string, string]> = {
  green: ['--theme-green-color', '--theme-green-color-rgb'],
  red: ['--theme-red-color', '--theme-red-color-rgb'],
  blue: ['--theme-blue-color', '--theme-blue-color-rgb'],
};

function getColors(n: NotificationType): [string, string] {
  switch (n.notificationType) {
    case 'proposal-created':
      return colorPairs.blue;
    case 'proposal-activating-soon':
      return colorPairs.green;
    case 'proposal-canceled':
      return colorPairs.red;
    case 'proposal-voting-open':
      return colorPairs.blue;
    case 'proposal-voting-ending-soon':
      return colorPairs.red;
    case 'proposal-outcome':
      return colorPairs.blue;
    case 'proposal-accepted':
      return colorPairs.green;
    case 'proposal-failed':
      return colorPairs.red;
    case 'proposal-queued':
      return colorPairs.green;
    case 'proposal-grace':
      return colorPairs.green;
    case 'proposal-executed':
      return colorPairs.green;
    case 'proposal-expired':
      return colorPairs.green;
    case 'abrogation-proposal-created':
      return colorPairs.blue;
    case 'proposal-abrogated':
      return colorPairs.green;
    default:
      console.log(`Unsupported notification type: ${JSON.stringify(n)}`);
      return colorPairs.blue;
  }
}

function getIcon(n: NotificationType, bubble: boolean) {
  const [color, rgb] = getColors(n);
  return (
    <IconNotification width={40} height={40} className="mr-16" bubble={bubble}>
      <NotificationIcon rgbVarName={rgb}>
        <Icon name={getIconName(n)} width="24" height="24" style={{ color: `var(${color})` }} />
      </NotificationIcon>
    </IconNotification>
  );
}

function getContent(n: NotificationType) {
  return (
    <div style={{ flexGrow: 1 }}>
      <Text type="p2" weight="semibold" color="secondary">
        {n.message}
      </Text>
    </div>
  );
}

function formatTime(date: Date): string {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }

  if (isThisWeek(date)) {
    return format(date, 'EEEEEE');
  }

  return format(date, 'dd MMM yyyy');
}

type Props = {
  n: NotificationType;
};

export const Notification: React.FC<Props> = ({ n }) => {
  const { notificationsReadUntil } = useGeneral();
  const date = new Date(n.startsOn * 1000);
  const isUnread = notificationsReadUntil ? notificationsReadUntil < n.startsOn : false;

  return (
    <div className={s.n}>
      {getIcon(n, isUnread)}
      {getContent(n)}
      <time className={s.time} dateTime={date.toJSON()} title={date.toJSON()}>
        {formatTime(date)}
      </time>
    </div>
  );
};

type ToastProps = {
  n: NotificationType;
  onClose: (id: NotificationType['id']) => void;
  timeout?: number;
};

export const Toast: React.FC<ToastProps> = ({ n, onClose, timeout }) => {
  useEffect(() => {
    if (timeout && timeout !== Infinity) {
      setTimeout(onClose, timeout, n.id);
    }
  }, [timeout]);

  return (
    <div className={cn(s.n, s.toast)}>
      {getIcon(n, false)}
      {getContent(n)}
      <button type="button" onClick={() => onClose(n.id)} className={s.close}>
        <Icon name="close-tiny" width="24" height="24" color="inherit" />
      </button>
    </div>
  );
};
