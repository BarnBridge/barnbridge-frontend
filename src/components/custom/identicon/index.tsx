import React from 'react';
import cn from 'classnames';
import IdenticonJS from 'identicon.js';

import s from './s.module.scss';

export type IdenticonProps = {
  className?: string;
  address?: string;
  width?: number;
  height?: number;
  alt?: string;
};

const EMPTY_ADDRESS = '000000000000000';

const Identicon: React.FC<IdenticonProps> = props => {
  const { address = EMPTY_ADDRESS, className, width = 24, height = 24, alt } = props;

  const icon = React.useMemo<string>(() => {
    return new IdenticonJS(address, {
      format: 'svg',
    }).toString();
  }, [address]);

  return (
    <img
      className={cn(s.component, className)}
      src={`data:image/svg+xml;base64,${icon}`}
      alt={alt ?? address}
      width={width}
      height={height}
    />
  );
};

export default Identicon;
