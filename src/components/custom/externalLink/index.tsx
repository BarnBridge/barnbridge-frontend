import React from 'react';

export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: React.FC<ExternalLinkProps> = props => {
  const { children, ...rest } = props;

  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
