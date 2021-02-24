import '@animated-burgers/burger-squeeze/dist/styles.css';

import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import Burger from '@animated-burgers/burger-squeeze';
import cx from 'classnames';

import Button from 'components/antd/button';
import FadeBlock from 'components/custom/fade-block';
import Grid from 'components/custom/grid';
import Icons, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.scss';

type MobileMenuLinkProps = {
  path: string;
  icon: IconNames;
  label: string;
};

const MobileMenuLink: React.FC<MobileMenuLinkProps> = props => {
  const { path, icon, label } = props;

  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({ path, exact: path === '/' }));

  function handleClick() {
    history.push(path);
  }

  return (
    <Button type="link" className={s.link} onClick={handleClick}>
      {isActivePath && <div className={s.active} />}
      <Grid flow="col" gap={24}>
        <Icons name={icon} />
        <Text type="p2" weight="semibold">
          {label}
        </Text>
      </Grid>
    </Button>
  );
};

const MobileMenu: React.FC = () => {
  const { toggleDarkTheme, isDarkTheme } = useTheme();
  const { navOpen, setNavOpen } = useGeneral();
  const location = useLocation();
  // const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { classList } = document.body;

    if (navOpen) {
      if (!classList.contains('mobile-menu-open')) {
        classList.add('mobile-menu-open');
      }
    } else {
      if (classList.contains('mobile-menu-open')) {
        classList.remove('mobile-menu-open');
      }
    }
  }, [navOpen]);

  React.useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  function handleMenuClick() {
    setNavOpen(prevState => !prevState);
  }

  function handleThemeToggle() {
    toggleDarkTheme();
  }

  return (
    <div className={cx(s.component, navOpen && s.isOpen)}>
      <Grid flow="col" gap={24} align="center" className={s.header}>
        <Button type="link" className={s.burger} onClick={handleMenuClick}>
          <Burger isOpen={navOpen} />
        </Button>
        <Grid flow="col" gap={8}>
          <Icons name="bond-square-token" />
          <Icons name="barnbridge" width={113} />
        </Grid>
      </Grid>
      <div className={s.mask} />
      <Grid flow="row" align="start" justify="space-between" className={s.list}>
        <Grid flow="row" gap={24} align="start" width="100%">
          <FadeBlock visible={navOpen}>
            <MobileMenuLink path="/yield-farming" icon="savings-outlined" label="Pools" />
          </FadeBlock>
          <FadeBlock visible={navOpen}>
            <MobileMenuLink path="/governance" icon="bank-outlined" label="Voting" />
          </FadeBlock>
          <FadeBlock visible={navOpen}>
            <MobileMenuLink path="/smart-yield" icon="paper-bill-outlined" label="Bonds" />
          </FadeBlock>
        </Grid>

        <FadeBlock visible={navOpen}>
          <Button type="link" className={s.link} onClick={handleThemeToggle}>
            <Grid flow="col" gap={24}>
              <Icons name={isDarkTheme ? 'sun' : 'moon'} />
              <Text type="p2" weight="semibold">
                {!isDarkTheme ? 'Dark' : 'Light'} Theme
              </Text>
            </Grid>
          </Button>
        </FadeBlock>
      </Grid>
    </div>
  );
};

export default MobileMenu;
