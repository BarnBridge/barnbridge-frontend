import React from 'react';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';

import s from './s.module.scss';

export type TextProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p' | 'div' | 'span' | 'small' | 'strong';
  type: 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'lb1' | 'lb2' | 'small';
  weight?: 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'purple' | 'yellow';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  title?: string;
};

export const Text: React.FC<TextProps> = React.memo(props => {
  const { tag = 'div', type, weight, color, align, ellipsis, wrap, className, children, ...textProps } = props;

  return React.createElement(
    tag,
    {
      className: cn(
        s.text,
        s[type],
        weight && s[`weight-${weight}`],
        color && s[`${color}-color`],
        align && `text-${align}`,
        ellipsis && 'text-ellipsis',
        wrap === true && 'text-wrap',
        wrap === false && 'text-nowrap',
        className,
      ),
      ...textProps,
    },
    children,
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
        <span>
          <Icon name="info-outlined" width={16} height={16} className={s.icon} />
        </span>
      </Tooltip>
    </div>
  );
};
