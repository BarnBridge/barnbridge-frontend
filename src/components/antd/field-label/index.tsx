import React, { ReactNode } from 'react';
import classnames from 'classnames';

import { Hint, Text } from 'components/custom/typography';
import { FCx } from 'components/types.tx';

type FieldLabelProps = {
  label: ReactNode;
  hint?: ReactNode;
  extra?: ReactNode;
};

const FieldLabel: FCx<FieldLabelProps> = props => {
  const { children, className, label, hint, extra } = props;

  return (
    <div className={classnames('flex flow-row row-gap-8', className)}>
      <div className="flex flow-col col-gap-4 justify-space-between">
        <div className="flex flow-col col-gap-4 align-center">
          <Hint text={hint}>
            {typeof label === 'string' ? (
              <Text type="small" weight="semibold" color="secondary">
                {label}
              </Text>
            ) : (
              label
            )}
          </Hint>
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
};

export default FieldLabel;
