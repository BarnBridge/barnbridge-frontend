import React, { CSSProperties } from 'react';

import Sprite from 'resources/svg/icons-sprite.svg';

export type IconBubbleProps = {
  icon1?: string;
  icon2?: string;
  size?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
};

let uuid = 0;

const IconPair: React.FC<IconBubbleProps> = props => {
  uuid += 1;

  const { icon1, icon2, size = 40, gap = 2, className, style } = props;
  const id = `ib-${uuid}`;

  if (!icon1 || !icon2) {
    return null;
  }

  const iconSize = size * 0.75;
  const iconIndent = size - iconSize;
  const cutSize = iconSize / 2 + gap;

  return (
    <svg width={size} height={size} className={className} style={style}>
      <mask id={id}>
        <rect width={size} height={size} fill="white" />
        <circle cx={iconSize / 2} cy={iconSize / 2 + iconIndent} r={cutSize} fill="black" />
      </mask>
      <use xlinkHref={`${Sprite}#icon__${icon1}`} width={iconSize} height={iconSize} x="0" y={iconIndent} />
      <g mask={`url(#${id})`}>
        <use xlinkHref={`${Sprite}#icon__${icon2}`} width={iconSize} height={iconSize} x={iconIndent} y="0" />
      </g>
    </svg>
  );
};

export default IconPair;
