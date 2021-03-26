import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import AntdSpin, { SpinProps as AntdSpinProps } from 'antd/lib/spin';
import cn from 'classnames';

import s from './s.module.scss';

type Props = AntdSpinProps & {
  type?: 'default' | 'circle';
};

const Spin: React.FC<Props> = props => {
  const { type = 'default', className, ...spinProps } = props;

  const indicator = React.useMemo(() => {
    switch (type) {
      case 'circle':
        return <LoadingOutlined spin />;
      default:
        break;
    }

    return undefined;
  }, [type]);

  return <AntdSpin indicator={indicator} className={cn(s.spin, className)} {...spinProps} />;
};

export default Spin;
