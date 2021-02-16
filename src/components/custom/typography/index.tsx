import React from 'react';
import cx from 'classnames';

import Tooltip from 'components/antd/tooltip';

import s from './styles.module.scss';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'purple';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
};

function classNamesFromProps(props: CommonProps) {
  const { bold, semiBold, color, align, ellipsis, wrap, className } = props;

  return cx(
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
  const classNames = cx(s.heading, classNamesFromProps(props));

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
  const classNames = cx(s.paragraph, s[type], classNamesFromProps(props));

  return (
    <p className={classNames}>
      {children}
    </p>
  );
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FC<LabelProps> = props => {
  const { type, children } = props;
  const classNames = cx(s.label, s[type], classNamesFromProps(props));

  return (
    <label className={classNames}>
      {children}
    </label>
  );
};

export type SmallProps = CommonProps;

export const Small: React.FC<SmallProps> = props => {
  const { children } = props;
  const classNames = cx(s.small, classNamesFromProps(props));

  return (
    <small className={classNames}>
      {children}
    </small>
  );
};

export type TextProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p' | 'div' | 'span' | 'small';
  type: 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'lb1' | 'lb2' | 'small';
  weight?: 'semibold' | 'bold';
  bold?: boolean;
  semiBold?: boolean;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'purple';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
};

export const Text: React.FC<TextProps> = React.memo(props => {
  const {
    tag = 'div',
    type,
    weight,
    bold,
    semiBold,
    color,
    align,
    ellipsis,
    wrap,
    className,
    children,
    ...textProps
  } = props;

  return React.createElement(
    tag,
    {
      className: cx(
        s.text,
        s[type],
        bold && s.bold,
        semiBold && s.semiBold,
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
};

export const Hint: React.FC<HintProps> = props => {
  const { text, children } = props;

  return text ? (
    <div className={s.hint}>
      <span>{children}</span>
      <Tooltip type="info" title={text} className={s.tooltip} />
    </div>
  ) : (
    <>{children}</>
  );
};
