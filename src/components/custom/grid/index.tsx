import React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export type SupportedFlow = 'row' | 'col';
export type SupportedGapSizes = 0 | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64;
export type SupportedAlign = 'start' | 'center' | 'end';
export type SupportedJustify = 'start' | 'center' | 'end' | 'space-between';

export type GridProps = {
  className?: string;
  flow?: SupportedFlow;
  rowsTemplate?: string;
  colsTemplate?: string;
  align?: SupportedAlign;
  justify?: SupportedJustify;
  gap?: SupportedGapSizes | [SupportedGapSizes, SupportedGapSizes];
};

const Grid: React.FunctionComponent<GridProps> = props => {
  const {
    className,
    flow,
    gap,
    rowsTemplate,
    colsTemplate,
    align,
    justify,
    children,
  } = props;

  const [rowGap = 0, colGap = rowGap] = ([] as number[]).concat(gap ?? 0);

  return (
    <div
      className={cx(
        s.grid,
        flow && s[flow],
        colGap > 0 && s[`row-gap-${colGap}`],
        rowGap > 0 && s[`col-gap-${rowGap}`],
        align && s[`align-${align}`],
        justify && s[`justify-${justify}`],
        className,
      )}
      style={{
        gridTemplateRows: rowsTemplate,
        gridTemplateColumns: colsTemplate,
      }}>
      {children}
    </div>
  );
};

export default Grid;
