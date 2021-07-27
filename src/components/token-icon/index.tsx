import { useMemo } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import s from './s.module.scss';

export type TokenIconNames =
  | 'aave'
  | 'stkaave'
  | 'cream'
  | 'bond'
  | 'compound'
  | 'cream'
  | 'yearn'
  | 'polygon'
  | 'bond'
  | 'usdc'
  | 'dai'
  | 'susd'
  | 'eth'
  | 'wbtc'
  | 'gusd'
  | 'usdt'
  | 'sy-pools'
  | 'unknown'
  | 'weth'
  | 'fiat'
  | 'usd';

type TokenIconProps = {
  name: TokenIconNames;
  bubble1Name?: TokenIconNames;
  bubble2Name?: TokenIconNames;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  outline?: 'green' | 'purple';
};

const staticNames: TokenIconNames[] = ['aave', 'stkaave', 'cream', 'bond'];

const svgPath = 'token-icons-sprite.svg';

export const TokenIcon: React.FC<TokenIconProps> = props => {
  const { name, size = 24, className, style, bubble1Name, bubble2Name, outline, ...rest } = props;

  const id = useMemo(nanoid, []);

  return (
    <svg className={className} width={size} height={size} style={style} {...rest}>
      <mask id={id}>
        <circle cx="50%" cy="50%" r="50%" fill="white" />
        {bubble1Name && <circle cx="77.5%" cy="22.5%" r="25%" fill="black" />}
        {bubble2Name && <circle cx="77.5%" cy="77.5%" r="25%" fill="black" />}
      </mask>
      <mask id={`${id}-outline`}>
        <circle cx="50%" cy="50%" r="50%" fill="black" />
        <circle cx="50%" cy="50%" r="44%" fill="white" />
      </mask>
      <g mask={`url(#${id})`}>
        <g mask={outline ? `url(#${id}-outline)` : ''}>
          <use xlinkHref={`${staticNames.includes(name) ? '' : svgPath}#icon__${name}`} />
        </g>
        {outline ? (
          <circle
            cx="50%"
            cy="50%"
            r="50%"
            fill="none"
            stroke-width="4%"
            className={classNames({
              [s[`${outline}-outline`]]: outline,
            })}
          />
        ) : null}
      </g>

      {bubble1Name && (
        <use
          xlinkHref={`${staticNames.includes(bubble1Name) ? '' : svgPath}#icon__${bubble1Name}`}
          width="45%"
          height="45%"
          x="55%"
          y="0"
        />
      )}
      {bubble2Name && (
        <use
          xlinkHref={`${staticNames.includes(bubble2Name) ? '' : svgPath}#icon__${bubble2Name}`}
          width="45%"
          height="45%"
          x="55%"
          y="55%"
        />
      )}
    </svg>
  );
};

export type TokenPairProps = {
  name1: TokenIconNames;
  name2: TokenIconNames;
  size?: number;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const TokenIconPair: React.FC<TokenPairProps> = props => {
  const { name1, name2, size = 40, gap = 2, className, style } = props;
  const id = useMemo(nanoid, []);

  if (!name1 || !name2) {
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
      <use
        xlinkHref={`${staticNames.includes(name1) ? '' : svgPath}#icon__${name1}`}
        width={iconSize}
        height={iconSize}
        x="0"
        y={iconIndent}
      />
      <g mask={`url(#${id})`}>
        <use
          xlinkHref={`${staticNames.includes(name2) ? '' : svgPath}#icon__${name2}`}
          width={iconSize}
          height={iconSize}
          x={iconIndent}
          y="0"
        />
      </g>
    </svg>
  );
};
