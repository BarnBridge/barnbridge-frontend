import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Button from 'components/antd/button';
import { Badge } from 'components/custom/badge';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import config from 'config';
import ConnectedWallet from 'wallets/components/connected-wallet';

import s from './s.module.scss';

const LayoutHeader: React.FC = () => {
  const { setNavOpen } = useGeneral();

  return (
    <header className={s.component}>
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icon name="burger" />
      </Button>
      <Icon name="bond-square-token" className={s.logo} />
      <Text type="h3" weight="semibold" color="primary" className={s.title}>
        <Switch>
          <Route path="/yield-farming">Yield Farming</Route>
          <Route path="/governance">Governance</Route>
          <Route path="/smart-yield">SMART Yield</Route>
          <Route path="/smart-alpha">SMART Alpha</Route>
          <Route path="/smart-exposure">SMART Exposure</Route>
          <Route path="/faucets">Faucets</Route>
          <Route path="*">BarnBridge</Route>
        </Switch>
      </Text>
      {config.isTestnet && (
        <Badge color="blue" size="small">
          Kovan testnet
        </Badge>
      )}
      <div className="ml-auto">
        <ConnectedWallet />
      </div>
    </header>
  );
};

export default LayoutHeader;
