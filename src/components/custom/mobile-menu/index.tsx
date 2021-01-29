import React from 'react';
import * as Antd from 'antd';
import Burger from '@animated-burgers/burger-squeeze';
import cx from 'classnames';

import '@animated-burgers/burger-squeeze/dist/styles.css';

import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import FadeBlock from 'components/custom/fade-block';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.css';

const MobileMenu: React.FunctionComponent = () => {
  const { toggleDarkTheme, isDarkTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleMenuClick() {
    setIsOpen(prevState => !prevState);
  }

  function handleLinkClick() {
    setIsOpen(false);
  }

  function handleThemeToggle() {
    toggleDarkTheme();
  }

  React.useEffect(() => {
    if (isOpen) {
      if (!document.body.classList.contains('mobile-menu-open')) {
        document.body.classList.add('mobile-menu-open');
      }
    } else {
      if (document.body.classList.contains('mobile-menu-open')) {
        document.body.classList.remove('mobile-menu-open');
      }
    }
  }, [isOpen]);

  return (
    <div className={s.component}>
      <Antd.Button type="link" className={s.menuBtn} onClick={handleMenuClick}>
        <Burger className={s.burger} isOpen={isOpen} />
      </Antd.Button>
      <FadeBlock className={s.logo} visible={!isOpen}>
        <Grid flow="col" gap={8}>
          <Icons name="bond-token" />
          <Icons name="barnbridge" width={113} />
        </Grid>
      </FadeBlock>
      <div className={cx(s.mask, { [s.maskOpen]: isOpen })} />
      <div className={cx(s.menuList, { [s.menuListOpen]: isOpen })}>
        <Grid flow="col" gap={8} className={s.innerLogo}>
          <Icons name="bond-token" />
          <Icons name="barnbridge" width={113} />
        </Grid>

        <Antd.Button type="link" className={s.themeToggle} onClick={handleThemeToggle}>
          <Icons name={isDarkTheme ? 'sun' : 'moon'} />
          <FadeBlock visible={isOpen}>
            {!isDarkTheme ? 'Dark' : 'Light'} Theme
          </FadeBlock>
        </Antd.Button>
      </div>
    </div>
  );
};

export default MobileMenu;
