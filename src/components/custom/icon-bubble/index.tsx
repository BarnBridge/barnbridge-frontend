import React, { CSSProperties } from 'react';

import Sprite from 'resources/svg/icons-sprite.svg';

export type IconBubbleProps = {
  name: string;
  bubbleName: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

let uuid = 0;

const IconBubble: React.FC<IconBubbleProps> = props => {
  const { name, bubbleName, width = 40, height, className, style } = props;
  const id = `ib-${uuid++}`;

  return (
    <svg width={width} height={height ?? width} className={className} style={style}>
      <mask id={id}>
        <circle cx="50%" cy="50%" r="50%" fill="white" />
        <circle cx="75%" cy="25%" r="30%" fill="black" />
      </mask>
      <g mask={`url(#${id})`}>
        <use xlinkHref={`${Sprite}#icon__${name}`} />
      </g>
      <use xlinkHref={`${Sprite}#icon__${bubbleName}`} width="50%" height="50%" x="50%" y="0" />
    </svg>
  );
};

export default IconBubble;
