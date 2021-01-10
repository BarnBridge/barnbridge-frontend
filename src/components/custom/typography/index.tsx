import React from 'react';
import cx from 'classnames';

import { Colors } from 'styles/colors';

import s from './styles.module.scss';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  color?: Colors;
  className?: string;
};

function classNamesFromProps(props: CommonProps) {
  const { bold, semiBold, color, className } = props;

  return cx(
    bold && s.bold,
    semiBold && s.semiBold,
    color && `clr-${color}`,
    className,
  );
}

export type HeadingProps = CommonProps & {
  type: 'h1' | 'h2' | 'h3';
};

export const Heading: React.FunctionComponent<HeadingProps> = props => {
  const { type, children } = props;

  return React.useMemo(() => {
    return React.createElement(type, {
      className: cx(s.heading, classNamesFromProps(props)),
    }, children);
  }, [type]);
};

export type ParagraphProps = CommonProps & {
  type: 'p1' | 'p2';
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = props => {
  const { type, children } = props;

  return (
    <p className={cx(s.paragraph, s[type], classNamesFromProps(props))}>
      {children}
    </p>
  );
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FunctionComponent<LabelProps> = props => {
  const { type, children } = props;

  return (
    <label className={cx(s.label, s[type], classNamesFromProps(props))}>
      {children}
    </label>
  );
};

export type SmallProps = CommonProps;

export const Small: React.FunctionComponent<SmallProps> = props => {
  const { children } = props;

  return (
    <small className={cx(s.small, classNamesFromProps(props))}>
      {children}
    </small>
  );
};
