import React from 'react';
import classNames from 'classnames';
import { formatPercent } from 'web3/utils';

import s from './s.module.scss';

export const Progress: React.FC<{
  value: number;
  target?: number;
  color?: 'green' | 'red' | 'blue-green';
  background?: string;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ value, target, color, background, height = 8, className, style }) => {
  return (
    <div
      className={classNames(
        s.wrap,
        {
          [s[`color-${color}`]]: color,
          [s[`background-${background}`]]: background,
          [s.target]: target,
          [s.passedTarget]: target && value > target,
        },
        className,
      )}
      style={
        {
          '--target-progress': target,
          '--progress-height': height,
          ...style,
        } as React.CSSProperties
      }>
      <progress
        value={value}
        max={100}
        className={classNames(s.progress, {
          [s[`color-${color}`]]: color,
          [s[`background-${background}`]]: background,
        })}
      />
    </div>
  );
};

type TranchePercentageProgressPropsType = {
  target: number;
  value: number;
  backgroundColor?: string;
  progressColor?: string;
};

export const TranchePercentageProgress: React.FC<TranchePercentageProgressPropsType> = ({
  target,
  value,
  backgroundColor = '#627EEA',
  progressColor = '#F7931A',
}) => {
  let currentColor = 'transparent';
  if (value < target) {
    currentColor = progressColor;
  }
  if (value > target) {
    currentColor = backgroundColor;
  }

  return (
    <progress
      max="100"
      value={target * 100}
      className={s.tranchePercentageProgress}
      style={
        {
          '--background-color': backgroundColor,
          '--progress-color': progressColor,
          '--current-color': currentColor,
          '--current-progress': value * 100,
          '--target-progress': target * 100,
        } as React.CSSProperties
      }>
      {formatPercent(target)}
    </progress>
  );
};
