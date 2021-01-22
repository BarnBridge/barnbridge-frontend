import React from 'react';
import IdenticonJS from 'identicon.js';
import cx from 'classnames';

import s from './styles.module.scss';

export type IdenticonProps = {
  className?: string;
  address?: string;
  width?: number;
  height?: number;
  alt?: string;
};

const EMPTY_ADDRESS = '000000000000000';

const Identicon: React.FunctionComponent<IdenticonProps> = props => {
  const { address = EMPTY_ADDRESS, className, width = 24, height = 24, alt } = props;

  const icon = React.useMemo<string>(() => {
    return new IdenticonJS(address, {
      format: 'svg',
    }).toString();
  }, [address]);

  return (
    <img
      className={cx(s.component, className)}
      src={`data:image/svg+xml;base64,${icon}`}
      alt={alt ?? address}
      width={width}
      height={height} />
  );
};

export default Identicon;
