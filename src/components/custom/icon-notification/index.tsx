import React from 'react';
import { nanoid } from 'nanoid';

export type IconBubbleProps = {
  bubble: boolean;
  className?: string;
  style?: Object;
  width: number;
  height: number;
  notificationSize?: number;
  notificationGap?: number;
};

const IconNotification: React.FunctionComponent<IconBubbleProps> = props => {
  const {
    bubble,
    style = {},
    width = 24,
    height = 24,
    notificationSize = 10,
    notificationGap = 2,
    children,
    ...rest
  } = props;

  const id = React.useMemo(() => nanoid(), []);

  return (
    <svg role="none" style={{ width, height, ...style }} {...rest}>
      <mask id={id}>
        <rect width={width} height={height} fill="white" />
        <circle
          cx={width - notificationSize / 2}
          cy={notificationSize / 2}
          fill="black"
          r={notificationSize / 2 + notificationGap}
        />
      </mask>
      <g mask={bubble ? `url(#${id})` : ''}>{children}</g>
      {bubble && (
        <circle
          cx={width - notificationSize / 2}
          cy={notificationSize / 2}
          fill="var(--theme-red-color)"
          r={notificationSize / 2}
        />
      )}
    </svg>
  );
};

export default IconNotification;
