import { Route, Switch } from 'react-router-dom';
import { Text } from 'components/custom/typography';
import Icons from 'components/custom/icon';
import Button from 'components/antd/button';
import ConnectedWallet from 'wallets/components/connected-wallet';
import Burger from '@animated-burgers/burger-squeeze';
import '@animated-burgers/burger-squeeze/dist/styles.css';

import s from './styles.module.scss';
import { useGeneral } from 'components/providers/general-provider';

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral()

  return (
    <div className={s.component}>
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icons name="burger" />
        {/* <Burger isOpen={navOpen} /> */}
      </Button>
      <Icons name="bond-square-token" className={s.logo} />
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
