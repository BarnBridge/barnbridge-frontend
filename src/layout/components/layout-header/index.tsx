import React from 'react';

import ConnectedWallet from 'wallets/components/connected-wallet';

import s from 'layout/components/layout-header/styles.module.scss';

export type LayoutHeaderProps = {
  title: React.ReactNode;
};

const LayoutHeader: React.FunctionComponent<LayoutHeaderProps> = props => {
  return (
    <div className={s.component}>
      <span className={s.title}>{props.title}</span>
      <ConnectedWallet />
    </div>
  );
};

export default LayoutHeader;
