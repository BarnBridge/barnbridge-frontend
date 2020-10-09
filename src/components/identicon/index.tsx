import React from 'react';
import IdenticonJS from 'identicon.js';

export type IdenticonProps = {
  className?: string;
  address?: string;
};

const Identicon: React.FunctionComponent<IdenticonProps> = props => {
  return React.useMemo(() => {
    const address = props.address ?? '000000000000000';
    const icon = new IdenticonJS(address, {
      format: 'svg',
    });
    return (
      <img className={props.className} alt={address}
           src={`data:image/svg+xml;base64,${icon.toString()}`}
      />
    );
  }, [props.address, props.className]);
};

export default Identicon;
