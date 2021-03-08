import '@animated-burgers/burger-squeeze/dist/styles.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Burger from '@animated-burgers/burger-squeeze';

import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import ConnectedWallet from 'wallets/components/connected-wallet';

import s from './s.module.scss';

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();

  return (
    <div className={s.component}>
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Burger isOpen={navOpen} />
      </Button>
      <Icon name="bond-square-token" className={s.logo} />
      <Text type="h3" weight="semibold" color="primary" className={s.title}>
        <Switch>
          <Route path="/yield-farming">Yield Farming</Route>
          <Route path="/governance">Governance</Route>
          <Route path="/smart-yield">Smart Yield</Route>
          <Route path="*">BarnBridge</Route>
        </Switch>
      </Text>
      <ConnectedWallet />
    </div>
  );
};

export default LayoutHeader;
