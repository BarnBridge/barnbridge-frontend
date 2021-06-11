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
      value={target}
      className={s.progress}
      style={
        {
          '--background-color': backgroundColor,
          '--progress-color': progressColor,
          '--current-color': currentColor,
          '--current-progress': value,
          '--target-progress': target,
        } as React.CSSProperties
      }>
      {target}%
    </progress>
  );
};
