import React, { ReactNode } from 'react';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import { Icon } from 'components/icon';

import s from './s.module.scss';

export type TextProps = {
  tag?: keyof JSX.IntrinsicElements;
  type: 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'lb1' | 'lb2' | 'small';
  weight?: 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'purple' | 'yellow';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  tooltip?: ReactNode;
};

export const Text: React.FC<TextProps> = React.memo(props => {
  const { tag = 'div', type, weight, color, align, ellipsis, wrap, className, children, tooltip, ...textProps } = props;

  const textComponent = React.createElement(
    tag,
    {
      className: cn(s.text, s[type], className, {
        [s.hasTooltip]: tooltip,
        [s[`weight-${weight}`]]: weight,
        [s[`${color}-color`]]: color,
        [`text-${align}`]: align,
        'text-ellipsis': ellipsis,
        'text-wrap': wrap,
        'text-nowrap': wrap === false,
      }),
      ...textProps,
    },
    children,
  );

  return tooltip ? (
    <Tooltip
      title={tooltip}
      className={cn(s.tooltip, 'text-p2', 'primary-color')}
      // overlayStyle={overlayStyle}
      // overlayInnerStyle={overlayStyle}
    >
      {textComponent}
    </Tooltip>
  ) : (
    textComponent
  );
});

export type HintProps = {
  text: React.ReactNode;
  className?: string;
  maxWidth?: number;
};

export const Hint: React.FC<HintProps> = props => {
  const { text, className, maxWidth, children } = props;

  if (!text) {
    return <>{children}</>;
  }

  const overlayStyle = {
    ...(maxWidth !== undefined && { maxWidth: `${maxWidth}px` }),
  };

  return (
    <div className={cn(s.hint, className)}>
      <span>{children}</span>
      <Tooltip
        title={text}
        className={cn(s.tooltip, 'text-p2', 'primary-color')}
        overlayStyle={overlayStyle}
        overlayInnerStyle={overlayStyle}>
        <Icon name="info" size={16} className={s.icon} color="icon" />
      </Tooltip>
    </div>
  );
};
