import React from 'react';

export type IconBubbleProps = {
  name: string;
  className?: string;
  style?: Object;
  width: number;
  height: number;
  notificationSize?: number;
  notificationGap?: number;
};

const IconNotification: React.FunctionComponent<IconBubbleProps> = props => {
  const {
    name,
    style = {},
    width = 24,
    height = 24,
    notificationSize = 10,
    notificationGap = 2,
    children,
    ...rest
  } = props;

  return (
    <svg role="none" style={{ width, height, ...style }} {...rest}>
      <mask id="circle">
        <rect width={width} height={height} fill="white" />
        <circle
          cx={width - notificationSize / 2}
          cy={notificationSize / 2}
          fill="black"
          r={notificationSize / 2 + notificationGap}
        />
      </mask>
      <g mask="url(#circle)">{children}</g>
      <circle
        cx={width - notificationSize / 2}
        cy={notificationSize / 2}
        fill="var(--theme-red-color)"
        r={notificationSize / 2}
      />
    </svg>
  );
};

export default IconNotification;
