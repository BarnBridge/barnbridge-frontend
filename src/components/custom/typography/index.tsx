import React from 'react';
import cx from 'classnames';

import Skeleton from 'components/antd/skeleton';

import { Colors } from 'styles/colors';

import s from './styles.module.scss';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  color?: Colors;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
  loading?: boolean;
};

function classNamesFromProps(props: CommonProps) {
  const { bold, semiBold, color, align, ellipsis, wrap, className } = props;

  return cx(
    bold && s.bold,
    semiBold && s.semiBold,
    color && `clr-${color}`,
    align && `text-${align}`,
    ellipsis && 'text-ellipsis',
    wrap && 'text-wrap',
    className,
  );
}

export type HeadingProps = CommonProps & {
  type: 'h1' | 'h2' | 'h3';
};

export const Heading: React.FunctionComponent<HeadingProps> = props => {
  const { type, loading, children } = props;
  const classNames = cx(s.heading, classNamesFromProps(props));

  return React.createElement(type, {
    className: classNames,
  }, !loading ? children : <Skeleton className={classNames} />);
};

export type ParagraphProps = CommonProps & {
  type: 'p1' | 'p2';
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = props => {
  const { type, loading, children } = props;
  const classNames = cx(s.paragraph, s[type], classNamesFromProps(props));

  return !loading ? (
    <p className={classNames}>
      {children}
    </p>
  ) : <Skeleton className={classNames} />;
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FunctionComponent<LabelProps> = props => {
  const { type, loading, children } = props;
  const classNames = cx(s.label, s[type], classNamesFromProps(props));

  return !loading ? (
    <label className={classNames}>
      {children}
    </label>
  ) : <Skeleton className={classNames} />;
};

export type SmallProps = CommonProps;

export const Small: React.FunctionComponent<SmallProps> = props => {
  const { loading, children } = props;
  const classNames = cx(s.small, classNamesFromProps(props));

  return !loading ? (
    <small className={cx(s.small, classNamesFromProps(props))}>
      {children}
    </small>
  ) : <Skeleton className={classNames} />;
};
