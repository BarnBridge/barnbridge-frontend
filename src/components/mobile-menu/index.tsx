import React from 'react';
import * as Antd from 'antd';
import Burger from '@animated-burgers/burger-squeeze';
import cx from 'classnames';

import SiderNavLink, { SiderNavLinkProps } from 'components/sider-nav-link';
import FadeBlock from 'components/fade-block';

import '@animated-burgers/burger-squeeze/dist/styles.css';

import { ReactComponent as LogoWithName } from 'resources/svg/logo-with-name.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/icons/pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/voting.svg';
import { ReactComponent as BondsSvg } from 'resources/svg/icons/bonds.svg';

import s from './styles.module.css';
import { useTheme } from 'components/theme-provider';
import { ReactComponent as MoonSvg } from 'resources/svg/icons/moon.svg';
import { ReactComponent as SunSvg } from 'resources/svg/icons/sun.svg';

const SiderNavLinks: SiderNavLinkProps[] = [
  {
    icon: <PoolsSvg />,
    label: 'Pools',
    path: '/pools',
  },
  {
    icon: <VotingSvg />,
    label: 'Voting',
    path: '/voting',
  },
  {
    icon: <BondsSvg />,
    label: 'Bonds',
    path: '/bonds',
  },
];

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
        <LogoWithName />
      </FadeBlock>
      <div className={cx(s.mask, { [s.maskOpen]: isOpen })} />
      <div className={cx(s.menuList, { [s.menuListOpen]: isOpen })}>
        <LogoWithName className={s.innerLogo} />
        {SiderNavLinks.map(link => (
          <SiderNavLink
            key={link.path}
            {...link}
            expanded
            onClick={handleLinkClick}
          />
        ))}

        <Antd.Button type="link" className={s.themeToggle} onClick={handleThemeToggle}>
          {!isDarkTheme ? <MoonSvg /> : <SunSvg />}
          <FadeBlock visible={isOpen}>
            {!isDarkTheme ? 'Dark' : 'Light'} Theme
          </FadeBlock>
        </Antd.Button>
      </div>
    </div>
  );
};

export default MobileMenu;
