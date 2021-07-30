import React, { FC } from 'react';

import { useWeb3 } from '../../providers/web3Provider';

export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: React.FC<ExternalLinkProps> = props => {
  const { children, ...rest } = props;

  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
};

type ExplorerAddressLinkProps = ExternalLinkProps & {
  address: string;
  query?: string;
};

export const ExplorerAddressLink: FC<ExplorerAddressLinkProps> = props => {
  const { children, address, query = '', ...rest } = props;

  const { getEtherscanAddressUrl } = useWeb3();

  return (
    <ExternalLink href={`${getEtherscanAddressUrl(address)}${query}`} {...rest}>
      {children}
    </ExternalLink>
  );
};

export default ExternalLink;
