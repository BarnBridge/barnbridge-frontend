import React from 'react';
import cx from 'classnames';

import InfoTooltip from 'components/info-tooltip';

import s from './styles.module.scss';

export type FieldProps = {
  label: string;
  hint?: string;
  className?: string;
};

const Field: React.FunctionComponent<FieldProps> = props => {
  const { label, hint, className, children } = props;

  return (
    <div className={cx(s.component, className)}>
      <label className={s.label}>
        {label}
        {hint && <InfoTooltip title={hint} />}
      </label>
      {children}
    </div>
  );
};

export default Field;
