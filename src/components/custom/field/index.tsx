import React from 'react';
import cx from 'classnames';

import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';

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
        {hint && <Tooltip type="info" title={hint} />}
      </label>
      {children}
    </div>
  );
};

export default Field;
