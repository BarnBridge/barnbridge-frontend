import React from 'react';

import Sprite from 'resources/svg/icons-sprite.svg';

export type IconBubbleProps = {
  name: string;
  bubbleName: string;
  className?: string;
  style?: Object;
};

const IconBubble: React.FC<IconBubbleProps> = props => {
  const { name, bubbleName, style = {}, ...rest } = props;

  return (
    <svg role="none" style={{ height: 40, width: 40, ...style }} {...rest}>
      <mask id="circle">
        <circle cx="20" cy="20" fill="white" r="20"></circle>
        <circle cx="30" cy="10" fill="black" r="12"></circle>
      </mask>
      <g mask="url(#circle)">
        <use xlinkHref={`${Sprite}#icon__${name}`} />
      </g>
      <use
        x="20"
        y="0"
        preserveAspectRatio="xMidYMid slice"
        width="20"
        height="20"
        xlinkHref={`${Sprite}#icon__${bubbleName}`}
        // style={{
        //   clipPath: 'circle(10px at center)',
        // }}
      />
    </svg>
  );
};

export default IconBubble;
