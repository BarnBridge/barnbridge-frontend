import React from 'react';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import Icons from 'components/custom/icon';

import s from './styles.module.scss';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
};

function classNamesFromProps(props: CommonProps) {
  const { bold, semiBold, color, align, ellipsis, wrap, className } = props;

  return cn(
    bold && s.bold,
    semiBold && s.semiBold,
    color && s[`${color}-color`],
    align && `text-${align}`,
    ellipsis && 'text-ellipsis',
    wrap && 'text-wrap',
    className,
  );
}

export type HeadingProps = CommonProps & {
  type: 'h1' | 'h2' | 'h3';
};

export const Heading: React.FC<HeadingProps> = props => {
  const { type, children } = props;
  const classNames = cn(s.heading, classNamesFromProps(props));

  return React.createElement(
    type,
    {
      className: classNames,
    },
    children,
  );
};

export type ParagraphProps = CommonProps & {
  type: 'p1' | 'p2';
};

export const Paragraph: React.FC<ParagraphProps> = props => {
  const { type, children } = props;
  const classNames = cn(s.paragraph, s[type], classNamesFromProps(props));

  return <p className={classNames}>{children}</p>;
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FC<LabelProps> = props => {
  const { type, children } = props;
  const classNames = cn(s.label, s[type], classNamesFromProps(props));

  return <label className={classNames}>{children}</label>;
};

export type SmallProps = CommonProps;

export const Small: React.FC<SmallProps> = props => {
  const { children } = props;
  const classNames = cn(s.small, classNamesFromProps(props));

  return <small className={classNames}>{children}</small>;
};

export type TextProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p' | 'div' | 'span' | 'small';
  type: 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'lb1' | 'lb2' | 'small';
  weight?: 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
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
        wrap && 'text-wrap',
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
};

export const Hint: React.FC<HintProps> = props => {
  const { text, className, children } = props;

  return text ? (
    <div className={cn(s.hint, className)}>
      <span>{children}</span>
      <Tooltip title={text} className={s.tooltip}>
        <Icons name="info-outlined" width={16} height={16} />
      </Tooltip>
    </div>
  ) : (
    <>{children}</>
  );
};
