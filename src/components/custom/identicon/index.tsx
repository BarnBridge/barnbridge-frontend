import React from 'react';
import IdenticonJS from 'identicon.js';

export type IdenticonProps = {
  className?: string;
  address?: string;
  width?: number;
  height?: number;
  alt?: string;
};

const EMPTY_ADDRESS = '000000000000000';

const Identicon: React.FunctionComponent<IdenticonProps> = props => {
  const {address = EMPTY_ADDRESS, className, ...imgProps} = props;

  const icon = React.useMemo<string>(() => {
    return new IdenticonJS(address, {
      format: 'svg',
    }).toString();
  }, [address]);

  return (
    <img
      className={className}
      src={`data:image/svg+xml;base64,${icon}`}
      alt={address}
      {...imgProps} />
  );
};

export default Identicon;
