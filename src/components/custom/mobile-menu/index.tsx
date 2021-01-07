import React from 'react';
import * as Antd from 'antd';
import Burger from '@animated-burgers/burger-squeeze';
import cx from 'classnames';

import '@animated-burgers/burger-squeeze/dist/styles.css';

import SiderNavLink, { SiderNavLinkProps } from 'components/custom/sider-nav-link';
import FadeBlock from 'components/custom/fade-block';
import { useTheme } from 'components/providers/theme-provider';

import { ReactComponent as LogoWithName } from 'resources/svg/logo/logo-with-name.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/icons/nav-pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/nav-voting.svg';
import { ReactComponent as BondsSvg } from 'resources/svg/icons/nav-bonds.svg';
import { ReactComponent as MoonSvg } from 'resources/svg/icons/theme-moon.svg';
import { ReactComponent as SunSvg } from 'resources/svg/icons/theme-sun.svg';

import s from './styles.module.css';

const SiderNavLinks: SiderNavLinkProps[] = [
  {
    icon: <PoolsSvg />,
    label: 'Pools',
    path: '/yield-farming',
  },
  {
    icon: <VotingSvg />,
    label: 'Voting',
    path: '/governance',
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
