import React from 'react';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import ConnectedWallet from 'wallets/components/connected-wallet';

import s from './styles.module.scss';

export type LayoutHeaderProps = {
  title: React.ReactNode;
};

const LayoutHeader: React.FC<LayoutHeaderProps> = props => {
  const { title } = props;

  return (
    <Grid
      flow="col"
      align="center"
      justify="space-between"
      className={s.component}>
      <Text type="h3" weight="semibold" color="primary">
        {title}
      </Text>
      <ConnectedWallet />
    </Grid>
  );
};

export default LayoutHeader;
