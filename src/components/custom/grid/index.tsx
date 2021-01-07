import React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export type GridProps = {
  className?: string;
  flow?: 'row' | 'col';
  gap?: number;
  rowsTemplate?: string;
  colsTemplate?: string;
};

const Grid: React.FunctionComponent<GridProps> = props => {
  const {
    className,
    flow = 'col',
    gap = 0,
    children,
    rowsTemplate,
    colsTemplate,
  } = props;

  const style = React.useMemo(() => {
    const r = {
      ...rowsTemplate && { gridTemplateRows: rowsTemplate },
      ...colsTemplate && { gridTemplateColumns: colsTemplate },
    };

    return Object.keys(r).length > 0 ? r : undefined;
  }, [rowsTemplate, colsTemplate]);

  return (
    <div
      className={cx(s.grid, s[flow], gap > 0 && s[`gap-${gap}`], className)}
      style={style}>
      {children}
    </div>
  );
};

export default Grid;
