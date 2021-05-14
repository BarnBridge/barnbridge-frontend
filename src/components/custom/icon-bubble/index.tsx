import React, { CSSProperties } from 'react';

import Sprite from 'resources/svg/icons-sprite.svg';

export type IconBubbleProps = {
  name?: string;
  bubbleName?: string;
  secondBubbleName?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

let uuid = 0;

const IconBubble: React.FC<IconBubbleProps> = props => {
  uuid += 1;

  const { name, bubbleName, secondBubbleName, width = 40, height, className, style } = props;
  const id = `ib-${uuid}`;

  if (!name) {
    return null;
  }

  return (
    <svg width={width} height={height ?? width} className={className} style={style}>
      <mask id={id}>
        <circle cx="50%" cy="50%" r="50%" fill="white" />
        {bubbleName && <circle cx="77.5%" cy="22.5%" r="25%" fill="black" />}
        {secondBubbleName && <circle cx="77.5%" cy="77.5%" r="25%" fill="black" />}
      </mask>
      <g mask={`url(#${id})`}>
        <use xlinkHref={`${name.indexOf('static/') === 0 ? '' : Sprite}#icon__${name}`} />
      </g>
      {bubbleName && (
        <use
          xlinkHref={`${bubbleName.indexOf('static/') === 0 ? '' : Sprite}#icon__${bubbleName}`}
          width="45%"
          height="45%"
          x="55%"
          y="0"
        />
      )}
      {secondBubbleName && (
        <use
          xlinkHref={`${secondBubbleName.indexOf('static/') === 0 ? '' : Sprite}#icon__${secondBubbleName}`}
          width="45%"
          height="45%"
          x="55%"
          y="55%"
        />
      )}
    </svg>
  );
};

export default IconBubble;
