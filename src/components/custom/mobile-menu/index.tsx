import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import Burger from '@animated-burgers/burger-squeeze';
import cx from 'classnames';

import '@animated-burgers/burger-squeeze/dist/styles.css';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons, { IconNames } from 'components/custom/icon';
import FadeBlock from 'components/custom/fade-block';
import { Paragraph } from 'components/custom/typography';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.scss';

type MobileMenuLinkProps = {
  path: string;
  icon: IconNames;
  label: string;
};

const MobileMenuLink: React.FunctionComponent<MobileMenuLinkProps> = props => {
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
        <Paragraph type="p2" semiBold>{label}</Paragraph>
      </Grid>
    </Button>
  );
}

const MobileMenu: React.FunctionComponent = () => {
  const { toggleDarkTheme, isDarkTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { classList } = document.body;

    if (isOpen) {
      if (!classList.contains('mobile-menu-open')) {
        classList.add('mobile-menu-open');
      }
    } else {
      if (classList.contains('mobile-menu-open')) {
        classList.remove('mobile-menu-open');
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname])

  function handleMenuClick() {
    setIsOpen(prevState => !prevState);
  }

  function handleThemeToggle() {
    toggleDarkTheme();
  }

  return (
    <div className={cx(s.component, isOpen && s.isOpen)}>
      <Grid flow="col" gap={24} align="center" className={s.header}>
        <Button type="link" className={s.burger} onClick={handleMenuClick}>
          <Burger isOpen={isOpen} />
        </Button>
        <Grid flow="col" gap={8}>
          <Icons name="bond-square-token" />
          <Icons name="barnbridge" width={113} />
        </Grid>
      </Grid>
      <div className={s.mask} />
      <Grid flow="row" align="start" justify="space-between" className={s.list}>
        <Grid flow="row" gap={24} align="start" width="100%">
          <FadeBlock visible={isOpen}>
            <MobileMenuLink path="/yield-farming" icon="savings-outlined" label="Pools" />
          </FadeBlock>
          <FadeBlock visible={isOpen}>
            <MobileMenuLink path="/governance" icon="bank-outlined" label="Voting" />
          </FadeBlock>
          <FadeBlock visible={isOpen}>
            <MobileMenuLink path="/bonds" icon="paper-bill-outlined" label="Bonds" />
          </FadeBlock>
        </Grid>

        <FadeBlock visible={isOpen}>
          <Button type="link" className={s.link} onClick={handleThemeToggle}>
            <Grid flow="col" gap={24}>
              <Icons name={isDarkTheme ? 'sun' : 'moon'} />
              <Paragraph type="p2" semiBold>
                {!isDarkTheme ? 'Dark' : 'Light'} Theme
              </Paragraph>
            </Grid>
          </Button>
        </FadeBlock>
      </Grid>
    </div>
  );
};

export default MobileMenu;
