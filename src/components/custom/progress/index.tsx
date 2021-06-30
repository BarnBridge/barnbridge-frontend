import { formatPercent } from 'web3/utils';

import s from './s.module.scss';

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
      className={s.progress}
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
