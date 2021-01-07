import React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  color?: number;
  className?: string;
};

export type HeadingProps = CommonProps & {
  type: 'h1' | 'h2' | 'h3';
};

export const Heading: React.FunctionComponent<HeadingProps> = props => {
  const { type, bold, semiBold, color, className, children, ...headingProps } = props;

  return React.useMemo(() => {
    return React.createElement(type, {
      className: cx(
        s.heading,
        bold && s.bold,
        semiBold && s.semiBold,
        color && s[`clr-${color}`],
        className,
      ),
      ...headingProps,
    }, children);
  }, [type]);
};

export type ParagraphProps = CommonProps & {
  type: 'p1' | 'p2';
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = props => {
  const { type, bold, semiBold, color, className, children, ...paragraphProps } = props;

  return (
    <p className={cx(
      s.paragraph,
      s[type],
      bold && s.bold,
      semiBold && s.semiBold,
      color && s[`clr-${color}`],
      className,
    )} {...paragraphProps}>
      {children}
    </p>
  );
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FunctionComponent<LabelProps> = props => {
  const { type, bold, semiBold, color, className, children, ...labelProps } = props;

  return (
    <label className={cx(
      s.label,
      s[type],
      bold && s.bold,
      semiBold && s.semiBold,
      color && s[`clr-${color}`],
      className,
    )} {...labelProps}>
      {children}
    </label>
  );
};

export type SmallProps = CommonProps;

export const Small: React.FunctionComponent<SmallProps> = props => {
  const { bold, semiBold, color, className, children, ...smallProps } = props;

  return (
    <small className={cx(
      s.small,
      bold && s.bold,
      semiBold && s.semiBold,
      color && s[`clr-${color}`],
      className,
    )} {...smallProps}>
      {children}
    </small>
  );
};
