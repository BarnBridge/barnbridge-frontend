import React from 'react';
import cx from 'classnames';

import Skeleton from 'components/antd/skeleton';

import { Colors } from 'styles/colors';

import s from './styles.module.scss';
import Tooltip from '../../antd/tooltip';

type CommonProps = {
  bold?: boolean;
  semiBold?: boolean;
  block?: boolean;
  color?: Colors;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  wrap?: boolean;
  className?: string;
  loading?: boolean;
  hint?: React.ReactNode;
};

function classNamesFromProps(props: CommonProps) {
  const { bold, semiBold, block, color, align, ellipsis, wrap, className } = props;

  return cx(
    bold && s.bold,
    semiBold && s.semiBold,
    block && s.block,
    color && `clr-${color}-prior`,
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

  return React.createElement(
    type,
    {
      className: classNames,
    },
    !loading ? children : <Skeleton className={classNames} />,
  );
};

export type ParagraphProps = CommonProps & {
  type: 'p1' | 'p2';
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = props => {
  const { type, loading, hint, children } = props;
  const classNames = cx(s.paragraph, s[type], classNamesFromProps(props));

  return !loading ? (
    <p className={classNames}>
      {children}
      {hint && (
        <Tooltip type="info" title={hint} />
      )}
    </p>
  ) : (
    <Skeleton className={classNames} />
  );
};

export type LabelProps = CommonProps & {
  type: 'lb1' | 'lb2';
};

export const Label: React.FunctionComponent<LabelProps> = props => {
  const { type, loading, hint, children } = props;
  const classNames = cx(s.label, s[type], classNamesFromProps(props));

  return !loading ? (
    <label className={classNames}>
      {children}
      {hint && (
        <Tooltip type="info" title={hint} />
      )}
    </label>
  ) : (
    <Skeleton className={classNames} />
  );
};

export type SmallProps = CommonProps;

export const Small: React.FunctionComponent<SmallProps> = props => {
  const { loading, hint, children } = props;
  const classNames = cx(s.small, classNamesFromProps(props));

  return !loading ? (
    <small className={cx(s.small, classNamesFromProps(props))}>
      {children}
      {hint && (
        <Tooltip type="info" title={hint} />
      )}
    </small>
  ) : (
    <Skeleton className={classNames} />
  );
};
