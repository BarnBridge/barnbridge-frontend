import React, { useEffect } from 'react';
import cn from 'classnames';
import format from 'date-fns/format';
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';

import Icon, { IconNames } from 'components/custom/icon';
import IconNotification from 'components/custom/icon-notification';
import { Text } from 'components/custom/typography';
import { NotificationType } from 'components/providers/general-provider';

import NotificationIcon from './icon';

import s from './s.module.scss';

function getIconName(n: NotificationType): IconNames {
  switch (n.notificationType) {
    case 'proposal-created':
      return 'add-file';
    case 'abrogation-proposal-created':
      return 'add-file';
    case 'proposal-executed':
      return 'add-file';
    case 'proposal-canceled':
      return 'add-file';
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
      return colorPairs.green;
    case 'abrogation-proposal-created':
      return colorPairs.green;
    case 'proposal-executed':
      return colorPairs.blue;
    case 'proposal-canceled':
      return colorPairs.red;
    default:
      console.log(`Unsupported notification type: ${JSON.stringify(n)}`);
      return colorPairs.blue;
  }
}

function getIcon(n: NotificationType) {
  const [color, rgb] = getColors(n);
  return (
    <IconNotification name="bond-square-token" width={40} height={40} className="mr-16">
      <NotificationIcon rgbVarName={rgb}>
        <Icon name={getIconName(n)} width="24" height="24" style={{ color: `var(${color})` }} />
      </NotificationIcon>
    </IconNotification>
  );
}

function getContent(n: NotificationType) {
  return (
    <Text type="p2" weight="semibold" color="secondary">
      {n.message}
    </Text>
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
  const date = new Date(n.startsOn * 1000);

  return (
    <div className={s.n}>
      {getIcon(n)}
      <div>{getContent(n)}</div>
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
      {getIcon(n)}
      <div>{getContent(n)}</div>
      <button type="button" onClick={() => onClose(n.id)} className={s.close}>
        <Icon name="close-tiny" width="24" height="24" color="inherit" />
      </button>
    </div>
  );
};
